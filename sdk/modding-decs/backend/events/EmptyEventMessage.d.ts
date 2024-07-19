import { GameState } from "../GameState";
import { EventMessage, EventMessageOption } from "./GameEvent";
declare class EmptyEventMessageImpl implements EventMessage {
    constructor();
    getId(): string;
    getTitle(params: any): string;
    getDescription(state: GameState, params: any): string;
    getAllowedOptions(state: GameState, params: any): EventMessageOption[];
    isTerminal(): boolean;
    isActionable(state: GameState, params: any): boolean;
}
declare const EmptyEventMessage: EmptyEventMessageImpl;
export { EmptyEventMessage };
