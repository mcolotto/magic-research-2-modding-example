import { GameState, GameStateTransform } from "./GameState";
import { DataStore } from "./generic/DataStore";
export declare function loadData(): Promise<GameState>;
export declare function saveData(state: GameState): Promise<void>;
export declare function saveDataUnsafe(state: GameState): Promise<void>;
export declare function makeCompatible(obj: GameState): GameState;
export declare function loadBase64Data(saveData: string): Promise<GameState | null>;
export declare function deserializeBase64Data(saveData: string): Promise<Object | null>;
export declare function serializeSaveData(state: GameState): Promise<string>;
/**
 * SaveDataCompatibilityTransforms are executed when save data is loaded
 * from the disk or imported.
 * They should be used in the case of mod updates,
 * where for example old content may be removed which would render
 * save games erroneous.
 * If new fields are added to GameState and they need to be initialized,
 * it's suggested to take care of that in a SaveDataCompatibilityTransform
 * (suggest using deepmerge).
 */
export declare const SaveDataCompatibilityTransforms: DataStore<GameStateTransform>;
