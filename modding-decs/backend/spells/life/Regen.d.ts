import { ActionEffect, DoActionArgs } from "../../action/Action";
import { SpellAutocastCategory } from "../../autocast/SpellAutocastCategory";
import { GameState } from "../../GameState";
import { CombatSpellBase } from "../CombatSpellBase";
import { SpellElement, SpellElementType } from "../Elements";
declare class Regen extends CombatSpellBase {
    getId(): string;
    getSpellName(): string;
    getElement(): SpellElementType;
    getAutocastCategory(): SpellAutocastCategory;
    getBaseManaCost(state: GameState): number;
    protected getBaseActionEffects(): Record<string, ActionEffect>;
    doSpellAction(state: GameState, args: DoActionArgs): GameState;
    canUseOutsideOfCombat(): boolean;
    getDisplayDescription(state: GameState): string;
    getDisplayEffect(state: GameState): string;
    getLevelRequirements(): Partial<Record<SpellElement, number>>;
    protected isEmpowerable(): boolean;
    getEmpoweringLevelRequirements(): Partial<Record<SpellElement, number>>;
}
export declare const regen: Regen;
export {};
