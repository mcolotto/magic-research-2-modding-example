import { ActionEffect } from "../action/Action";
import { GameState } from "../GameState";
import { SpellElement } from "../spells/Elements";
import { TransformationTag } from "../transformation/Transformation";
import { TransformationTags, TransformationValueType } from "../transformation/TransformationTags";
export declare abstract class Ritual {
    constructor();
    abstract getId(): string;
    abstract getBaseName(): string;
    abstract getDescription(state: GameState): string;
    abstract getEffect(state: GameState): string;
    abstract getBaseCorruptionCost(): number;
    getDisplayName(state: GameState): string;
    protected getBaseRitualEffects(): Record<string, ActionEffect>;
    _costTags: TransformationTags[];
    getCorruptionCost(state: GameState): number;
    getLevelRequirements(): Partial<Record<SpellElement, number>>;
    abstract getDeathLevelRequirement(): number;
    isVisible(state: GameState): boolean;
    turnOn(state: GameState): GameState;
    turnOff(state: GameState): GameState;
    isActive(state: GameState): boolean;
    getTags(): TransformationTag[];
    getCachedBaseRitualEffects: () => Record<string, ActionEffect>;
    tagsByEffect: Record<string, string[]>;
    getTagsByEffect(key: string, baseEffect: ActionEffect): string[];
    ritualEffectParams: () => {
        ritual: Ritual;
    };
    getRitualEffects(state: GameState, onlyId?: string): Record<string, number>;
    ritualEffectExplanationParams: (baseEffect: ActionEffect) => {
        ritual: Ritual;
        unit: string | undefined;
        valueType: TransformationValueType | undefined;
    };
    getRitualEffectExplanations(state: GameState, onlyId?: string): Record<string, string>;
}
