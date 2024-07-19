import { GameState } from "../../../GameState";
import { BattlerAction, BattlerStats, Enemy, EnemyLoot } from "../Enemy";
declare class Mindbender extends Enemy {
    getId(): string;
    getName(): string;
    getBaseStats(): BattlerStats;
    getPicture(state: GameState): any;
    getLevel(): number;
    getCoinsAwardedBase(state: GameState): number;
    getMonstiumAwardedBase(state: GameState): number;
    getNextActionFireSpirit(state: GameState): BattlerAction;
    getNextAction(state: GameState): BattlerAction;
    getItemsAwardedBase(state: GameState): EnemyLoot[];
    isBoss(): boolean;
    getBackdropColor(state: GameState): string;
    onDeath(state: GameState, isFromCreatures: boolean, familiarId?: string): GameState;
    getTips(): string;
}
export declare const mindbender: Mindbender;
export declare function loadMindbender(): void;
export {};