import { GameState, GameStateTransform } from "./GameState";
import { Action } from "./action/Action";
import { ItemOccurrence } from "./items/Item";
export interface QuickbarItemData {
    type: "item";
    occurrence: ItemOccurrence;
}
export interface QuickbarActionData {
    type: "action";
    id: string;
}
export type QuickbarData = QuickbarItemData | QuickbarActionData;
export interface QuickbarAction {
    getDisplayName(state: GameState): string;
    isEnabled(state: GameState): boolean;
    isActive(state: GameState): boolean;
    getTransform(state: GameState): GameStateTransform;
    toQuickbarData(): QuickbarData;
}
export declare class QuickbarActionImpl {
    data: QuickbarActionData;
    constructor(data: QuickbarActionData);
    getAction(): Action;
    isActive(state: GameState): boolean;
    getDisplayName(state: GameState): string;
    isEnabled(state: GameState): boolean;
    getTransform(state: GameState): GameStateTransform;
    toQuickbarData(): QuickbarData;
}
export declare function getQuickbarActions(state: GameState): QuickbarAction[];
export declare function addActionToQuickbar(state: GameState, action: Action): GameState;
export declare function addItemToQuickbar(state: GameState, itemOccurrence: ItemOccurrence): GameState;
export declare function addToQuickbar(state: GameState, data: QuickbarData): GameState;
export declare function removeFromQuickbar(state: GameState, data: QuickbarData): GameState;
export declare function isQuickbarFull(state: GameState): boolean;
export declare function isInQuickbar(state: GameState, data: QuickbarData): boolean;
