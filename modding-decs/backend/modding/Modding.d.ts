import { RoundingMethod, formatMultiplier, formatNumber } from "../../utils/FormattingUtils";
import { hasFlag, hasWorldFlag } from "../Flags";
import { addGameStateListener, addHighPriorityGameStateListener, clearGameStateListener, getAllGameStateListenerIds, getAllHighPriorityGameStateListenerIds } from "../GameStateListeners";
import { Resource, getCappedResourceAmount, getResourceAmount, getResourceCap, grantResource, registerResourceCapClearer } from "../Resources";
import { addUICommand } from "../UICommands";
import { Action } from "../action/Action";
import { ActionArea, ActionSubcategories } from "../action/ActionAreas";
import { SpellAutocastCategory } from "../autocast/SpellAutocastCategory";
import BoostActionBase, { getBoughtBoostsAmount, isBoostingUnlocked } from "../boost/BoostActionBase";
import { Building, BuildingSpell } from "../buildings/Building";
import { getBuildingAmount, getBuildingAmountTurnedOn, getFreeLand, getTotalLand, getUsedLand } from "../buildings/Buildings";
import { Enhancement } from "../enhancement/Enhancement";
import { isEnhancementEverUnlocked, isEnhancementUnlocked } from "../enhancement/Enhancements";
import { SimpleGameEvent, buildEvent } from "../events/EventMessageBuilder";
import { EventTag } from "../events/GameEvent";
import { getAllRandomEventTriggerIds, registerRandomEventTrigger, unregisterRandomEventTrigger } from "../events/autorandom/RandomEventTrigger";
import { AttackTarget } from "../exploration/AttackTarget";
import { CombatStat } from "../exploration/CombatStats";
import { aoeEnemyAttackEffect, calculateAttackTarget, calculateDamage, calculateIsHit, dispelAllEnemyAttackEffect, drainingEnemyAttackEffect, drainingSummonAttackEffect, fractionAoEEnemyAttackEffect, fractionEnemyAttackEffect, getCurrentDungeonFloor, getCurrentEnemyHPFraction, getCurrentFamiliarAction, getCurrentFamiliarHPFraction, getCurrentHPFromTarget, getCurrentPlayerHPFraction, getEnemyTurnCounter, getStatFromTarget, getSuccessfulExplorationsForFloor, modifyTargetCurrentHP, pierceDefenseAoEEnemyAttackEffect, pierceDefenseEnemyAttackEffect, standardEnemyAttackEffect, standardFamiliarAttackEffect, standardPlayerAttackEffect, startCombat, triggerCombatLoss } from "../exploration/Exploration";
import { pushCombatActionResult } from "../exploration/ExplorationActionResult";
import { ExplorationStatus } from "../exploration/ExplorationStatus";
import { getExplorationStatus } from "../exploration/ExplorationUtils";
import { Dungeon } from "../exploration/dungeons/Dungeon";
import { DungeonFloor } from "../exploration/dungeons/DungeonFloor";
import { Enemy } from "../exploration/enemies/Enemy";
import { FamiliarCompanionStatusType, areFamiliarsEverUnlocked, areFamiliarsUnlocked, getFamiliarAmount, getFamiliarData, pushToFamiliarMessageLog } from "../familiars/Familiar";
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
import { Ritual } from "../rituals/Ritual";
import { areRitualsEverUnlocked, areRitualsUnlocked, clearAllRitualCaches } from "../rituals/Rituals";
import { Spellcraft, clearSpellcraftCostCache } from "../spellcraft/Spellcraft";
import { isSpellcraftEverUnlocked, isSpellcraftUnlocked } from "../spellcraft/SpellcraftUtils";
import { CombatSpellBase } from "../spells/CombatSpellBase";
import { SpellElement, getElementLevel, getFullyUnlockedElements, getUnlockedElements } from "../spells/Elements";
import { Spell } from "../spells/Spell";
import { registerBuffEmpowerEffects, registerEmpowerEffects, registerSpell, registerStandardEmpowerEffects } from "../spells/Spells";
import { getStandardAttackEffectText, getStandardRangeEffectText, getStandardSpellAttackEffect, getStandardSpellAttackEffectText, isCastingRecommendedTemporaryEffect } from "../spells/Utils";
import { Storyline } from "../storylines/Storyline";
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
    load: (MR2: MR2Globals) => void;
};
export declare const MR2: {
    TransformationTags: typeof TransformationTags;
    TransformationType: typeof TransformationType;
    TransformationValueType: typeof TransformationValueType;
    registerTransformation: typeof registerTransformation;
    clearTransformationCache: typeof clearTransformationCache;
    applyTransformations: typeof applyTransformations;
    applyTransformationsCached: typeof applyTransformationsCached;
    applyTransformationsPermaCached: typeof applyTransformationsPermaCached;
    explainTransformations: typeof explainTransformations;
    explainTransformationsText: typeof explainTransformationsText;
    Resource: typeof Resource;
    grantResource: typeof grantResource;
    getResourceAmount: typeof getResourceAmount;
    getCappedResourceAmount: typeof getCappedResourceAmount;
    getResourceCap: typeof getResourceCap;
    registerResourceCapClearer: typeof registerResourceCapClearer;
    hasFlag: typeof hasFlag;
    setFlag: (flag: string) => any;
    hasWorldFlag: typeof hasWorldFlag;
    setWorldFlag: (flag: string) => any;
    getStandardRangeEffectText: typeof getStandardRangeEffectText;
    formatNumber: typeof formatNumber;
    formatMultiplier: typeof formatMultiplier;
    grantElementExp: (element: any, amount: any) => any;
    getUnlockedElements: typeof getUnlockedElements;
    getFullyUnlockedElements: typeof getFullyUnlockedElements;
    getElementLevel: typeof getElementLevel;
    TemporaryEffect: typeof TemporaryEffect;
    TemporaryEffects: DataStore<TemporaryEffect>;
    getTemporaryEffectEndTime: typeof getTemporaryEffectEndTime;
    getTemporaryEffectSetTime: typeof getTemporaryEffectSetTime;
    wasTemporaryEffectCleared: typeof wasTemporaryEffectCleared;
    hasTemporaryEffect: typeof hasTemporaryEffect;
    hasEverHadTemporaryEffect: typeof hasEverHadTemporaryEffect;
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
    registerTemporaryEffectListener: typeof registerTemporaryEffectListener;
    registerTemporaryEffectCombatStatCacheClearer: typeof registerTemporaryEffectCombatStatCacheClearer;
    buildEvent: typeof buildEvent;
    registerRandomEventTrigger: typeof registerRandomEventTrigger;
    unregisterRandomEventTrigger: typeof unregisterRandomEventTrigger;
    getAllRandomEventTriggerIds: typeof getAllRandomEventTriggerIds;
    EventTriggerListeners: DataStore<(state: import("../GameState").GameState, event: import("../events/GameEvent").GameEvent) => import("../GameState").GameState>;
    EventTag: typeof EventTag;
    SimpleGameEvent: typeof SimpleGameEvent;
    Storyline: typeof Storyline;
    Storylines: DataStore<Storyline>;
    Action: typeof Action;
    Actions: DataStore<Action>;
    ActionArea: typeof ActionArea;
    ActionSubcategories: typeof ActionSubcategories;
    Spell: typeof Spell;
    CombatSpellBase: typeof CombatSpellBase;
    Spells: DataStore<Spell>;
    SpellElement: typeof SpellElement;
    SpellAutocastCategory: typeof SpellAutocastCategory;
    registerSpell: typeof registerSpell;
    getStandardAttackEffectText: typeof getStandardAttackEffectText;
    getStandardSpellAttackEffect: typeof getStandardSpellAttackEffect;
    getStandardSpellAttackEffectText: typeof getStandardSpellAttackEffectText;
    isCastingRecommendedTemporaryEffect: typeof isCastingRecommendedTemporaryEffect;
    registerStandardEmpowerEffects: typeof registerStandardEmpowerEffects;
    registerEmpowerEffects: typeof registerEmpowerEffects;
    registerBuffEmpowerEffects: typeof registerBuffEmpowerEffects;
    Building: typeof Building;
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
    getCurrentDungeonFloor: typeof getCurrentDungeonFloor;
    startCombat: typeof startCombat;
    getCurrentHPFromTarget: typeof getCurrentHPFromTarget;
    getCurrentPlayerHPFraction: typeof getCurrentPlayerHPFraction;
    getCurrentFamiliarHPFraction: typeof getCurrentFamiliarHPFraction;
    getCurrentEnemyHPFraction: typeof getCurrentEnemyHPFraction;
    calculateDamage: typeof calculateDamage;
    calculateIsHit: typeof calculateIsHit;
    modifyTargetCurrentHP: typeof modifyTargetCurrentHP;
    getStatFromTarget: typeof getStatFromTarget;
    CombatStat: typeof CombatStat;
    AttackTarget: typeof AttackTarget;
    calculateAttackTarget: typeof calculateAttackTarget;
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
    drainingSummonAttackEffect: typeof drainingSummonAttackEffect;
    standardPlayerAttackEffect: typeof standardPlayerAttackEffect;
    getSuccessfulExplorationsForFloor: typeof getSuccessfulExplorationsForFloor;
    getEnemyTurnCounter: typeof getEnemyTurnCounter;
    triggerCombatLoss: typeof triggerCombatLoss;
    ExplorationStatus: typeof ExplorationStatus;
    getExplorationStatus: typeof getExplorationStatus;
    Enemy: typeof Enemy;
    Enemies: DataStore<Enemy>;
    Dungeon: typeof Dungeon;
    Dungeons: DataStore<Dungeon>;
    DungeonFloor: typeof DungeonFloor;
    DungeonFloors: DataStore<DungeonFloor>;
    Enhancement: typeof Enhancement;
    Enhancements: DataStore<Enhancement>;
    EnhancementPurchaseListeners: DataStore<(state: import("../GameState").GameState, enhancement: Enhancement) => import("../GameState").GameState>;
    isEnhancementUnlocked: typeof isEnhancementUnlocked;
    isEnhancementEverUnlocked: typeof isEnhancementEverUnlocked;
    SynchroBonus: typeof SynchroBonus;
    SynchroBonuses: DataStore<SynchroBonus>;
    SynchroChangeListeners: DataStore<import("../GameState").GameStateTransform>;
    getSynchroPosition: typeof getSynchroPosition;
    isSynchroUnlocked: typeof isSynchroUnlocked;
    getCurrentSynchroBonuses: typeof getCurrentSynchroBonuses;
    BoostActionBase: typeof BoostActionBase;
    isBoostingUnlocked: typeof isBoostingUnlocked;
    getBoughtBoostsAmount: typeof getBoughtBoostsAmount;
    FamiliarClass: typeof FamiliarClass;
    Familiars: DataStore<FamiliarClass>;
    FamiliarCompanionStatusType: typeof FamiliarCompanionStatusType;
    FamiliarDeletionListeners: DataStore<import("../GameState").GameStateTransform>;
    FamiliarEvolutionTransmutationSpell: typeof FamiliarEvolutionTransmutationSpell;
    areFamiliarsUnlocked: typeof areFamiliarsUnlocked;
    areFamiliarsEverUnlocked: typeof areFamiliarsEverUnlocked;
    getFamiliarData: typeof getFamiliarData;
    getFamiliarAmount: typeof getFamiliarAmount;
    pushToFamiliarMessageLog: typeof pushToFamiliarMessageLog;
    getCurrentFamiliarAction: typeof getCurrentFamiliarAction;
    Spellcraft: typeof Spellcraft;
    Spellcrafts: DataStore<Spellcraft>;
    isSpellcraftUnlocked: typeof isSpellcraftUnlocked;
    isSpellcraftEverUnlocked: typeof isSpellcraftEverUnlocked;
    clearSpellcraftCostCache: typeof clearSpellcraftCostCache;
    Ritual: typeof Ritual;
    Rituals: DataStore<Ritual>;
    areRitualsUnlocked: typeof areRitualsUnlocked;
    areRitualsEverUnlocked: typeof areRitualsEverUnlocked;
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
    addGameStateListener: typeof addGameStateListener;
    addHighPriorityGameStateListener: typeof addHighPriorityGameStateListener;
    clearGameStateListener: typeof clearGameStateListener;
    getAllGameStateListenerIds: typeof getAllGameStateListenerIds;
    getAllHighPriorityGameStateListenerIds: typeof getAllHighPriorityGameStateListenerIds;
    registerTimeTickListener: typeof registerTimeTickListener;
    getAllTimeTickListenerIds: typeof getAllTimeTickListenerIds;
    deleteTimeTickListener: typeof deleteTimeTickListener;
    SetFlagListeners: DataStore<(state: import("../GameState").GameState, flag: string) => import("../GameState").GameState>;
    BuildingAmountListeners: DataStore<(state: import("../GameState").GameState, building: Building) => import("../GameState").GameState>;
    IncomeOverTimeProducers: DataStore<IncomeOverTimeProducer>;
    IncomeOverTimeProducer: typeof IncomeOverTimeProducer;
    LevelUpListeners: DataStore<(state: import("../GameState").GameState, element: SpellElement, oldExp: number) => import("../GameState").GameState>;
    CombatActionResultListeners: DataStore<import("../exploration/ExplorationActionResult").CombatActionResultListener>;
    AddToInventoryForFirstTimeListeners: DataStore<import("../GameState").GameStateTransform>;
    EquipmentChangeListeners: DataStore<(state: import("../GameState").GameState) => import("../GameState").GameState>;
    SpellCastListeners: DataStore<import("../spells/SpellCastListeners").SpellCastListener>;
    TemporaryEffectExpirationListeners: DataStore<(state: import("../GameState").GameState, effect: import("../temporaryeffects/TemporaryEffects").TemporaryEffectData) => void>;
    OfflineTickListeners: DataStore<import("../timetick/OfflineTickListeners").OfflineTickListener>;
    WarpTimeListeners: DataStore<import("../timetick/WarpTimeListeners").WarpTimeListener>;
    clearCalculatedIncomeCache: typeof clearCalculatedIncomeCache;
    EnemyDeathListeners: DataStore<import("../exploration/Exploration").EnemyDeathListener>;
    DataStore: typeof DataStore;
    RoundingMethod: typeof RoundingMethod;
    Math: Math;
    addUICommand: typeof addUICommand;
};
export type MR2Globals = typeof MR2;
