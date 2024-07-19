import { GameState } from "../GameState";
import { CombatActionResult } from "./ExplorationActionResult";
import { ExplorationStatus } from "./ExplorationStatus";
export declare function getLastQueuedActionResult(state: GameState): CombatActionResult | undefined;
export declare function getExplorationStatus(state: GameState): ExplorationStatus;
