import { GameState } from "../GameState";
import { DataStore } from "../generic/DataStore";
import { AttackTarget } from "./AttackTarget";
/**
 * PlayerDeathInterceptors return true if player death is to be prevented.
 * Use in conjunction with some ContextListener that does some action.
 */
export type DeathInterceptor = (state: GameState, target: AttackTarget) => boolean;
declare const DeathInterceptors: DataStore<DeathInterceptor>;
export { DeathInterceptors };
