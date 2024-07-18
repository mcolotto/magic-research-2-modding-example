import { GameState } from "../GameState";
import { Identifiable } from "../generic/Identifiable";
import { Storyline } from "../storylines/Storyline";
export declare abstract class Challenge implements Identifiable {
    abstract getName(): string;
    abstract getDescription(state: GameState): string;
    abstract getEffect(state: GameState): string;
    abstract getObjective(state: GameState): string;
    abstract getReward(state: GameState): string;
    abstract isVisible(state: GameState): boolean;
    constructor();
    getId(): string;
    complete(state: GameState): GameState;
    inactivate(state: GameState): GameState;
    isInactivated(state: GameState): boolean;
    isCompleted(state: GameState): boolean;
    isCompletedForNextRun(state: GameState): boolean;
}
export declare function createStorylineFromChallenge(challenge: Challenge, order: number): Storyline;
