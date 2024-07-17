import { GameState } from "../GameState";
import { Resource } from "../Resources";
import { Action, DoActionArgs } from "../action/Action";
import { ActionArea, ActionSubcategory } from "../action/ActionAreas";
import { SpellElement } from "../spells/Elements";
declare abstract class BoostActionBase extends Action {
    constructor();
    isVisible(state: GameState): boolean;
    getAreas(): Partial<Record<ActionArea, ActionSubcategory[]>>;
    getTags(): string[];
    abstract getName(): string;
    getDisplayName(state: GameState): string;
    abstract getElement(): SpellElement;
    _costScaleMonstium: () => string[];
    _costScaleEssence: (essence: any) => any[];
    getCost(state: GameState): {
        resources: Partial<Record<Resource, number>>;
        items: Record<string, number>;
    };
    abstract getTotalBoostDescription(state: GameState): string;
    doAction(args: DoActionArgs, state: GameState): GameState;
    canAutoPurchaseMax(): boolean;
}
export declare function isBoostingUnlocked(state: GameState): boolean;
export declare function getBoughtBoostsAmount(state: GameState, element: SpellElement): number;
export declare function hasBoosts(state: GameState): boolean;
export declare function getBoostsBonusText(state: GameState): string;
export declare function getTotalBoughtBoosts(state: GameState): number;
export default BoostActionBase;
