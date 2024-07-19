import { GameState } from "../GameState";
import { DataStore } from "../generic/DataStore";
import { Enhancement } from "./Enhancement";
export declare const EnhancementPurchaseListeners: DataStore<(state: GameState, enhancement: Enhancement) => GameState>;
