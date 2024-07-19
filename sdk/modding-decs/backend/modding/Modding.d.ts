import { registerGameIcon } from "../../components/utility/icons/GameIcon";
import { RoundingMethod, formatMultiplier, formatNumber } from "../../utils/FormattingUtils";
import { cacheBooleanTrueOnly, cacheByArbitraryVersion, cacheBySecondsPlayed, cacheByTickCount, cacheIndefinitely, clearAllCaches, clearCacheKey } from "../Caching";
import { hasEverHadFlag, hasFlag, hasWorldFlag } from "../Flags";
import { createHypotheticalState } from "../GameState";
import { addGameStateListener, addHighPriorityGameStateListener, clearGameStateListener, getAllGameStateListenerIds, getAllHighPriorityGameStateListenerIds } from "../GameStateListeners";
import { Resource, clearResourceCapCache, getCappedResourceAmount, getResourceAmount, getResourceCap, grantResource, hasEverHadResource, registerResource, registerResourceCapClearer } from "../Resources";
import { registerPostRetirementListener, registerRetirementListener } from "../Retire";
import { addUICommand, getUICommands } from "../UICommands";
import { Action } from "../action/Action";
import { ActionArea, ActionSubcategories } from "../action/ActionAreas";
import { clearAutocastCaches } from "../autocast/Autocast";
import { SpellAutocastCategory } from "../autocast/SpellAutocastCategory";
import BoostActionBase, { getBoughtBoostsAmount, isBoostingUnlocked } from "../boost/BoostActionBase";
import { Building, BuildingSpell } from "../buildings/Building";
import { clearLandCache, getBuildingAmount, getBuildingAmountTurnedOn, getFreeLand, getTotalLand, getUsedLand } from "../buildings/Buildings";
import { Challenge, createStorylineFromChallenge } from "../challenges/Challenge";
import { areChallengesUnlocked, getCurrentChallenge } from "../challenges/Challenges";
import { CombatClass, getCurrentCombatClass, getSelectableCombatClasses } from "../classes/CombatClasses";
import { addEnding, getEndingData, hasEverTriggeredEnding, setGameEnding } from "../ending/Endings";
import { Enhancement } from "../enhancement/Enhancement";
import { isEnhancementEverUnlocked, isEnhancementUnlocked } from "../enhancement/Enhancements";
import { buildEvent } from "../events/EventMessageBuilder";
import { getGameEventById, triggerEvent } from "../events/Events";
import { EventTag } from "../events/GameEvent";
import { getAllRandomEventTriggerIds, registerRandomEventTrigger, unregisterRandomEventTrigger } from "../events/autorandom/RandomEventTrigger";
import { AttackTarget } from "../exploration/AttackTarget";
import { CombatStat, clearCombatStatCache } from "../exploration/CombatStats";
import { aoeEnemyAttackEffect, calculateAttackTarget, calculateDamage, calculateIsHit, dispelAllEnemyAttackEffect, drainingEnemyAttackEffect, drainingFamiliarAttackEffect, fractionAoEEnemyAttackEffect, fractionEnemyAttackEffect, getCurrentDungeonFloor, getCurrentEnemyHPFraction, getCurrentFamiliarAction, getCurrentFamiliarHPFraction, getCurrentHPFromTarget, getCurrentPlayerHPFraction, getEnemyTurnCounter, getStatFromTarget, getSuccessfulExplorationsForFloor, modifyTargetCurrentHP, pierceDefenseAoEEnemyAttackEffect, pierceDefenseEnemyAttackEffect, standardEnemyAttackEffect, standardFamiliarAttackEffect, standardPlayerAttackEffect, startCombat, triggerCombatLoss } from "../exploration/Exploration";
import { pushCombatActionResult } from "../exploration/ExplorationActionResult";
import { ExplorationStatus } from "../exploration/ExplorationStatus";
import { getExplorationStatus } from "../exploration/ExplorationUtils";
import { Dungeon } from "../exploration/dungeons/Dungeon";
import { DungeonFloor, encounterEnemy } from "../exploration/dungeons/DungeonFloor";
import { Enemy } from "../exploration/enemies/Enemy";
import { FamiliarCompanionStatusType, FamiliarStatusType, areFamiliarsEverUnlocked, areFamiliarsUnlocked, getFamiliarAmount, getFamiliarData, getFloorsAvailableForFamiliars, pushToFamiliarMessageLog } from "../familiars/Familiar";
import { FamiliarClass } from "../familiars/FamiliarClass";
import { DataStore } from "../generic/DataStore";
import { EquipmentSlot, getEquippedItem, getEquippedItems } from "../items/Equipment";
import { addToInventory, getAmountOfItem, getTotalAmountOfItem, getTotalAmountOfItemWithMinimumQuality, isItemOccurrenceEqual, removeFromInventory, removeFromInventoryWithAnyParams, removeFromInventoryWithMinimumQuality } from "../items/Inventory";
import { Item } from "../items/Item";
import { FamiliarItem, FamiliarTransmutationSpell } from "../items/consumable/FamiliarItem";
import { FamiliarEvolutionItem, FamiliarEvolutionTransmutationSpell } from "../items/consumable/evolution/FamiliarEvolutionItem";
import { EquippableItem } from "../items/equipment/EquippableItem";
import { PouchItem } from "../items/equipment/PouchItem";
import { BuffingPouchItem } from "../items/equipment/pouch/BuffingPouchItem";
import { EquipmentTransmutationSpell } from "../items/transmute/EquipmentTransmutationSpell";
import { TransmutationSpell, getTransmutationSpellForItem, registerTransmutationSpellAndItem } from "../items/transmute/TransmutationSpell";
import { createAndLoadElementalShard } from "../items/transmute/materials/ElementalShard";
import { Ritual } from "../rituals/Ritual";
import { areRitualsEverUnlocked, areRitualsUnlocked, clearAllRitualCaches, getCorruption, getCorruptionCap } from "../rituals/Rituals";
import { Spellcraft, clearSpellcraftCostCache } from "../spellcraft/Spellcraft";
import { isSpellcraftEverUnlocked, isSpellcraftUnlocked } from "../spellcraft/SpellcraftUtils";
import { CombatSpellBase } from "../spells/CombatSpellBase";
import { SpellElement, getElementLevel, getFullyUnlockedElements, getTotalExpRequiredForLevel, getUnlockedElements, hasElementBeenPartiallyUnlockedInPreviousRun, partiallyUnlockElement, registerSpellElement, unlockElement } from "../spells/Elements";
import { Spell } from "../spells/Spell";
import { clearAllSpellCaches, clearManaCostCache, registerBuffEmpowerEffects, registerEmpowerEffects, registerSpell, registerStandardEmpowerEffects } from "../spells/Spells";
import { getStandardAttackEffectText, getStandardRangeEffectText, getStandardSpellAttackEffect, getStandardSpellAttackEffectText, isCastingRecommendedTemporaryEffect } from "../spells/Utils";
import { clearVisibleSpellsCache } from "../spells/VisibleSpellsCache";
import { BasicChannelingSpellBase } from "../spells/channeling/BasicChannelingSpellBase";
import { registerChannelingSpellForElement } from "../spells/channeling/ChannelAll";
import { registerExtraElementToResourceMapping } from "../spells/channeling/ChannelingResources";
import { Storyline } from "../storylines/Storyline";
import { clearResearcherExpCache } from "../study/Study";
import { getCurrentSynchroBonuses, getSynchroPosition, isSynchroUnlocked } from "../synchro/Synchro";
import { SynchroBonus } from "../synchro/SynchroBonus";
import { TemporaryEffect } from "../temporaryeffects/TemporaryEffect";
import { clearTemporaryEffect, getTemporaryEffectData, getTemporaryEffectEndTime, getTemporaryEffectSetTime, getTemporaryEffects, getTemporaryEffectsForTarget, hasEverHadTemporaryEffect, hasTemporaryEffect, registerTemporaryEffectCombatStatCacheClearer, registerTemporaryEffectListener, wasTemporaryEffectCleared } from "../temporaryeffects/TemporaryEffects";
import { IncomeOverTimeProducer, clearCalculatedIncomeCache } from "../timetick/IncomeOverTime";
import { deleteTimeTickListener, getAllTimeTickListenerIds, registerTimeTickListener } from "../timetick/TimeTick";
import { TransformationType, applyTransformations, applyTransformationsCached, applyTransformationsPermaCached, clearTransformationCache, explainTransformations, explainTransformationsText, registerTransformation } from "../transformation/Transformation";
import { TransformationTags, TransformationValueType } from "../transformation/TransformationTags";
export type ModResult = {
    id: string;
    name: string;
    description: string;
    version: string;
    minGameVersion: string;
    preload?: (MR2: MR2Globals) => void;
    load: (MR2: MR2Globals) => void;
};
export declare const MR2: {
    /**
     * Tags to be used for Transformations.
     */
    TransformationTags: typeof TransformationTags;
    /**
     * Types for Transformations. See docs.
     */
    TransformationType: typeof TransformationType;
    /**
     * Transformation value types. These are used when calling
     * explainTransformationsText.
     */
    TransformationValueType: typeof TransformationValueType;
    /**
     * Use this to register a new Transformation, to modify
     * some calculation in-game. See docs and examples.
     */
    registerTransformation: typeof registerTransformation;
    /**
     * If calling any of the cached applyTransformations,
     * especially applyTransformationsPermaCached,
     * this can be used to clear its cache.
     */
    clearTransformationCache: typeof clearTransformationCache;
    /**
     * Call this when you want to perform a calculation that
     * could be modified by other things.
     */
    applyTransformations: typeof applyTransformations;
    /**
     * If your calculation won't be modified on each "tick",
     * call this instead of applyTransformations for performance.
     */
    applyTransformationsCached: typeof applyTransformationsCached;
    /**
     * If your calculation never changes until retirement or is
     * in a hot path, consider calling this function instead of
     * applyTransformations.
     * You may need to use clearTransformationCache.
     */
    applyTransformationsPermaCached: typeof applyTransformationsPermaCached;
    /**
     * You will probably not need to call this. Used in explainTransformationsText.
     */
    explainTransformations: typeof explainTransformations;
    /**
     * Useful function for defining the tooltip contents in spell
     * and item effect descriptions.
     */
    explainTransformationsText: typeof explainTransformationsText;
    /**
     * The main game resources enum.
     */
    Resource: typeof Resource;
    grantResource: typeof grantResource;
    getResourceAmount: typeof getResourceAmount;
    /**
     * An unwritten rule in the game is that you can't spend above
     * your cap for any resource. This returns the min between
     * your resource amount and your cap.
     */
    getCappedResourceAmount: typeof getCappedResourceAmount;
    getResourceCap: typeof getResourceCap;
    /**
     * Resource caps are cached, so if you have something that changes them,
     * you will need to use this function.
     */
    registerResourceCapClearer: typeof registerResourceCapClearer;
    hasFlag: typeof hasFlag;
    /**
     * Flags are boolean values. These flags get reset on retirement.
     */
    setFlag: (flag: string) => any;
    hasEverHadFlag: typeof hasEverHadFlag;
    hasEverHadResource: typeof hasEverHadResource;
    hasWorldFlag: typeof hasWorldFlag;
    /**
     * World flags do not get reset on retirement.
     */
    setWorldFlag: (flag: string) => any;
    /**
     * Useful for generating descriptions of things like attacks where the effect
     * is in a range.
     */
    getStandardRangeEffectText: typeof getStandardRangeEffectText;
    /**
     * The general number formatting function. Used throughout the game.
     * Use in your mod for consistency. Attaches K, M, etc. and selects
     * the correct amount of significant digits.
     */
    formatNumber: typeof formatNumber;
    /**
     * Another general number formatting function. Expects a multiplier, and will
     * generate things like +50% for 1.5, -20% for 0.8, or even 47x for 47.0.
     * Used throughout the game.
     */
    formatMultiplier: typeof formatMultiplier;
    grantElementExp: (element: any, amount: any) => any;
    /**
     * This includes partially unlocked Elements.
     */
    getUnlockedElements: typeof getUnlockedElements;
    getFullyUnlockedElements: typeof getFullyUnlockedElements;
    getElementLevel: typeof getElementLevel;
    /**
     * This fully unlocks an Element.
     */
    unlockElement: typeof unlockElement;
    partiallyUnlockElement: typeof partiallyUnlockElement;
    hasElementBeenPartiallyUnlockedInPreviousRun: typeof hasElementBeenPartiallyUnlockedInPreviousRun;
    getTotalExpRequiredForLevel: typeof getTotalExpRequiredForLevel;
    TemporaryEffect: typeof TemporaryEffect;
    TemporaryEffects: DataStore<TemporaryEffect>;
    getTemporaryEffectEndTime: typeof getTemporaryEffectEndTime;
    getTemporaryEffectSetTime: typeof getTemporaryEffectSetTime;
    /**
     * Returns true if the temporary effect was removed via clearTemporaryEffect.
     * Can be used to detect if a temporary effect expired by time or if it was explicitly
     * removed.
     */
    wasTemporaryEffectCleared: typeof wasTemporaryEffectCleared;
    hasTemporaryEffect: typeof hasTemporaryEffect;
    hasEverHadTemporaryEffect: typeof hasEverHadTemporaryEffect;
    /**
     * If a target has a temporary effect active, returns a lot of useful information
     * about the temporary effect.
     * Use this to access the params of a temporary effect.
     */
    getTemporaryEffectData: typeof getTemporaryEffectData;
    getTemporaryEffects: typeof getTemporaryEffects;
    getTemporaryEffectsForTarget: typeof getTemporaryEffectsForTarget;
    grantTemporaryEffect: (id: string, baseDurationSec: number, extra: {
        mode?: "replace" | "add";
        target?: AttackTarget;
        source?: AttackTarget;
        params?: Record<string, any>;
    }) => any;
    clearTemporaryEffect: typeof clearTemporaryEffect;
    /**
     * TemporaryEffectListeners run every time a temporary effect is granted with
     * grantTemporaryEffect, and optionally they will also run if a temporary effect
     * expires or is cleared.
     */
    registerTemporaryEffectListener: typeof registerTemporaryEffectListener;
    /**
     * If your temporary effect has an effect on combat stats, this function is a shortcut
     * to clear their cache.
     */
    registerTemporaryEffectCombatStatCacheClearer: typeof registerTemporaryEffectCombatStatCacheClearer;
    /**
     * The master way to build an event. Returns an event builder.
     * Refer to the SDK examples for more details.
     */
    buildEvent: typeof buildEvent;
    /**
     * Random event triggers have a weight.
     * When it is time for a random event, a weighted random roll is done from
     * all the possible random events.
     * Most typical random events have a weight of 100.
     * Storylines have a typical weight of as low as 3 or 4 (late game) to as much
     * as 60 (early game).
     */
    registerRandomEventTrigger: typeof registerRandomEventTrigger;
    unregisterRandomEventTrigger: typeof unregisterRandomEventTrigger;
    /**
     * Make an event pop up!
     */
    triggerEvent: typeof triggerEvent;
    /**
     * Generally you don't want this unless you are removing random events
     * to prevent them from happening. Then you can use this to see what are
     * all the triggerer ids to know which one to remove.
     */
    getAllRandomEventTriggerIds: typeof getAllRandomEventTriggerIds;
    getGameEventById: typeof getGameEventById;
    GameEvents: DataStore<import("../events/GameEvent").GameEvent>;
    EventMessages: DataStore<import("../events/GameEvent").EventMessage>;
    /**
     * These get called when an event is triggered.
     */
    EventTriggerListeners: DataStore<(state: import("../GameState").GameState, event: import("../events/GameEvent").GameEvent) => import("../GameState").GameState>;
    /**
     * Events can have tags to classify them. Some of them have some sort of function.
     * For example, EventTag.MAIN_QUEST will get skipped sometimes if in the options
     * the setting to skip them is enabled.
     */
    EventTag: typeof EventTag;
    /**
     * Create using new Storyline(). You don't need to subclass this.
     */
    Storyline: typeof Storyline;
    Storylines: DataStore<Storyline>;
    Action: typeof Action;
    Actions: DataStore<Action>;
    /**
     * ActionAreas are used to define where should Actions appear.
     */
    ActionArea: typeof ActionArea;
    /**
     * ActionSubcategories are used to define where should Actions appear.
     * Each one belongs to one and only one ActionArea.
     */
    ActionSubcategories: typeof ActionSubcategories;
    Spell: typeof Spell;
    /**
     * A spell that will appear in the Exploration screen
     */
    CombatSpellBase: typeof CombatSpellBase;
    /**
     * A channeling spell
     */
    BasicChannelingSpellBase: typeof BasicChannelingSpellBase;
    /**
     * Use `registerSpell` to register a spell instead.
     * You can use this one to access spells.
     */
    Spells: DataStore<Spell>;
    /**
     * The main game's SpellElements
     */
    SpellElement: typeof SpellElement;
    /**
     * Determines where to put the spell in the Wizards screen
     */
    SpellAutocastCategory: typeof SpellAutocastCategory;
    /**
     * Register a new spell this way.
     */
    registerSpell: typeof registerSpell;
    /**
     * A utility shortcut to produce a text describing a standard attack effect.
     */
    getStandardAttackEffectText: typeof getStandardAttackEffectText;
    /**
     * If you have a standard spell attack or if that's part of the spell's effect,
     * you can use this as an implementation shortcut.
     * Expects spell to have ActionEffects `average` and `variance`
     */
    getStandardSpellAttackEffect: typeof getStandardSpellAttackEffect;
    /**
     * A utility shortcut to produce a text describing a standard attack effect.
     * Useful for spells.
     */
    getStandardSpellAttackEffectText: typeof getStandardSpellAttackEffectText;
    /**
     * A helper function to determine
     * whether or not Wizards should cast this spell if the gauge is full
     * and the spell is enabled.
     * This returns true if the temporary effect is gone or has less than
     * 1 second left.
     */
    isCastingRecommendedTemporaryEffect: typeof isCastingRecommendedTemporaryEffect;
    /**
     * A shortcut for a transformation that applies to an empowered spell's
     * effects. Applies to every effect.
     */
    registerStandardEmpowerEffects: typeof registerStandardEmpowerEffects;
    /**
     * A shortcut for a transformation that applies to an empowered spell's
     * effects. Generic version.
     */
    registerEmpowerEffects: typeof registerEmpowerEffects;
    /**
     * A shortcut for a transformation that applies to an empowered spell's
     * effects. Good for spells that apply temporary effects.
     */
    registerBuffEmpowerEffects: typeof registerBuffEmpowerEffects;
    /**
     * Buildings are furniture.
     */
    Building: typeof Building;
    /**
     * BuildingSpells are the actions that let you purchase furniture.
     */
    BuildingSpell: typeof BuildingSpell;
    Buildings: DataStore<Building>;
    getTotalLand: typeof getTotalLand;
    getUsedLand: typeof getUsedLand;
    getFreeLand: typeof getFreeLand;
    getBuildingAmount: typeof getBuildingAmount;
    getBuildingAmountTurnedOn: typeof getBuildingAmountTurnedOn;
    Item: typeof Item;
    EquippableItem: typeof EquippableItem;
    PouchItem: typeof PouchItem;
    BuffingPouchItem: typeof BuffingPouchItem;
    FamiliarItem: typeof FamiliarItem;
    FamiliarEvolutionItem: typeof FamiliarEvolutionItem;
    EquipmentSlot: typeof EquipmentSlot;
    TransmutationSpell: typeof TransmutationSpell;
    FamiliarTransmutationSpell: typeof FamiliarTransmutationSpell;
    EquipmentTransmutationSpell: typeof EquipmentTransmutationSpell;
    /**
     * Use registerTransmutationSpellAndItem if your item is transmutable.
     * Otherwise use Items.register
     */
    Items: DataStore<Item>;
    /**
     * Prefer over Items.register if applicable.
     * Registers both the spell and the item.
     */
    registerTransmutationSpellAndItem: typeof registerTransmutationSpellAndItem;
    getTransmutationSpellForItem: typeof getTransmutationSpellForItem;
    addToInventory: typeof addToInventory;
    removeFromInventory: typeof removeFromInventory;
    isItemOccurrenceEqual: typeof isItemOccurrenceEqual;
    getAmountOfItem: typeof getAmountOfItem;
    getTotalAmountOfItem: typeof getTotalAmountOfItem;
    getTotalAmountOfItemWithMinimumQuality: typeof getTotalAmountOfItemWithMinimumQuality;
    removeFromInventoryWithAnyParams: typeof removeFromInventoryWithAnyParams;
    removeFromInventoryWithMinimumQuality: typeof removeFromInventoryWithMinimumQuality;
    getEquippedItem: typeof getEquippedItem;
    getEquippedItems: typeof getEquippedItems;
    /**
     * Helper function to create and register an elemental shard item.
     * Useful if making new Elements since this is a required item.
     */
    createAndLoadElementalShard: typeof createAndLoadElementalShard;
    getCurrentDungeonFloor: typeof getCurrentDungeonFloor;
    startCombat: typeof startCombat;
    getCurrentHPFromTarget: typeof getCurrentHPFromTarget;
    getCurrentPlayerHPFraction: typeof getCurrentPlayerHPFraction;
    getCurrentFamiliarHPFraction: typeof getCurrentFamiliarHPFraction;
    getCurrentEnemyHPFraction: typeof getCurrentEnemyHPFraction;
    calculateDamage: typeof calculateDamage;
    calculateIsHit: typeof calculateIsHit;
    modifyTargetCurrentHP: typeof modifyTargetCurrentHP;
    /**
     * Note: Combat stats from targets are a cached value.
     * See also clearCombatStatCache if you're modifying them.
     */
    getStatFromTarget: typeof getStatFromTarget;
    CombatStat: typeof CombatStat;
    AttackTarget: typeof AttackTarget;
    /**
     * Used in enemy strategies to see if they should attack the current
     * Companion or the player, depending on their position and status.
     * (Who is in the "front"?)
     */
    calculateAttackTarget: typeof calculateAttackTarget;
    /**
     * Combat action results are what make damage numbers show.
     * You can also listen to those, things like Wet use these to clear
     * when receiving Fire damage for instance.
     */
    pushCombatActionResult: typeof pushCombatActionResult;
    standardEnemyAttackEffect: typeof standardEnemyAttackEffect;
    aoeEnemyAttackEffect: typeof aoeEnemyAttackEffect;
    fractionEnemyAttackEffect: typeof fractionEnemyAttackEffect;
    fractionAoEEnemyAttackEffect: typeof fractionAoEEnemyAttackEffect;
    pierceDefenseEnemyAttackEffect: typeof pierceDefenseEnemyAttackEffect;
    pierceDefenseAoEEnemyAttackEffect: typeof pierceDefenseAoEEnemyAttackEffect;
    drainingEnemyAttackEffect: typeof drainingEnemyAttackEffect;
    dispelAllEnemyAttackEffect: typeof dispelAllEnemyAttackEffect;
    standardFamiliarAttackEffect: typeof standardFamiliarAttackEffect;
    drainingFamiliarAttackEffect: typeof drainingFamiliarAttackEffect;
    standardPlayerAttackEffect: typeof standardPlayerAttackEffect;
    /**
     * In a nutshell, the amount of enemies defeated in the floor
     * on this run.
     * But the spell Wormhole and other sources can add successful explorations.
     */
    getSuccessfulExplorationsForFloor: typeof getSuccessfulExplorationsForFloor;
    /**
     * The value starts at 1.
     * Every time the enemy is asked to produce the next attack,
     * the turn counter increases by 1 after it makes its decision.
     * Useful for planning enemy strategies.
     */
    getEnemyTurnCounter: typeof getEnemyTurnCounter;
    triggerCombatLoss: typeof triggerCombatLoss;
    /**
     * The status within Exploration. What is the player doing?
     */
    ExplorationStatus: typeof ExplorationStatus;
    getExplorationStatus: typeof getExplorationStatus;
    /**
     * This is typically used when writing up DungeonFloors.
     */
    encounterEnemy: typeof encounterEnemy;
    Enemy: typeof Enemy;
    Enemies: DataStore<Enemy>;
    /**
     * A Dungeon is composed of many DungeonFloors.
     * Example Dungeon: Sewers
     * Example DungeonFloor: Sewer Entrance
     */
    Dungeon: typeof Dungeon;
    Dungeons: DataStore<Dungeon>;
    /**
     * A Dungeon is composed of many DungeonFloors.
     * Example Dungeon: Sewers
     * Example DungeonFloor: Sewer Entrance
     */
    DungeonFloor: typeof DungeonFloor;
    DungeonFloors: DataStore<DungeonFloor>;
    /**
     * Retirement listeners occur right *before* retirement.
     * The game state will have all the values before retirement.
     * You can use this to "record" things right before retirement somewhere safe,
     * so you can use them later.
     */
    registerRetirementListener: typeof registerRetirementListener;
    /**
     * Post retirement listeners occur right *after* retirement.
     * This is immediately after, i.e. right before showing the Primary element
     * select screen.
     * Typically used for unlocking stuff.
     */
    registerPostRetirementListener: typeof registerPostRetirementListener;
    /**
     * This is the in-game "class". But it's a keyword in ES5, so...
     */
    CombatClass: typeof CombatClass;
    CombatClasses: DataStore<CombatClass>;
    getSelectableCombatClasses: typeof getSelectableCombatClasses;
    getCurrentCombatClass: typeof getCurrentCombatClass;
    Enhancement: typeof Enhancement;
    Enhancements: DataStore<Enhancement>;
    EnhancementPurchaseListeners: DataStore<(state: import("../GameState").GameState, enhancement: Enhancement) => import("../GameState").GameState>;
    isEnhancementUnlocked: typeof isEnhancementUnlocked;
    isEnhancementEverUnlocked: typeof isEnhancementEverUnlocked;
    SynchroBonus: typeof SynchroBonus;
    SynchroBonuses: DataStore<SynchroBonus>;
    /**
     * Triggered if the grid's composition changes (some position changes, or
     * the grid slot changes)
     */
    SynchroChangeListeners: DataStore<import("../GameState").GameStateTransform>;
    getSynchroPosition: typeof getSynchroPosition;
    isSynchroUnlocked: typeof isSynchroUnlocked;
    getCurrentSynchroBonuses: typeof getCurrentSynchroBonuses;
    /**
     * The base Boost.
     * Boosts are indexed by SpellElementType.
     * A SpellElementType does not need to have a Boost, but if it does, it can only
     * have a single one.
     * Using BoostActionBase you will get the cost scaling, etc. associated with it.
     * If you don't want that, you can try using regular Actions and code up
     * a separate system.
     */
    BoostActionBase: typeof BoostActionBase;
    isBoostingUnlocked: typeof isBoostingUnlocked;
    getBoughtBoostsAmount: typeof getBoughtBoostsAmount;
    /**
     * This defines a type of Familiar, like a Slime or a Goblin Doctor.
     */
    FamiliarClass: typeof FamiliarClass;
    /**
     * The repository for FamiliarClasses.
     */
    Familiars: DataStore<FamiliarClass>;
    /**
     * What is the Familiar doing? Are they exploring? Assisting you? Idle?
     */
    FamiliarStatusType: typeof FamiliarStatusType;
    /**
     * If they are your companion (assisting you), what is the status of the Familiar?
     */
    FamiliarCompanionStatusType: typeof FamiliarCompanionStatusType;
    /**
     * When you release a Familiar, these run.
     */
    FamiliarDeletionListeners: DataStore<import("../GameState").GameStateTransform>;
    FamiliarEvolutionTransmutationSpell: typeof FamiliarEvolutionTransmutationSpell;
    areFamiliarsUnlocked: typeof areFamiliarsUnlocked;
    areFamiliarsEverUnlocked: typeof areFamiliarsEverUnlocked;
    /**
     * Useful for getting the info about a certain Familiar ID.
     */
    getFamiliarData: typeof getFamiliarData;
    getFamiliarAmount: typeof getFamiliarAmount;
    /**
     * The message log that shows up in the Familiars screen. Each Familiar ID
     * has their own.
     */
    pushToFamiliarMessageLog: typeof pushToFamiliarMessageLog;
    getCurrentFamiliarAction: typeof getCurrentFamiliarAction;
    /**
     * Floors available for them to explore. Note that they might be still too weak
     * to explore some of the ones returned here.
     */
    getFloorsAvailableForFamiliars: typeof getFloorsAvailableForFamiliars;
    Spellcraft: typeof Spellcraft;
    Spellcrafts: DataStore<Spellcraft>;
    isSpellcraftUnlocked: typeof isSpellcraftUnlocked;
    isSpellcraftEverUnlocked: typeof isSpellcraftEverUnlocked;
    /**
     * Spellcraft costs are cached because almost nothing changes them, except
     * a single Storyline. But if it does change, you need to call this.
     */
    clearSpellcraftCostCache: typeof clearSpellcraftCostCache;
    Ritual: typeof Ritual;
    Rituals: DataStore<Ritual>;
    areRitualsUnlocked: typeof areRitualsUnlocked;
    areRitualsEverUnlocked: typeof areRitualsEverUnlocked;
    /**
     * Call this if you have an effect that affects Corruption.
     */
    clearAllRitualCaches: typeof clearAllRitualCaches;
    ritualWeakness: {
        getId(): string;
        getDisplayName(): string;
        getDisplayDescription(state: import("../GameState").GameState, temporaryEffectData: import("../temporaryeffects/TemporaryEffects").TemporaryEffectData): string;
        getIcon(): any;
        isDispellable(): boolean;
        isCombatOnly(): boolean;
        isBeneficial(): boolean;
        getParameterlessDisplayDescription(state: import("../GameState").GameState): string;
        isCommonBuffEnabled(): {
            stat: CombatStat;
            type: TransformationType;
        }[];
        isHidden(): boolean;
        mergeData(state: import("../GameState").GameState, oldData: import("../temporaryeffects/TemporaryEffects").TemporaryEffectData, newData: import("../temporaryeffects/TemporaryEffects").TemporaryEffectData, mode: "replace" | "add"): import("../temporaryeffects/TemporaryEffects").TemporaryEffectData;
    };
    getCorruption: typeof getCorruption;
    getCorruptionCap: typeof getCorruptionCap;
    Challenge: typeof Challenge;
    Challenges: DataStore<Challenge>;
    areChallengesUnlocked: typeof areChallengesUnlocked;
    getCurrentChallenge: typeof getCurrentChallenge;
    /**
     * Utility function if you'd like to add your own Challenge.
     */
    createStorylineFromChallenge: typeof createStorylineFromChallenge;
    /**
     * In some cases, you might want to show or trigger an Event or do some effect
     * after the player closes the ending screen.
     * You can use this.
     */
    EndingCloseListeners: DataStore<import("../GameState").GameStateTransform>;
    /**
     * This is how you add / register a new ending.
     */
    addEnding: typeof addEnding;
    /**
     * If you set the game ending and it hasn't been set yet for this retirement,
     * it will show the Ending screen.
     */
    setGameEnding: typeof setGameEnding;
    getEndingData: typeof getEndingData;
    /**
     * The "ever" here applies to within the current World.
     */
    hasEverTriggeredEnding: typeof hasEverTriggeredEnding;
    /**
     * The master listener. Gets called on every "change".
     * USE AS A LAST RESORT due to performance!
     */
    addGameStateListener: typeof addGameStateListener;
    /**
     * Like addGameStateListener, but use this if for whatever reason
     * you need your listener to run before all the others.
     * USE AS A LAST RESORT due to performance!
     */
    addHighPriorityGameStateListener: typeof addHighPriorityGameStateListener;
    clearGameStateListener: typeof clearGameStateListener;
    /**
     * Use this to know what are the listener ids (for debugging) in case you want to remove
     * one of them.
     */
    getAllGameStateListenerIds: typeof getAllGameStateListenerIds;
    /**
     * Use this to know what are the listener ids (for debugging) in case you want to remove
     * one of them.
     */
    getAllHighPriorityGameStateListenerIds: typeof getAllHighPriorityGameStateListenerIds;
    /**
     * The main way to do effects over time. See docs.
     */
    registerTimeTickListener: typeof registerTimeTickListener;
    /**
     * Use this to know what are the listener ids (for debugging) in case
     * you want to remove one of them.
     */
    getAllTimeTickListenerIds: typeof getAllTimeTickListenerIds;
    deleteTimeTickListener: typeof deleteTimeTickListener;
    /**
     * Called when setFlag is called.
     * NOT called when setWorldFlag is called!
     */
    SetFlagListeners: DataStore<(state: import("../GameState").GameState, flag: string) => import("../GameState").GameState>;
    /**
     * Called usually when someone buys or disposes of furniture.
     * Also called if the amount "turned on" changes.
     */
    BuildingAmountListeners: DataStore<(state: import("../GameState").GameState, building: Building) => import("../GameState").GameState>;
    IncomeOverTimeProducers: DataStore<IncomeOverTimeProducer>;
    /**
     * This is how income / expense from things like Mana Steamers is implemented. See docs.
     */
    IncomeOverTimeProducer: typeof IncomeOverTimeProducer;
    /**
     * Called on level up. Useful for clearing some caches or triggering
     * some Storylines.
     */
    LevelUpListeners: DataStore<(state: import("../GameState").GameState, element: string, oldExp: number) => import("../GameState").GameState>;
    /**
     * Called after a CombatActionResult is pushed with
     * pushCombatActionResult.
     * Good for things like Cloak of Flames, reflective damage,
     * or even reacting to some explicit attack result.
     */
    CombatActionResultListeners: DataStore<import("../exploration/ExplorationActionResult").CombatActionResultListener>;
    /**
     * Probably not too useful.
     * The main game uses it to show the item in the Compendium.
     */
    AddToInventoryForFirstTimeListeners: DataStore<import("../GameState").GameStateTransform>;
    /**
     * Called when an equipped item changes (is equipped or unequipped).
     * Could be useful to clear caches or other stuff.
     */
    EquipmentChangeListeners: DataStore<(state: import("../GameState").GameState) => import("../GameState").GameState>;
    /**
     * As per the name.
     */
    SpellCastListeners: DataStore<import("../spells/SpellCastListeners").SpellCastListener>;
    /**
     * Prefer using registerTemporaryEffectListener.
     * But you can use this to access or delete others.
     */
    TemporaryEffectExpirationListeners: DataStore<(state: import("../GameState").GameState, effect: import("../temporaryeffects/TemporaryEffects").TemporaryEffectData) => void>;
    /**
     * The main or only user of this is the piece that grants Time Pieces to
     * the player.
     * It is only called if offline time is greater than 10 minutes.
     * What will you use it for?
     */
    OfflineTickListeners: DataStore<import("../timetick/OfflineTickListeners").OfflineTickListener>;
    /**
     * Gets executed right before every warp tick UI update.
     * Probably not very useful.
     */
    WarpTimeListeners: DataStore<import("../timetick/WarpTimeListeners").WarpTimeListener>;
    /**
     * IncomeOverTimeProducer results are cached.
     * If they're going to change, you need to call this.
     * For example, it could be called inside a BuildingAmountListener
     * that listens for the amount of Mana Steamers.
     */
    clearCalculatedIncomeCache: typeof clearCalculatedIncomeCache;
    /**
     * As title.
     * You can also use onDeath of the Enemy in question, but
     * this can keep things decoupled.
     */
    EnemyDeathListeners: DataStore<import("../exploration/Exploration").EnemyDeathListener>;
    /**
     * The main repository.
     * Entities get stored here.
     * It is a key-value storage that also stores the order in which
     * the values are added.
     * The values added need to implement Identifiable (a function `getId: () => string`),
     * or else it will auto-generate an id.
     * Auto-generated ids are bad because you don't know what they represent.
     */
    DataStore: typeof DataStore;
    RoundingMethod: typeof RoundingMethod;
    /**
     * UICommands are strings that can be interpreted throughout the app
     * to do things. You can add them to send a message to the UI
     * from the backend.
     * Common sample ones:
     * "goToExploration"
     * "openCompendium"
     * "goToTransmute"
     * "goToEnding"
     * "closeAllMenus"
     * "closeEventOverlay"
     * "goToBestiary"
     * "goToItemCompendium"
     * "goToTransmuteEntry:[spellid]"
     * "goToEnemy:[enemyid]"
     * "goToCompendiumEntry:[itemid]"
     */
    addUICommand: typeof addUICommand;
    /**
     * Used by the UI to respond to the UI commands added with addUICommand.
     * The backend doesn't call this.
     */
    getUICommands: typeof getUICommands;
    /**
     * GameIcons are 32x32px icons (which are actually 16x16px icons magnified
     * to 32x32px).
     * You can use this function to register a new GameIcon. Check the examples
     * in the example mods.
     */
    registerGameIcon: typeof registerGameIcon;
    /**
     * HERE BE DRAGONS
     * Adding a new SpellElement is a lot of work.
     * Call this in preload().
     * Check the examples in the example mods.
     */
    registerSpellElement: typeof registerSpellElement;
    /**
     * Call this in preload().
     * Check the examples in the example mods.
     */
    registerResource: typeof registerResource;
    /**
     * Essences of Elements have an association with the Elements themselves.
     * The game often goes both ways to traverse from an Element to their Essence
     * and vice versa.
     * You need to register this here.
     */
    registerExtraElementToResourceMapping: typeof registerExtraElementToResourceMapping;
    /**
     * Elements are expected to have a channeling spell.
     * Call this function to register it.
     */
    registerChannelingSpellForElement: typeof registerChannelingSpellForElement;
    /**
     * Sometimes, you will make a change to GameState. For example,
     * you will introduce a new field, or you will delete some content.
     * If that is the case, you will need to modify GameState so that
     * the saved game is sanitized so there's no errors when the game
     * tries to run.
     * This runs when the game starts and the saved data is loaded,
     * and when save data is explicitly imported.
     */
    SaveDataCompatibilityTransforms: DataStore<import("../GameState").GameStateTransform>;
    /**
     * Resource caps are cached. This clears them. If you're modifying their caps,
     * you need to clear the cache.
     */
    clearResourceCapCache: typeof clearResourceCapCache;
    /**
     * The exp Researchers grant to every SpellElement from studying is cached.
     * If this changes, you need to clear the cache with this function.
     */
    clearResearcherExpCache: typeof clearResearcherExpCache;
    /**
     * A lot of values related to Wizards are cached, like the Wizard Power consumption,
     * production of every spell, Mana consumption, etc.
     * You might need to clear this cache if you see some bugs.
     */
    clearAutocastCaches: typeof clearAutocastCaches;
    /**
     * A way to cache things in the hot path.
     * The cache only applies to the current "tick" so it's mostly safe.
     */
    cacheByTickCount: typeof cacheByTickCount;
    /**
     * A way to cache things in the very hot path.
     * Use clearCacheKey to clear the cache.
     * Retirement will clear the cache too.
     */
    cacheIndefinitely: typeof cacheIndefinitely;
    /**
     * Used to clear an individual cache key, usually set with cacheIndefinitely.
     */
    clearCacheKey: typeof clearCacheKey;
    /**
     * If a spell's Mana cost changes, you need to clear the cache because
     * it's cached.
     */
    clearManaCostCache: typeof clearManaCostCache;
    /**
     * If any of the CombatStats of any target changes, you need to clear the cache.
     * Try to be as specific as possible, because those are used a lot throughout
     * the game.
     * Be very careful with effects that modify a stat as a function of another value
     * that changes on every tick. Prefer instead to clear the cache only once every
     * 500ms or so at least.
     */
    clearCombatStatCache: typeof clearCombatStatCache;
    /**
     * Clears many spell caches.
     * Use somewhat sparingly if you're seeing caching issues and they're not
     * going away.
     */
    clearAllSpellCaches: typeof clearAllSpellCaches;
    /**
     * This will cache any value depending on the integer value of state.run.secondsPlayed.
     * Use to cache something moderately hot that is ok if it's not real time.
     */
    cacheBySecondsPlayed: typeof cacheBySecondsPlayed;
    /**
     * Sometimes it's very cheap to determine if you need to recompute a value.
     * If that's the case, use this cache function.
     */
    cacheByArbitraryVersion: typeof cacheByArbitraryVersion;
    /**
     * For certain select things, if a function returns true, it will always return true
     * for the rest of the retirement. But if it returns false, it might return true
     * later, and we don't want to cache it.
     * If this is your situation, go ahead and use this!
     * An example is spell visibility.
     */
    cacheBooleanTrueOnly: typeof cacheBooleanTrueOnly;
    /**
     * If you change the total amount of land you have, this cache
     * needs to be cleared.
     */
    clearLandCache: typeof clearLandCache;
    /**
     * Spell visibility has a special cache. You will probably want to clear this
     * if some mechanic will change the value of a Spell's isVisible().
     */
    clearVisibleSpellsCache: typeof clearVisibleSpellsCache;
    /**
     * Sometimes the easiest or only feasible way to calculate some information
     * to display to the player is by making the changes to the state
     * and then seeing what happens. But going back from those changes
     * might be very difficult or mess up a lot of things. This can be used
     * to create a copy of the GameState that you can safely play with.
     * Note: This is a very expensive operation because it creates a deep copy
     * of the entire GameState! Use sparingly.
     */
    createHypotheticalState: typeof createHypotheticalState;
    /**
     * The nuke. Probably just do this if it's too hard. You will probably see
     * a UI hiccup.
     */
    clearAllCaches: typeof clearAllCaches;
    /**
     * This alert can be used to show a popup.
     * Useful for debugging since there is no access to dev tools within the game.
     * Works in preload() and load(), too.
     */
    alert: (title: string, message?: string, buttons?: import("react-native/types").AlertButton[], options?: import("react-native/types").AlertOptions) => void;
};
export type MR2Globals = typeof MR2;
