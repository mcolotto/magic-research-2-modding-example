import { GameState } from "../GameState";
import { ActionEffect } from "../action/Action";
import { DataStore } from "../generic/DataStore";
import { Identifiable } from "../generic/Identifiable";
export declare abstract class CombatClass implements Identifiable {
    abstract getId(): string;
    abstract getDisplayName(): string;
    abstract getDisplayDescription(state: GameState): string;
    abstract getDisplayEffect(state: GameState): string;
    isActive(state: GameState): boolean;
    isVisible(state: GameState): boolean;
    protected getBaseClassEffects(): Record<string, ActionEffect>;
    getCachedBaseClassEffects: () => Record<string, ActionEffect>;
    tagsByEffect: Record<string, string[]>;
    getTagsByEffect(key: string, baseEffect: ActionEffect): string[];
    getClassEffects(state: GameState, onlyId?: string): Record<string, number>;
    getClassEffectExplanations(state: GameState, onlyId?: string): Record<string, string>;
}
export declare const CombatClasses: DataStore<CombatClass>;
export declare function isCombatClassSelectionUnlocked(state: GameState): boolean;
export declare function getCurrentCombatClass(state: GameState): CombatClass | undefined;
export declare function getSelectableCombatClasses(state: GameState): CombatClass[];
