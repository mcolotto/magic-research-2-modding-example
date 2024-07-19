import { EndingStats, GameState, GameStateTransform } from "../GameState";
import { DataStore } from "../generic/DataStore";
export type Ending = {
    id: string;
    title: string;
    description: string;
    storylineId: string;
};
export declare const Endings: DataStore<Ending>;
export declare function addEnding(id: string, title: string, contents: string, storylineId: string): void;
export declare function getEndingData(state: GameState): EndingStats | undefined;
export declare function hasEverTriggeredEnding(state: GameState, id: string): boolean;
export declare const EndingCloseListeners: DataStore<GameStateTransform>;
export declare function setGameEnding(state: GameState, id: string): GameState;
