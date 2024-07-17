import { GameState, GameStateTransform, MessageLog } from "../GameState";
import { DataStore } from "../generic/DataStore";
import { FamiliarClass } from "./FamiliarClass";
export declare enum FamiliarStatusType {
    Idle = "Idle",
    Exploring = "Exploring",
    Companion = "Companion"
}
export declare function translateFamiliarStatusType(status: FamiliarStatusType): string;
export declare enum FamiliarCompanionStatusType {
    Reviving = "Reviving",
    Exploring = "Exploring",
    Combat = "Combat",
    Preparing = "Preparing"
}
export declare function translateFamiliarCompanionStatusType(status: FamiliarCompanionStatusType): string;
export type FamiliarStatus = {
    status: FamiliarStatusType;
    exploringDungeonFloorId: string;
    exploringNextRandomRoll: number;
    autoExploring: boolean;
    currentHp: number;
    triggerFamiliarDeath: boolean;
    actionProgress: number;
    companionStatus: FamiliarCompanionStatusType;
};
export type FamiliarData = {
    id: string;
    familiarClassId: string;
    exp: number;
    status: FamiliarStatus;
    messageLog: MessageLog[];
};
export declare function getFamiliarData(state: GameState, familiarId: string): FamiliarData | undefined;
export declare const FamiliarDeletionListeners: DataStore<GameStateTransform>;
export declare function deleteFamiliar(state: GameState, familiarId: string): GameState;
export declare function getCurrentCompanionId(state: GameState): string;
export declare function getCurrentCompanionData(state: GameState): FamiliarData | undefined;
export declare function getCurrentCompanionClass(state: GameState): FamiliarClass | undefined;
export declare function setCurrentCompanion(state: GameState, familiarId: string): GameState;
export declare function setFamiliarToExplore(state: GameState, familiarId: string, dungeonFloorId: string): GameState;
export declare function setAllFamiliarsToExplore(state: GameState, dungeonFloorId: string): GameState;
export declare function setFamiliarToAutoExplore(state: GameState, familiarId: string): GameState;
export declare function setAllFamiliarsToAutoExplore(state: GameState): GameState;
export declare function setIdle(state: GameState, familiarId: string): GameState;
export declare function getFamiliarAmount(state: GameState): number;
export declare function getFamiliarMessageLog(state: GameState, familiarId: string): MessageLog[];
export declare function wouldBeThrottledIfPushingToCreatureMessageLog(state: GameState, familiarId: string): boolean;
export declare function pushToFamiliarMessageLog(state: GameState, familiarId: string, log: string): GameState;
export declare function areFamiliarsUnlocked(state: GameState): boolean;
export declare function areFamiliarsEverUnlocked(state: GameState): boolean;
export declare function isDungeonFloorValidForFamiliars(state: GameState, dungeonFloorId: string): boolean;
export declare function getFloorsAvailableForFamiliars(state: GameState): any;
declare const Familiars: DataStore<FamiliarClass>;
export { Familiars };
export declare function loadFamiliarCommonLogic(): void;
