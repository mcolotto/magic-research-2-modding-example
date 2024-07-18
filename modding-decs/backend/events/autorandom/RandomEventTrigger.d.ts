import { GameState } from "../../GameState";
import { GameEvent } from "../GameEvent";
export type RandomEvent = {
    event: GameEvent;
    weight: number;
    eligible?: (state: GameState) => boolean;
    getParams?: (state: GameState) => any;
};
export declare function registerRandomEventTrigger(event: GameEvent, weight: number, eligible?: (state: GameState) => boolean, getParams?: (state: GameState) => any): void;
export declare function unregisterRandomEventTrigger(eventId: string): void;
export declare function getAllRandomEventTriggerIds(): string[];
export declare function isInPity(state: GameState): boolean;
export declare function triggerRandomEvent(state: GameState): GameState;
export declare function calculateEventChances(state: GameState): Record<string, number>;
export declare function loadRandomEventTriggers(): void;
