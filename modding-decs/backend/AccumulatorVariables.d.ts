import { GameState } from "./GameState";
export declare function incrementAccumulatorVariable(state: GameState, variableName: string, amount?: number): GameState;
export declare function getAccumulatorVariable(state: GameState, variableName: string): number;
export declare function getWorldAccumulatorVariable(state: GameState, variableName: string): number;
