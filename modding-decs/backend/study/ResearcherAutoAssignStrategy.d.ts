import { GameState, ResearcherAutoAssignStrategy } from "../GameState";
import { SpellElement } from "../spells/Elements";
export declare function translateResearcherAutoAssignStrategy(strategy: ResearcherAutoAssignStrategy): string;
export declare function decideOnAutoAssigning(state: GameState): SpellElement | undefined;
