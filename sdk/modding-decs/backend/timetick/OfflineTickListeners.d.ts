import { GameStateTransform } from "../GameState";
import { DataStore } from "../generic/DataStore";
import { Identifiable } from "../generic/Identifiable";
export type OfflineTickTransform = (secsPassed: number) => GameStateTransform | null | undefined | void;
export declare class OfflineTickListener implements Identifiable {
    id: string;
    listener: OfflineTickTransform;
    constructor(id: string, listener: OfflineTickTransform);
    getId(): string;
    getListener(): OfflineTickTransform;
}
declare const OfflineTickListeners: DataStore<OfflineTickListener>;
export { OfflineTickListeners };
