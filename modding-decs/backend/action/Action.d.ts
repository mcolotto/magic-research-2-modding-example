import { GameState } from "../GameState";
import { Resource } from "../Resources";
import { TransformationTag } from "../transformation/Transformation";
import { TransformationValueType } from "../transformation/TransformationTags";
import { ActionArea, ActionSubcategory } from "./ActionAreas";
export type DoActionArgs = {
    isAutomatic: boolean;
    extra?: Record<string, any>;
};
export type ActionEffect = {
    value: number;
    tags?: TransformationTag[];
    unit?: string;
    valueType?: TransformationValueType;
    base?: number;
};
export declare abstract class Action {
    constructor();
    abstract getId(): string;
    abstract getDisplayName(state: GameState): string;
    abstract getCost(state: GameState): {
        resources: Partial<Record<Resource, number>>;
        items: Record<string, number>;
    };
    abstract doAction(args: DoActionArgs, state: GameState): GameState;
    abstract isVisible(state: GameState): boolean;
    abstract getDisplayDescription(state: GameState): string;
    abstract getDisplayEffect(state: GameState): string;
    getAreas(): Partial<Record<ActionArea, ActionSubcategory[]>>;
    canSpam(): boolean;
    canAutoPurchaseMax(): boolean;
    protected getBaseActionEffects(): Record<string, ActionEffect>;
    getCachedBaseActionEffects: () => Record<string, ActionEffect>;
    tagsByEffect: Record<string, string[]>;
    getTagsByEffect(key: string, baseEffect: ActionEffect): string[];
    getActionEffect(state: GameState, effectId: string): number;
    getActionEffects(state: GameState, onlyId?: string): Record<string, number>;
    memoizedActionEffectParam: () => {
        action: Action;
    };
    memoizedActionEffectExplanationParam: (baseEffect: ActionEffect) => {
        action: Action;
        unit: string | undefined;
        valueType: TransformationValueType | undefined;
        base: number | undefined;
    };
    getActionEffectExplanations(state: GameState, onlyId?: string): Record<string, string>;
    getTags(): TransformationTag[];
    canAfford(state: GameState): boolean;
    isCapEnough(state: GameState): boolean;
    payCost(state: GameState, n?: number): GameState;
    isEnabled(state: GameState, skipAffordabilityChecks?: boolean): boolean;
    isActive(state: GameState): boolean;
    requireConfirmation(state: GameState): boolean;
}
