import { GameState } from "../GameState";
import { AttackTarget } from "./AttackTarget";
export declare enum CombatStat {
    MaxHP = "MaxHP",
    Attack = "Attack",
    AttackDelay = "AttackDelay",
    Defense = "Defense",
    HPRegen = "HPRegen",
    Dodge = "Dodge",
    Accuracy = "Accuracy",
    Crit = "Crit"
}
export declare function calculatePlayerMaxHP(state: GameState): number;
export declare function calculatePlayerAttack(state: GameState): number;
export declare function calculatePlayerAttackDelaySec(state: GameState): number;
export declare function calculatePlayerDefense(state: GameState): number;
export declare function calculatePlayerHPRegenRatioPerSec(state: GameState): number;
export declare function calculatePlayerDodgePoints(state: GameState): number;
export declare function calculatePlayerAccuracyPoints(state: GameState): number;
export declare function calculatePlayerCritPoints(state: GameState): number;
export declare function calculatePlayerCombatStat(state: GameState, stat: CombatStat): number;
export declare function getCachedCombatStat(state: GameState, target: AttackTarget, stat: CombatStat, fn: (state: GameState) => number, familiarId?: string, level?: number): number;
export declare function clearCombatStatCache(state: GameState, target?: AttackTarget, stat?: CombatStat): GameState;
export declare function explainPlayerCombatStat(state: GameState, stat: CombatStat, explainParams?: Record<string, any>): string;
