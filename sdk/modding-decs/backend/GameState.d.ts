import React from "react";
import { NotificationData } from "./Notification";
import { QuickbarData } from "./Quickbar";
import { Resource } from "./Resources";
import { AutocastRuleStatus, AutocastStrategy } from "./autocast/Autocast";
import { BuildingData } from "./buildings/Buildings";
import { EventOccurrenceData } from "./events/Events";
import { EventTag } from "./events/GameEvent";
import { CombatStat } from "./exploration/CombatStats";
import { CombatActionResult } from "./exploration/ExplorationActionResult";
import { ExplorationStatus } from "./exploration/ExplorationStatus";
import { DungeonFloor } from "./exploration/dungeons/DungeonFloor";
import { FamiliarData } from "./familiars/Familiar";
import { EquipmentSlot } from "./items/Equipment";
import { ItemOccurrence, ItemStack } from "./items/Item";
import { SpellcraftData, SpellcraftStrategy } from "./spellcraft/SpellcraftData";
import { SpellElementType } from "./spells/Elements";
import { TemporaryEffectData } from "./temporaryeffects/TemporaryEffects";
export type PlayerContextGlobalApprenticeLoadout = {
    name: string;
    allocation: Record<string, number>;
};
export declare enum ResearcherAutoAssignStrategy {
    OFF = "OFF",
    SPREAD_EVENLY = "SPREAD_EVENLY",
    HIGHEST_AMOUNT = "HIGHEST_AMOUNT",
    SPREAD_THEN_HIGHEST = "SPREAD_THEN_HIGHEST"
}
export type GameOptionsState = {
    targetFps: number;
    wakeLock: boolean;
    hiddenFromBottomMenu: string[];
    sectionOrder: string[];
    hideDamageEffects: boolean;
    doNotUseNativeDriver: boolean;
    overrideElementDisplay: SpellElementType | "no";
    themeMode: "light" | "dark";
    hideEventTags: EventTag[];
    enableSwiping: boolean;
    enableBottomMenu: boolean;
    leftHandedMode: boolean;
    putCastSpellOnBottomMenu: boolean;
    doNotShowEventsOnWideScreens: boolean;
    hideTooltips: boolean;
    hideBottomResourceViewer: boolean;
    hideChannelingSpellsOnHome: boolean;
    waitUntilFullyHealedBeforeExplore: boolean;
    waitUntilFamiliarFullyHealedBeforeExplore: boolean;
    autoPurchaseEnhancements: boolean;
    zoomLevel: number;
    researcherAutoAssignStrategy: ResearcherAutoAssignStrategy;
    expandedUI: Record<string, boolean>;
    saveExpandedUI: boolean;
    colorSpellButtonsByElement: boolean;
    compactUI: boolean;
    doNotPopupEventsDuringBossFights: boolean;
    showSpellExp: boolean;
    receiveTimePiecesInsteadOfRunningGame: boolean;
    enableMr1Rewards: boolean;
    alternateLandMechanic: boolean;
    showQuickTrashButton: boolean;
    pinnedScreens: string[];
    savedUIState: Record<string, any>;
    autoCombineMaxAllItems: boolean;
    hideQuickChanneling: boolean;
    lowContrastMode: boolean;
    healingItemsLifeThresholdFraction: number;
    useHealingItemsOnlyIfBelowThreshold: boolean;
};
export type GameWorldState = {
    flags: Record<string, boolean>;
    variables: Record<string, string | number | boolean>;
    maxPrimaryElementLevels: Partial<Record<SpellElementType, number>>;
    maxFurnitureNumbers: Record<string, number>;
    unlockedElements: Partial<Record<SpellElementType, boolean>>;
    totalTimesResetted: number;
    quickbars: QuickbarData[][];
    currentQuickbar: number;
    timesEnemyDefeated: Record<string, {
        player: number;
        familiars: number;
        losses: number;
    }>;
    secondsPlayed: number;
    activeSecondsPlayed: number;
    timePiecesConsumed: number;
    maxLandsPurchased: number;
    startTimestamp: number;
    endingsHistory: EndingStats[];
    sheerPowerLevel: number;
    storylineOracleLevel: number;
    blazingSpeedLevel: number;
    worldDifficultyLevel: number;
    synchro: {
        grids: Record<number, SynchroStrategyState>;
        currentGrid: number;
    };
    autoPurchaseTurnedOff: Record<string, boolean>;
    lastDungeonFloorCompleted: string | undefined;
    favoriteSpells: string[];
};
export type GameGlobalState = {
    startTimestamp: number;
    secondsPlayed: number;
    activeSecondsPlayed: number;
    timePiecesConsumed: number;
    appVersionTimestamp: number;
    appVersionString: string;
    appPlatform: string;
    isFullVersionSave: boolean;
    tickCount: number;
    newGamePlusUnlocked: boolean;
    newGamePlusCount: number;
    newGamePlusMax: number;
    totalBoonPointsEarned: number;
    autocast: GameAutocastState;
    autoUsePouch: boolean;
    notifications: NotificationData[];
    knownEnemiesThatDrop: Record<string, Record<string, boolean>>;
    itemsEverAddedToInventory: Record<string, boolean>;
    debugShowUpdatesPerSec: boolean;
    debugLastUpdateTimestamps: number[];
    debugLastUpdateBeginEndTimestamps: {
        begin: number;
        end: number;
        ticksRun: number;
    }[];
    endingsHistory: EndingStats[];
    mr1flags: Record<string, boolean>;
    maxElementLevels: Partial<Record<SpellElementType, number>>;
    timesEnemyDefeated: Record<string, {
        player: number;
        familiars: number;
        losses: number;
    }>;
    spellcraftLoadouts: GameSpellcraftLoadoutState;
    hasCheated: boolean;
    favoriteTransmutationSpells: string[];
    everVisibleSpellIds: Record<string, boolean>;
    modVersions: Record<string, string>;
};
export type GameEquipmentState = Record<EquipmentSlot, ItemOccurrence[]>;
export type GameEquipmentLoadout = {
    name: string;
    equipment: GameEquipmentState;
};
export type MessageLog = {
    id: string;
    secondsPlayed: number;
    message: string;
    accessibleMessage?: string;
    realTimestamp: number;
};
export type EndingStats = {
    endingId: string;
    timestamp: number;
    challengeId: string | undefined;
    totalTimePlayed: number;
    totalTimePlayedThisWorld: number;
    totalTimePlayedThisRun: number;
    totalActiveTimePlayed: number;
    totalActiveTimePlayedThisWorld: number;
    totalActiveTimePlayedThisRun: number;
    totalRealWorldTimePlayed: number;
    totalRealWorldTimePlayedThisWorld: number;
    totalRealWorldTimePlayedThisRun: number;
    timePiecesConsumed: number;
    timePiecesConsumedThisWorld: number;
    timePiecesConsumedThisRun: number;
    totalRetirements: number;
    primaryElement: SpellElementType;
    primaryElementLevelOnEnding: number;
    secondaryElement: SpellElementType | undefined;
    secondaryElementLevelOnEnding: number | undefined;
    combatClassId: string;
    mpl: number;
    researchMultiplier: number;
    productionMultiplier: number;
    completedStorylines: number;
    totalStorylineAmount: number;
    worldsCreated: number;
    sheerPowerLevel: number;
    storylineOracleLevel: number;
    blazingSpeedLevel: number;
    worldDifficultyLevel: number;
};
export type GameExplorationState = {
    currentHP: number;
    explorationStatus: ExplorationStatus;
    explorationStartTime: number;
    currentDungeonFloorId: string;
    currentEnemy: {
        id: string;
        currentHP: number;
    };
    successfulExplorationsPerFloor: Record<string, number>;
    playerActionProgress: number;
    familiarActionProgress: number;
    familiarIsInBackRow: boolean;
    enemyActionProgress: number;
    lastPlayerDamageCause: string | undefined;
    lastEnemyDamageCause: string | undefined;
    actionResultQueue: CombatActionResult[];
    lastActionResultPushedTime: number;
    pouchItemsUsesLeft: Record<string, number>;
    variables: Record<string, boolean>;
    triggerPlayerDeath: boolean;
    enemyDamageTallyByCause: Record<string, number>;
};
export type GameAutocastState = {
    savedStrategies: Record<number, AutocastStrategy>;
    currentStrategy: AutocastStrategy;
    lastStrategyIndex: number;
};
export type GameSpellcraftLoadoutState = {
    savedStrategies: Record<number, SpellcraftStrategy>;
    lastStrategyIndex: number;
};
export type GameAutocastStatusState = {
    rules: Record<string, AutocastRuleStatus>;
    autocastPaused: boolean;
};
export type SynchroStrategyState = {
    grid: Record<number, Record<number, SpellElementType | undefined>>;
    name: string | undefined;
};
export type GameRunState = {
    resources: Partial<Record<Resource, number>>;
    buildings: Record<string, BuildingData>;
    landPurchaseCount: number;
    flags: Record<string, boolean>;
    variables: Record<string, string | number | boolean>;
    elementExperience: Partial<Record<SpellElementType, number>>;
    elementExponents: Partial<Record<SpellElementType, number>>;
    eventQueue: string[];
    eventOccurrences: Record<string, EventOccurrenceData>;
    nextEventIsManuallyTriggered: boolean;
    secondsPlayed: number;
    activeSecondsPlayed: number;
    timePiecesConsumed: number;
    newFlagsOnRetirement: Record<string, boolean>;
    endingTriggered: EndingStats | undefined;
    startTimestamp: number;
    lastDungeonFloorCompleted: string | undefined;
    temporaryEffects: Record<string, TemporaryEffectData>;
    recentSpellsCast: string[];
    nextRandomEvent: number;
    primaryElement: SpellElementType | undefined;
    inventory: ItemStack[];
    equipment: GameEquipmentState;
    equipmentLoadouts: GameEquipmentLoadout[];
    lastEquipmentLoadoutModified: number;
    exploration: GameExplorationState;
    explorationMessageLog: MessageLog[];
    lastSpellCastTimes: Record<string, number>;
    uiCommands: string[];
    lastProcessedTime: number;
    lastItemUsedTimes: Record<string, number>;
    skipAheadTime: number;
    warpTimeSecs: number;
    summoningBlockedUntilTime: number;
    boostsBought: Record<SpellElementType, number>;
    autocast: GameAutocastStatusState;
    saleStallItems: ItemOccurrence[];
    saleStallProgressRatio: number;
    partiallyUnlockedElements: Partial<Record<SpellElementType, boolean>>;
    combatClassId: string | undefined;
    explorationTriggers: Record<string, {
        timesTriggered: number;
        next: number;
    }>;
    studyAllocation: Record<SpellElementType, number>;
    familiars: Record<string, FamiliarData>;
    secondaryElement: SpellElementType | undefined;
    autoPurchaseActionCount: Record<string, number | "max">;
    empoweredSpells: Record<string, boolean>;
    activeRituals: Record<string, boolean>;
    maxElementLevelsOnPrevRetirement: Partial<Record<SpellElementType, number>>;
    lastComputedLevelUpElementExperience: Partial<Record<SpellElementType, number>>;
    pityEnabledAtSeconds: number | undefined;
    pityCounter: number;
    extraEventSecs: number;
    currentChallengeId: string | undefined;
    autoAdvanceToNextFloor: boolean;
    autoAttemptBoss: boolean;
    spellcrafts: Record<string, SpellcraftData>;
    autoCombineMaxItemIds: Record<string, boolean>;
    lastAssignedResearcherTime: number;
    lastErrorDebugInfo?: string;
    enhancementQueue: string[];
};
export type GameTempState = {
    cache: Map<string, [number, any]>;
    flagCache: Map<string, boolean>;
    worldFlagCache: Map<string, boolean>;
    elementLevelCache: Record<SpellElementType, [number, any] | undefined>;
    locationEncyclopediaCache: DungeonFloor[] | undefined;
    isInAutocast: boolean;
    isInPermacast: boolean;
    isInPouch: boolean;
    lastAutoPurchaseRun: number;
    lastAutoPurchaseEnhancementRun: number;
    lastAutoCombineRun: number;
    familiarLevelCache: Map<string, number>;
    combatStatCache: {
        Player: Partial<Record<CombatStat, number>>;
        Enemy: Partial<Record<CombatStat, number>>;
        Familiar: Partial<Record<CombatStat, Record<string, {
            level: number;
            value: number;
        }>>>;
    };
    resourceCapCache: Partial<Record<Resource, number>>;
    unlockedElementsCache: SpellElementType[];
    incomeOverTimeCache: Record<string, Partial<Record<Resource, number>>>;
    autocastPointsRequirementCache: Record<string, number>;
    spellManaCostCache: Record<string, number>;
    researchPerSecCache: Partial<Record<SpellElementType, number>> | undefined;
    spellRequirementsCache: Record<string, boolean>;
    spellExpCache: Record<string, Partial<Record<SpellElementType, number>>>;
    lastProcessedAutocastSpellId: string | undefined;
    maxElementLevel: number | undefined;
    maxFamiliarLevel: number | undefined;
    synchroBonusCache: Record<string, number>;
};
export type GameState = {
    run: GameRunState;
    world: GameWorldState;
    global: GameGlobalState;
    options: GameOptionsState;
    temp: GameTempState;
    isFake: boolean;
};
export type GameStateTransform = (oldState: GameState) => GameState;
export type GameStateValue = GameState & {
    apply: (transform: GameStateTransform) => void;
};
export declare const EXPLORATION_INITIAL_STATE: GameExplorationState;
export declare const EQUIPMENT_INITIAL_STATE: GameEquipmentState;
export declare const AUTOCAST_INITIAL_STATE: GameAutocastState;
export declare const SYNCHRO_INITIAL_STATE: SynchroStrategyState;
export declare const GLOBAL_INITIAL_STATE: GameGlobalState;
export declare const RUN_INITIAL_STATE: GameRunState;
export declare const WORLD_INITIAL_STATE: GameWorldState;
export declare const OPTIONS_INITIAL_STATE: GameOptionsState;
export declare const INITIAL_STATE: GameState;
export declare function createTempState(): GameTempState;
export declare function createHypotheticalState(state: GameState): GameState;
export type StateContextValue = GameState & {
    apply: (transform: GameStateTransform) => void;
    overwrite: (transform: GameStateTransform) => void;
};
export declare const StateContext: React.Context<{
    apply: (transform: GameStateTransform) => void;
    overwrite: (transform: GameStateTransform) => void;
    run: GameRunState;
    world: GameWorldState;
    global: GameGlobalState;
    options: GameOptionsState;
    temp: GameTempState;
    isFake: boolean;
}>;