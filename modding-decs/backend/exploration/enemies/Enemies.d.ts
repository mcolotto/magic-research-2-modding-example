import { GameState } from "../../GameState";
import { DataStore } from "../../generic/DataStore";
import { Enemy } from "./Enemy";
declare const Enemies: DataStore<Enemy>;
export { Enemies };
export declare function getCurrentEnemy(state: GameState): Enemy;
