import { CombatStat } from "../exploration/CombatStats";
import { BattlerAction, BattlerStats } from "../exploration/enemies/Enemy";
import { GameState } from "../GameState";
export declare const FAMILIAR_LEVEL_CAP_BASE = 90;
export type FamiliarMoveData = {
    name: string;
    effect: string;
};
export declare abstract class FamiliarClass {
    abstract getId(): string;
    abstract getPicture(state: GameState): any;
    abstract getName(): string;
    abstract getBaseStats(): BattlerStats;
    abstract getPerLevelStatMultiplier(): BattlerStats;
    getNextAction(state: GameState, familiarId: string): BattlerAction;
    getNextActionForCompanion(state: GameState): BattlerAction;
    getStats(state: GameState, familiarId: string, onlyStat?: CombatStat): BattlerStats;
    getMaxHP(state: GameState, familiarId: string): number;
    getStatsForCompanion(state: GameState, onlyStat?: CombatStat): BattlerStats;
    getMoveList(state: GameState, familiarId: string): Record<string, FamiliarMoveData>;
    getLevel(state: GameState, familiarId: string): number;
    getMaxLevel(state: GameState, familiarId: string): number;
    getExpForNextLevel(state: GameState, familiarId: string): number;
    create(state: GameState): GameState;
}
