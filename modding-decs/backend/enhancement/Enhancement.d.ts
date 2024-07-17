import { Action, DoActionArgs } from "../action/Action";
import { ActionArea, ActionSubcategory } from "../action/ActionAreas";
import { GameState } from "../GameState";
import { Resource } from "../Resources";
export declare abstract class Enhancement extends Action {
    abstract getBaseName(): string;
    abstract getSubcategory(): ActionSubcategory;
    abstract getBaseResourceCost(): Partial<Record<Resource, number>>;
    abstract getItemCost(): Record<string, number>;
    getAreas(): Partial<Record<ActionArea, ActionSubcategory[]>>;
    getDisplayName(state: GameState): string;
    isVisible(state: GameState): boolean;
    getRequiredEnhancements(): Enhancement[];
    getCost(state: GameState): {
        resources: Partial<Record<Resource, number>>;
        items: Record<string, number>;
    };
    isCapEnough(state: GameState): boolean;
    canBeTurnedOff(): boolean;
    isPurchased(state: GameState): boolean;
    hasEverBeenPurchased(state: GameState): boolean;
    setPurchased(state: GameState): GameState;
    isTurnedOn(state: GameState): boolean;
    toggleTurnedOff(state: GameState): GameState;
    doAction(args: DoActionArgs, state: GameState): GameState;
    toggleEnqueue(state: GameState): GameState;
    getQueuePosition(state: GameState): number | undefined;
}
