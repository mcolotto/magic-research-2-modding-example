import { GameState } from "../GameState";
import { DataStore } from "../generic/DataStore";
import { AttackTarget } from "./AttackTarget";
export type CombatActionResult = {
    id: string;
    damage: number;
    isHit: boolean;
    isCrit: boolean;
    time: number;
    source: AttackTarget;
    target: AttackTarget;
    tags: string[];
};
export type CombatActionResultListener = (state: GameState, result: CombatActionResult) => GameState;
declare const CombatActionResultListeners: DataStore<CombatActionResultListener>;
export { CombatActionResultListeners };
export declare function pushCombatActionResult(state: GameState, combatActionResult: CombatActionResult): GameState;
