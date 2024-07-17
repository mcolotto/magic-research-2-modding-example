import { GameState } from "../GameState";
import { Storyline } from "../storylines/Storyline";
export declare enum EventTag {
    MAIN_QUEST = "MAIN_QUEST",
    INCONSEQUENTIAL_RANDOM_EVENT = "INCONSEQUENTIAL_RANDOM_EVENT",
    LEVEL_UP = "LEVEL_UP",
    LEVEL_UP_EMPTY = "LEVEL_UP_EMPTY",
    LEVEL_UP_ALREADY_REACHED = "LEVEL_UP_ALREADY_REACHED",
    MAIN_QUEST_SEEN_BEFORE = "MAIN_QUEST_SEEN_BEFORE",
    STORYLINE = "STORYLINE",
    DO_NOT_AUTO_TRIGGER_IF_ONGOING = "DO_NOT_AUTO_TRIGGER_IF_ONGOING",
    DO_NOT_POPUP = "DO_NOT_POPUP",
    DO_NOT_POPUP_IF_BOSS_FIGHT = "DO_NOT_POPUP_IF_BOSS_FIGHT"
}
export type EventTransform = (state: GameState, params: any) => GameState;
export interface EventMessageOption {
    description: string;
    isEnabled: boolean;
    transform?: (state: GameState, params: any) => GameState;
    nextMessage?: EventMessage;
}
export interface EventMessage {
    getId(): string;
    getTitle(params: any): string;
    getDescription(state: GameState, params: any): string;
    getAllowedOptions(state: GameState, params: any): EventMessageOption[];
    isTerminal(): boolean;
    isActionable(state: GameState, params: any): boolean;
}
export interface GameEvent {
    getId(): string;
    getMainEventMessage(): EventMessage;
    onTrigger(): EventTransform;
    hasTriggered(state: GameState): boolean;
    hasEverTriggered(state: GameState): boolean;
    getTags(): EventTag[];
    getStorylines(): Storyline[];
}
