import { GameState } from "../GameState";
import { Storyline } from "../storylines/Storyline";
import { EventMessage, EventMessageOption, EventTag, EventTransform, GameEvent } from "./GameEvent";
export declare const STUB_OPTION: EventMessageOptionStub;
type EventMessageOptionWithVisibility = {
    option: Omit<EventMessageOption, "isEnabled">;
    isVisible?: (state: GameState, params?: any) => boolean;
    isEnabled?: (state: GameState, params?: any) => boolean;
};
export declare class EventMessageImpl implements EventMessage {
    private id;
    private title;
    private description;
    private options;
    constructor(id: string, title: string, description: (state: GameState) => string, options: EventMessageOptionWithVisibility[]);
    getId(): string;
    getTitle(params: any): string;
    getDescription(state: GameState, params: any): string;
    getAllowedOptions(state: GameState, params: any): EventMessageOption[];
    isTerminal(): boolean;
    isActionable(state: GameState, params: any): boolean;
}
type EventMessageOptionStub = {
    description?: string;
    nextMessageId?: string;
    transform?: (state: GameState, params: any) => GameState;
    isVisible?: (state: GameState, params: any) => boolean;
    isEnabled?: (state: GameState, params: any) => boolean;
};
export declare class EventMessageBuilderDeluxe {
    id: string;
    description: (state: GameState) => string;
    options: EventMessageOptionStub[];
    isEnd: boolean;
    built: boolean;
    constructor(id: string);
    tag(id: string): this;
    setDescription(description: (state: GameState) => string): this;
    setSimpleDescription(description: string): this;
    option(description: string, paramsOrNextMessageId?: {
        transform?: (state: GameState, params: any) => GameState;
        isVisible?: (state: GameState, params: any) => boolean;
        isEnabled?: (state: GameState, params: any) => boolean;
    } | string, nextMessageId?: string): this;
    getOptions(): EventMessageOptionStub[];
    end(): void;
}
export declare class SimpleGameEvent implements GameEvent {
    private id;
    private message;
    private tags;
    private onTriggerTransform?;
    private storylineIds?;
    triggerString: string;
    constructor(id: string, message: EventMessage, tags: EventTag[], onTriggerTransform?: EventTransform, storylineIds?: string[]);
    onTrigger(): EventTransform;
    hasTriggered(state: GameState): boolean;
    hasEverTriggered(state: GameState): boolean;
    getId(): string;
    getMainEventMessage(): EventMessage;
    getTags(): EventTag[];
    getStorylines(): Storyline[];
}
export declare class EventBuilder {
    private id;
    private title;
    private tags;
    constructor(id: string, title: string, tags: EventTag[]);
    messages: EventMessageBuilderDeluxe[];
    private lastMessageId;
    private onTrigger?;
    private storylineIds?;
    message(description: string, tag?: string): EventMessageBuilderDeluxe;
    newMessageId(): string;
    setOnTrigger(onTrigger: EventTransform): this;
    setStorylineIds(storylineIds: string | string[]): this;
    build(): GameEvent;
    private findMessageIndexWithId;
    private buildRecursive;
}
export declare function buildEvent(id: string, title: string, tags: EventTag[]): EventBuilder;
export {};
