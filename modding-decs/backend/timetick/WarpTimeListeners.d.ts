import { GameStateTransform } from "../GameState";
import { DataStore } from "../generic/DataStore";
import { Identifiable } from "../generic/Identifiable";
export type WarpTimeTransform = (secsPassed: number) => GameStateTransform | null | undefined | void;
export declare class WarpTimeListener implements Identifiable {
    id: string;
    listener: WarpTimeTransform;
    constructor(id: string, listener: WarpTimeTransform);
    getId(): string;
    getListener(): WarpTimeTransform;
}
declare const WarpTimeListeners: DataStore<WarpTimeListener>;
export { WarpTimeListeners };
