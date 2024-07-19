import { GameState } from "../GameState";
import { Identifiable } from "../generic/Identifiable";
import { GameEvent } from "./GameEvent";
export type DungeonEvent = {
    event: GameEvent;
    getWeight: (state: GameState) => number;
};
export declare class DungeonEventGroup implements Identifiable {
    id: string;
    events: DungeonEvent[];
    constructor(id: string);
    getId(): string;
    addEvent(event: DungeonEvent): DungeonEventGroup;
    getSelectedEvent(state: GameState): GameEvent | undefined;
    hasFinishedSelecting(state: GameState): boolean;
    hasFinishedTriggeringThisRun(state: GameState): boolean;
    selectEvent(state: GameState): GameState;
}
export declare function getOrCreateDungeonEventGroup(id: string): DungeonEventGroup;
export declare function loadDungeonEventGroups(): void;
