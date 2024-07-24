# Magic Research 2 Modding SDK and Examples

Welcome to the Magic Research 2 Modding SDK!

**Important note: Magic Research 2 modding is EXPERIMENTAL. The API, capabilities, etc. are still unstable and may change at any time. It is still very early. Back-up your save file before doing mod development, and make sure to stay up-to-date by joining [the official Discord](https://discord.gg/bPhGsaqR9d).**

## Getting Started

To get started, you will need to set up the development environment. If it's your first time working with Magic Research 2 mods or you're not sure of what you're doing, it's best to follow these steps. Once you have a little more experience, you'll be able to tweak things.

1. [Install Node.js](https://nodejs.org/en) v18 or later. Confirm that it's working by running `node --version` in the command line. The project was tested with v18.20.4.
2. [Install Yarn](https://classic.yarnpkg.com/lang/en/docs/install/).
3. [Download Visual Studio Code](https://code.visualstudio.com/download). It's not a requirement, but it'll be the better experience. Also install the extension _Prettier_ which is used for automatic code formatting.
4. You will need the contents of this repository. Either download them, clone the repository with Git, or create a fork and clone that.
5. Open Visual Studio Code. "Open Workspace from File", and open the file `workspace.code-workspace`.
6. Test that it works. At the bottom, on the terminal in VSCode, type: `yarn` in the root of the project to download and install all the dependencies, then `yarn build:dev`. If this succeeds, you should see a file `dist/mr2-test-mods.js` created in the workspace - if that's the case, congratulations, you have succeeded!

## Creating a new mod and configuring the basic metadata

The easiest way to create a new mod is to base it off from the example that you have just downloaded.

1. First, open `package.json` and edit the fields `name` and `description` (and optionally, `version`).
2. Next, copy the file `src/MR2TestMods.ts` into its same folder, and rename the copy to `nameOfYourMod.ts`.
3. Scroll all the way down in this new file and edit the field `description` there.
4. Finally, open `src/index.ts`, scroll all the way down, and change the line that says `require("./MR2TestMods.ts")` to instead point to the new file you created: `require("./nameOfYourMod.ts")`.

Changing those fields will impact how your mod is seen in the game. The exports of `index.ts` will be seen by the game and will be used to load the mod or to access its metadata.

You are now ready to start editing and building your mod!

## How to test your mod

0. As a reminder, mods are only supported in the Steam version of Magic Research 2 for the time being.
1. **Back-up your save!**
2. Build your mod with `yarn build`.
3. Create a `mods` subdirectory in the same place where your `Magic Research 2.exe` file is at. Then, place your built `.js` file from the `dist` directory inside this new folder that you have created.
4. Start the game.

If all goes well, the game will start and your mod will load. To confirm it has loaded, you can go to the Options screen and scroll down. You should see a "Modding" section, which should list the mods that are loaded.

A good way to confirm that the mod has loaded is by adding some debug simple Transformation, such as the one affecting Channel Fire in the `BasicTestMod` example, all the way at the bottom of your `load()` function. That way you can check the effect of Channel Fire and see at a glance whether or not the mod has loaded.

## How to actually build the mod

The best way to learn how to build a mod is by looking at a combination of _the given examples_, which provide working basic pieces (i.e. how to create a new spell, or modify an effect in the backend) and at the same time _looking at the elements in the MR2 object_ that is passed to `load()`. The TypeScript declarations of anything in the MR2 object are included in this SDK and can be used to understand what are all the different things that can be done, although the documentation may not be thorough yet. You can look at them most easily via the autocomplete display, i.e. type `MR2.` somewhere inside a function where you have access to it in VSCode and just look at all the entries.

There is a `docs` folder within this repository with additional documentation on modding and various backend concepts.

There are methods that have been added to the SDK in order to get a list of all the possible ids of certain entities. You can combine those methods with the function `MR2.alert()` to show their contents and/or debug things if desired. This is a way to know what is the id of the entity that you might want to remove or change, if that's something you'd want to do.

If you have explored those but you're not sure of how to achieve what you want to achieve, any questions should go to the official Discord's `#mr2-modding` channel. The developer is usually quite active and will likely answer within a day.

## Publishing the mod

_Note: still TBD!_

You can run `yarn build:prod` to generate a "production" / minified build of the mod.

## Modding the UI

**Note: this is still under development**

To mod the UI, the Magic Research 2 exposes two major ways to do so: a "Custom Screen API" and "ModdableView". This lets you add, remove, or modify UI elements.

The basic operations you will have are as follows:

1. First, you will build your custom UI using the UI elements received from the load() function. Most general purpose UI components used by the app are exposed in this way and can be used to build the UI. This will also get your custom UI to be more consistent with the game's look. You could import your own components, but since they may depend on a certain version of React Native, any updates to the main game could break your mod entirely - so it's not recommended. Some of the mod examples involve building a UI and it's best to reference them. _Note: Experience with React is nearly required, and experience with React Native specifically is recommended._
2. Once you have built your custom UI, you will need to attach it with any of the three mechanisms. The "Custom Screen API" lets you create a screen (similar to Home, Study, Inventory, etc.) and is usually best for entire new features that are added to the game. The "Modded UI Hooks" are specific places in the code where you may add a new piece of UI, and in some cases they may receive an argument such as an item ID or so; an example could be if you wanted to add a new display to the item details in the Transmute screen, for instance. The hardest is using a "Moddable View", where you can override the contents of specific places in the code with your own custom UI. It is the hardest to use, but you could be using this to remove or modify UI elements.

_Note: You might be able to use DOM manipulation to change the UI in the Steam version. This is **not recommended** as it will render the mod unable to work in Mobile. Beware!_

## Updating the Modding SDK

Run `yarn upgrade-sdk`. It should download the latest version. Most breaking changes that affect your mod are likely to be reflected as TypeScript errors.

_Note: Since the API is not yet stable, you may need to make changes to `index.ts` (i.e. exporting more metadata) or do other things._

## Future compatibility with mobile

Mods built using this SDK _that do not modify the UI_ **should** be automatically fully compatible with mobile. (The functionality is not yet developed)

Mods built using this SDK _that modify the UI_ also **should** be automatically compatible with mobile, but because of the UI constraints and the way it would look, the UI might need to be adjusted for mobile.

Mods built using this SDK _that modify the UI but not following the methods recommended in the "Modding the UI" section above_ **will probably not** be compatible with mobile.
