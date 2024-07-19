import { GameState } from "../GameState";
import { DataStore } from "../generic/DataStore";
import { Spell } from "./Spell";
export type SpellCastListener = (state: GameState, spell: Spell) => GameState;
declare const SpellCastListeners: DataStore<SpellCastListener>;
export { SpellCastListeners };
