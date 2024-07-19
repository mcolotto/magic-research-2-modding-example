import { GameState } from "./GameState";
export declare function getUICommands(state: GameState): string[];
export declare function clearUICommands(state: GameState): GameState;
export declare function addUICommand(state: GameState, command: string): GameState;
