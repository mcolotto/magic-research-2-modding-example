import { GameState, GameStateTransform } from "../GameState";
import { DataStore } from "../generic/DataStore";
import { AttackTarget } from "./AttackTarget";
import { CombatStat } from "./CombatStats";
import { CombatActionResult } from "./ExplorationActionResult";
import { DungeonFloor } from "./dungeons/DungeonFloor";
import { BattlerAction, Enemy } from "./enemies/Enemy";
export declare function isExplorationUnlocked(state: GameState): boolean;
export declare function isExplorationEverUnlocked(state: GameState): boolean;
export declare function startExplorationOnFloor(state: GameState, dungeonFloor: DungeonFloor): GameState;
export declare function startExploration(state: GameState): GameState;
export declare function startBossExploration(state: GameState): GameState;
export declare function getExplorationStartTime(state: GameState): number;
export declare function getCurrentDungeonFloor(state: GameState): DungeonFloor;
export declare function getPlayerActionProgress(state: GameState): number;
export declare function getEnemyActionProgress(state: GameState): number;
export declare function getFamiliarActionProgress(state: GameState): number;
export declare function startCombat(this: any, enemy: Enemy): GameStateTransform;
export declare function getCurrentPlayerHP(state: GameState): number;
export declare function getCurrentFamiliarHP(state: GameState): number;
export declare function getCurrentEnemyHP(state: GameState): number;
export declare function getCurrentPlayerHPFraction(state: GameState): number;
export declare function getCurrentFamiliarHPFraction(state: GameState): number;
export declare function getCurrentEnemyHPFraction(state: GameState): number;
export declare function calculateDamage(attack: number, defense: number): number;
export declare function calculateIsHit(accuracyPoints: number, dodgePoints: number): boolean;
export declare function modifyTargetCurrentHP(state: GameState, target: AttackTarget, amount: number, cause: string | null): GameState;
export declare function modifyPlayerCurrentHP(state: GameState, amount: number, cause?: string | null): GameState;
export declare function modifyCompanionCurrentHP(state: GameState, amount: number, cause: string | null | undefined): GameState;
export declare function modifyEnemyCurrentHP(state: GameState, amount: number, cause: string | null | undefined): GameState;
export declare function clearDamageTally(state: GameState): GameState;
export declare function executePlayerAutoAttack(state: GameState): GameState;
export declare function executeFamiliarAction(state: GameState): GameState;
export declare function executeEnemyAction(state: GameState): GameState;
export declare function getCurrentHPFromTarget(state: GameState, target: AttackTarget): number;
export declare function getStatFromTarget(state: GameState, target: AttackTarget, stat: CombatStat): number;
export declare function calculateAttackTarget(state: GameState): AttackTarget;
export declare function calculateIsEnemyHit(state: GameState, modifiedAccuracyPoints: number, forcedTarget?: AttackTarget): boolean;
export declare function standardEnemyAttackEffect(state: GameState, attack: number, options?: {
    accuracyMultiplier?: number;
    accuracyAddition?: number;
    critChanceMultiplier?: number;
    forcedTarget?: AttackTarget;
    tags?: string[];
    cause?: string;
    onHit?: (state: GameState, actionResult: CombatActionResult) => GameState;
}): GameState;
export declare function aoeEnemyAttackEffect(state: GameState, attack: number, options?: {
    accuracyMultiplier?: number;
    accuracyAddition?: number;
    critChanceMultiplier?: number;
    cause?: string;
    tags?: string[];
    onHit?: (state: GameState, actionResult: CombatActionResult) => GameState;
}): GameState;
export declare function fractionEnemyAttackEffect(state: GameState, fraction: number, options?: {
    accuracyMultiplier?: number;
    forcedTarget?: AttackTarget;
    cause?: string;
    tags?: string[];
}): GameState;
export declare function fractionAoEEnemyAttackEffect(state: GameState, attack: number, options?: {
    accuracyMultiplier?: number;
    critChanceMultiplier?: number;
    cause?: string;
    tags?: string[];
}): GameState;
export declare function pierceDefenseAoEEnemyAttackEffect(state: GameState, fraction: number, options?: {
    accuracyMultiplier?: number;
    critChanceMultiplier?: number;
    cause?: string;
    tags?: string[];
}): GameState;
export declare function pierceDefenseEnemyAttackEffect(state: GameState, attack: number, options?: {
    accuracyMultiplier?: number;
    critChanceMultiplier?: number;
    forcedTarget?: AttackTarget;
    cause?: string;
    tags?: string[];
}): GameState;
export declare function drainingEnemyAttackEffect(state: GameState, attack: number, options?: {
    accuracyMultiplier?: number;
    critChanceMultiplier?: number;
    forcedTarget?: AttackTarget;
    cause?: string;
    tags?: string[];
}): GameState;
export declare function dispelAllEnemyAttackEffect(state: GameState, includeBeneficial?: boolean): GameState;
export declare function standardFamiliarAttackEffect(state: GameState, attack: number, options?: {
    accuracyMultiplier?: number;
    critChanceMultiplier?: number;
    forcedTarget?: AttackTarget;
    cause?: string;
    tags?: string[];
    onHit?: (state: GameState, actionResult: CombatActionResult) => GameState;
}): GameState;
export declare function drainingSummonAttackEffect(state: GameState, attack: number, options?: {
    accuracyMultiplier?: number;
    critChanceMultiplier?: number;
    forcedTarget?: AttackTarget;
    cause?: string;
    tags?: string[];
}): GameState;
export declare function standardPlayerAttackEffect(state: GameState, attack: number, options?: {
    accuracyMultiplier?: number;
    overrideAccuracy?: number;
    critChanceMultiplier?: number;
    critChanceAddition?: number;
    targetDefenseMultiplier?: number;
    overrideCritChance?: number;
    forcedTarget?: AttackTarget;
    cause?: string;
    tags: string[];
}): GameState;
export declare function getCurrentEnemyAction(state: GameState): BattlerAction;
export declare function getCurrentFamiliarAction(state: GameState): BattlerAction;
export declare function getMessageLog(state: GameState): import("../GameState").MessageLog[];
export declare function getCumulativeLossesGlobal(state: GameState, enemyId: string): number;
export declare function getCumulativeLossesWorld(state: GameState, enemyId: string): number;
export declare function incrementCumulativeLosses(state: GameState, enemyId: string): GameState;
export declare function getSuccessfulExplorationsForFloor(state: GameState, dungeonFloorId: string): number;
export declare function pushToMessageLog(state: GameState, log: string): GameState;
export declare function endExploration(state: GameState): GameState;
export declare function pauseExploration(state: GameState): GameState;
export declare function resumeExploration(state: GameState): GameState;
export declare function getExplorationTimeRequirementSec(state: GameState): number;
export declare function getFamiliarAttackDelay(state: GameState): number | undefined;
export declare function getEnemyAttackDelay(state: GameState): number;
export declare function resetEnemyNextAction(): void;
export declare function resetFamiliarNextAction(): void;
export declare function getEnemyTurnCounter(state: GameState): number;
export type EnemyDeathListener = (state: GameState, enemy: Enemy) => GameState;
export declare const EnemyDeathListeners: DataStore<EnemyDeathListener>;
export declare function addEnemyDeathListener(id: string, listener: EnemyDeathListener): void;
export declare function triggerEnemyDeathListeners(state: GameState, enemy: Enemy): GameState;
export declare function triggerCombatLoss(state: GameState): GameState;
export declare function loadExploration(): void;
