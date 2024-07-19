import { GameState } from "../../../GameState";
import { BattlerAction, BattlerStats, Enemy, EnemyLoot } from "../Enemy";
declare class LifeGuardian extends Enemy {
    getId(): string;
    getName(): string;
    getBaseStats(): BattlerStats;
    getPicture(state: GameState): any;
    getBackdropColor(state: GameState): string;
    getLevel(): number;
    getCoinsAwardedBase(state: GameState): number;
    getMonstiumAwardedBase(state: GameState): number;
    getNextActionGaruda(state: GameState): BattlerAction;
    getNextActionTurtle(state: GameState): BattlerAction;
    getPhase(state: GameState): number;
    getNextAction(state: GameState): BattlerAction;
    getItemsAwardedBase(state: GameState): EnemyLoot[];
    isBoss(): boolean;
    onDeath(state: GameState, isFromCreatures: boolean, familiarId?: string): GameState;
    getTips(): string;
}
export declare const lifeGuardian: LifeGuardian;
export declare function loadLifeGuardian(): void;
export {};
