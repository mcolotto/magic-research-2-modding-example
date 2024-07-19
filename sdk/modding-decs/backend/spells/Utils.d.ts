import { AttackTarget } from "../exploration/AttackTarget";
import { GameState } from "../GameState";
import { Spell } from "./Spell";
export declare function getStandardRangeEffectText(average: number, variance: number, explanation?: string): string;
export declare function getStandardAttackEffectText(average: number, variance: number, explanation?: string): string;
export declare function getStandardSpellAttackEffect(state: GameState, spell: Spell, extras?: object): GameState;
export declare function getStandardSpellAttackEffectText(state: GameState, spell: Spell): string;
export declare function isCastingRecommendedTemporaryEffect(state: GameState, effectName: string, target?: AttackTarget): boolean;
