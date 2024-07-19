import { GameState } from "../GameState";
import { ActionEffect } from "../action/Action";
import { Identifiable } from "../generic/Identifiable";
import { SpellElementType } from "../spells/Elements";
import { TransformationValueType } from "../transformation/TransformationTags";
export declare abstract class SynchroBonus implements Identifiable {
    constructor();
    getId(): string;
    abstract getEffect(state: GameState, amount: number): string | undefined;
    protected getBaseBonusEffects(): Record<string, ActionEffect>;
    getCachedBaseBonusEffects: () => Record<string, ActionEffect>;
    abstract getElement1(): SpellElementType;
    abstract getElement2(): SpellElementType;
    getName(): string;
    getTags(): string[];
    isVisible(state: GameState): boolean;
    isBeneficial(): boolean;
    tagsByEffect: Record<string, string[]>;
    getTagsByEffect(key: string, baseEffect: ActionEffect): string[];
    getBonusEffect(state: GameState, effectId: string, amount?: number): number;
    getBonusEffects(state: GameState, amount?: number): Record<string, number>;
    getExplanationParamsByEffect: (baseEffect: ActionEffect) => {
        valueType: TransformationValueType;
        unit: string;
    };
    getBonusEffectExplanations(state: GameState, amount?: number, onlyId?: string): Record<string, string>;
    getCurrentBonusAmount(state: GameState): number;
    getCurrentBonusEffect(state: GameState, effectId: string): number;
}
