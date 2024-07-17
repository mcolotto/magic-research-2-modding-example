import { ActionEffect } from "../action/Action";
import { GameState } from "../GameState";
import { Item } from "../items/Item";
import { SpellElement } from "../spells/Elements";
import { Spell } from "../spells/Spell";
import { TransformationValueType } from "../transformation/TransformationTags";
export declare function generateSpellcraftMultiplier(baseValue: number, transformedValue: number): number;
export declare function getSpellcraftCostAmount(state: GameState): number;
export declare function clearSpellcraftCostCache(state: GameState): GameState;
export declare abstract class Spellcraft {
    getId(): string;
    abstract getBaseItem(): Item;
    getName(): string;
    getPicture(): any;
    getTags(): string[];
    tagsByEffect: Record<string, string[]>;
    getTagsByEffect(key: string, baseEffect: ActionEffect): string[];
    protected getBaseWizardPowerMultiplier(): number;
    protected getBasePowerMultiplier(): number;
    protected getBaseCooldownMultiplier(): number;
    protected getBaseTemporaryEffectDurationMultiplier(): number;
    protected getBaseManaCostMultiplier(): number;
    getBaseMultipliers(): Record<string, number>;
    requiresSpellsWithParameterizedEffects(): boolean;
    requiresSpellsWithCooldown(): boolean;
    requiresSpellsWithTemporaryEffect(): boolean;
    requiresSpellsWithFixedManaCost(): boolean;
    isSpellCompatible(spell: Spell): boolean;
    canAfford(state: GameState): boolean;
    getCachedBaseBonusEffects: () => Record<string, ActionEffect>;
    getEffect(state: GameState): string;
    getBonusEffect(state: GameState, effectId: string): number;
    getBonusEffects(state: GameState, amount?: number): Record<string, number>;
    bonusEffectExplanationParams: (baseEffect: ActionEffect) => {
        valueType: TransformationValueType;
        unit: string;
    };
    getBonusEffectExplanations(state: GameState, onlyId?: string): Record<string, string>;
}
export declare abstract class PrismBasedSpellcraft extends Spellcraft {
    protected abstract getElement(): SpellElement;
    getBaseItem(): Item;
    protected getBaseWizardPowerMultiplier(): number;
}
export declare abstract class JewelBasedSpellcraft extends Spellcraft {
    protected abstract getElement(): SpellElement;
    getBaseItem(): Item;
    protected getBaseWizardPowerMultiplier(): number;
}
