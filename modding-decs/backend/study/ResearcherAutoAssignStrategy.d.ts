import { GameState, ResearcherAutoAssignStrategy } from "../GameState";
import { SpellElementType } from "../spells/Elements";
export declare function translateResearcherAutoAssignStrategy(strategy: ResearcherAutoAssignStrategy): string;
export declare function decideOnAutoAssigning(state: GameState): SpellElementType | undefined;
