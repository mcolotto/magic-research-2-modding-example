import { ActionEffect, DoActionArgs } from "../../action/Action";
import { SpellAutocastCategory } from "../../autocast/SpellAutocastCategory";
import { CombatStat } from "../../exploration/CombatStats";
import { GameState } from "../../GameState";
import { TemporaryEffect } from "../../temporaryeffects/TemporaryEffect";
import { TemporaryEffectData } from "../../temporaryeffects/TemporaryEffects";
import { TransformationType } from "../../transformation/Transformation";
import { CombatSpellBase } from "../CombatSpellBase";
import { SpellElement, SpellElementType } from "../Elements";
declare class BlurTemporaryEffect extends TemporaryEffect {
    getId(): string;
    getDisplayName(): string;
    getIcon(): any;
    isCommonBuffEnabled(): {
        stat: CombatStat;
        type: TransformationType;
    }[];
    getDisplayDescription(state: GameState, temporaryEffectData: TemporaryEffectData): string;
}
export declare const blurTemporaryEffect: BlurTemporaryEffect;
declare class Blur extends CombatSpellBase {
    getId(): string;
    getSpellName(): string;
    getElement(): SpellElementType;
    getAutocastCategory(): SpellAutocastCategory;
    getBaseManaCost(state: GameState): number;
    canUseOutsideOfCombat(): boolean;
    protected getBaseActionEffects(): Record<string, ActionEffect>;
    doSpellAction(state: GameState, args: DoActionArgs): GameState;
    getDisplayDescription(state: GameState): string;
    getDisplayEffect(state: GameState): string;
    getLevelRequirements(): Partial<Record<SpellElement, number>>;
}
export declare const blur: Blur;
export {};
