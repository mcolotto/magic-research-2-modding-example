import { GameState } from "../GameState";
import { DataStore } from "../generic/DataStore";
import { Challenge } from "./Challenge";
declare const Challenges: DataStore<Challenge>;
export { Challenges };
export declare function getCurrentChallenge(state: GameState): Challenge | undefined;
export declare function getVisibleChallenges(state: GameState): Challenge[];
export declare function areChallengesUnlocked(state: GameState): boolean;
