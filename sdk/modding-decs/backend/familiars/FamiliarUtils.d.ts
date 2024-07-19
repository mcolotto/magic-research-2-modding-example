import { GameState } from "../GameState";
import { FamiliarData } from "./Familiar";
import { FamiliarClass } from "./FamiliarClass";
export declare function getCurrentCompanionId(state: GameState): string;
export declare function getCurrentCompanionData(state: GameState): FamiliarData | undefined;
export declare function getCurrentCompanionClass(state: GameState): FamiliarClass | undefined;
