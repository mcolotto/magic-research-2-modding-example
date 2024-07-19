# Important concepts in Magic Research 2 modding

## GameState

The master object that holds all the state of the game. `temp` gets reset every time the game restarts, and on retirement. `run` gets reset on retirement; `world` gets reset on NG+. `global` and `options` do not get reset and persist indefinitely.

Although they are not in the TypeScript definition, you can add your own fields to the GameState and it should work. Note that, except for `temp`, the state is serialized to JSON to save and load, so you will want to store only basic things in this state, like primitives, objects without functions, or arrays.

## Game elements are Singletons

Most game entities represented by classes (`Action`, `Spell`, `Item`, `Storyline`, etc.) are _Singletons_ (i.e. there is only one instance ever created of that class) and stored in some `DataStore`. A DataStore is a key / value in-memory storage for those singletons, and you can identify them by the plural of the entity you're looking for (i.e. `Actions`, `Spells`, `Items`, `Storylines`). Use those to programatically access any of those objects. Since they are singletons, you can modify their functions to override their implementation if desired.

## TimeTickListeners and registerTimeTickListener

This is the main way to add behavior that is supposed to happen over time while idle. If you are adding a new mechanic that has some sort of effect over time, you'd probably add it this way.

## Transformations

The Transformation system is the main way various things in the game affect any other calculation. To modify a calculation, you call `registerTransformation`, whereas to consume a calculation, you would use `applyTransformations` (or if you need more efficiency: `applyTransformationsCached` if it won't change in the same "tick", or `applyTransformationsPermaCached` if it won't change in the same retirement or if you will manually call `clearTransformationCache` when it should). Very often, the effects of your spell or mechanic will be applied via a transformation.

Transformations have a set of tags that are simply strings, although common ones are in `TransformationTags`, `AttackTarget`, `CombatStat`, `Resource`, `SpellElement`. When you register a transformation, you will specify an array of arrays of tags. The transformation will impact any calculation that is called with _all of the tags_ of _any of the subarrays_.

Transformations can be either Addition, Multiplier, Power (unused), or Override. When a calculation is done, the caller provides a base value. Then all the Addition transformations are applied, then the Power, then the Multiplier, and then finally Override. Use Override sparingly, as the behavior when two different transformations try to override the value is not defined.

If you want to modify a calculation from the main game and it's not clear from the tags how to do it, please reach out in the official Discord for help. It might be that the calculation is not getting called with the right tags.

## Listeners

There are listeners to many different things in the game. It is the primary way to add extra behavior, to hook yourself to certain things that happen. Some of the most useful ones (there are many, many more - check the TypeScript definition of `MR2Globals`):

`EnemyDeathListener`: as per the name, it's the best way to listen to things like if a boss has been defeated.
`SetFlagListener`: a lot of the unlocks and stuff like that are based on flags, and this is a good way to do things when they happen.
`PostRetirementListener`: this is
`GameStateListener`: the master listener, it will always run on every change. Because of that reason, try to **avoid it as much as possible**, but if no other listener fits the bill, you might need to use this one.

Use listeners liberally even with your own content, so you can keep each item, spell, event, etc. separate from each other and enable / disable them easily at will. Together with Transformations, you can use these to create a lot of game elements that interact with each other without knowing about themselves.

## IncomeOverTimeProducers

When you want to create a furniture such as Mana Steamers that produces or consumes resources over time, use this. Using this will cause the income to be shown under Resources in the UI, and it will automatically not apply the income if the expenses cannot be met.

## Actions, Spells, etc.

Actions are the basic concept in the game. Most larger buttons in the game that have a backend functionality trigger some Action in a way or another.

There are many kinds of Actions:

- **Spells:** A large category in and of itself. More things are spells than you may think. Be aware of `BuildingSpell` (i.e. the action to buy a piece of furniture), `TransmutationSpell` (to transmute items), `CombatSpellBase` (a basic spell that applies to Exploration and will appear in the Exploration screen's spell menu).
- **Enhancements**
- **Boosts**

## Items

Instances of items as they appear in-game are called `ItemOccurrence`, and they contain an `itemId` and an arbitrary `params` object. You can freely use that `params` object to create variations of the same item, or augment items in some way. The only value used in `params` in the base game is `itemQuality`. If `itemQuality` is not present it is assumed to be 0 (and if the quality would be 0, it is deliberately omitted from `params` to avoid duplicates).

## Game events

Building game events is quite complex, and the best way to learn is via an example. Check out `StorylineAndBuildingTestMod.ts`.

## Markdown and text in-game

In many places in-game, text is represented using an augmented Markdown format. Examples of text that is rendered like this are action descriptions and effects. The following are syntax augmentations done to the basic Markdown format:

- Identifiers between colons (for example, the `:attack:` in `"+10:attack:"`) will be replaced with a small `GameIcon`. If the value is equal to an item ID, its icon will be used. Otherwise, you can register new GameIcons using the modding API.
- Simple tooltips (that are displayed using Markdown themselves) can be shown in the UI by wrapping the text to serve as an underline with `^^`, and then wrapping the tooltip immediately after with `<>` (for example: `"Can be used ^{{times}}^<{{explanation}}> times per combat"`). These are the underscored tooltips that you see throughout the app.

## Caching

With all the transformations and calculations flying all over the place and the game UI updating dozens of time a second, the backend of MR2 can be quite heavy, and adding mods will make it even heavier. Because of this reason, caching is used liberally throughout the base game. It can lead to quite confusing bugs where your transformations or stuff don't have an effect due to some cache: if you find things don't seem to change, but then when you reload the game they are indeed applying, it is almost certainly some cache that needs to be cleared. **This is likely the hardest part of developing MR2 mods.** When you add new game elements that affect some things that are cached, you might be expected in many cases to clear caches, but it isn't clear which ones you will need to clear. At the same time, you'll want to avoid clearing too many caches as this can dramatically slow down the game.

All cached values are stored in some way in the `temp` object in `GameState`, and many utility functions are exposed in `MR2` to clear pieces of the cache. Likewise, some of the examples have mechanics that require clearing caches (it is quite common) and so they do it.

Because of the extensive documentation that needs to be done in terms of what caches exist and when to clear them, if you find a caching problem and it's not immediately clear how to solve it, please reach out to the developer in the official Discord so it can be addressed - either by modifying `MR2` and providing a way to clear said cache, or adding an example on how to clear the cache.

## Creating new Elements, Resources, and preload() vs load()

The difference between the two: `preload` will run before the backend of the main game loads, and `load` will run afterwards.

**Put the bulk of your code in `load`.**

The main (only?) reason why you would want to use `preload` is if you want to add things to certain main game concepts in a way where you'd want the main game to integrate those into the game. And the main use cases for this are if you want to add a new SpellElement or a new Resource, since there are multiple Storylines and effects that affect "every SpellElement" or "every Resource". See the example `ElementCreationTestMod.ts`. The Fungus SpellElement added in that example will be automatically considered for things like the random events where you can purchase a book for Element exp, or things like Shard Stockpile, etc.
