import { GameState } from "../../../GameState";
import { BattlerAction, BattlerStats, Enemy, EnemyLoot } from "../Enemy";
declare class PsionCobra extends Enemy {
    getId(): string;
    getName(): string;
    getBaseStats(): BattlerStats;
    getPicture(state: GameState): any;
    getLevel(): number;
    getCoinsAwardedBase(state: GameState): number;
    getMonstiumAwardedBase(state: GameState): number;
    getNextAction(state: GameState): BattlerAction;
    getItemsAwardedBase(state: GameState): EnemyLoot[];
}
declare const _default: PsionCobra;
export default _default;
