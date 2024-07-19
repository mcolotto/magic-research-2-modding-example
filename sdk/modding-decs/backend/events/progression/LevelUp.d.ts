import { GameState } from "../../GameState";
import { DataStore } from "../../generic/DataStore";
import { TransmutationSpell } from "../../items/transmute/TransmutationSpell";
import { SpellElementType } from "../../spells/Elements";
import { Spell } from "../../spells/Spell";
export declare function getConcatenatedRequirements(spell: Spell): string;
export declare function getMarkdownTextForSpell(spell: Spell): string;
export declare function getMarkdownTextForSpellEmpowerment(spell: Spell): string;
export declare function getMarkdownTextForTransmutationSpell(state: GameState, spell: TransmutationSpell): string;
export declare const LevelUpListeners: DataStore<(state: GameState, element: SpellElementType, oldExp: number) => GameState>;
export declare function loadLevelUpEvents(): void;