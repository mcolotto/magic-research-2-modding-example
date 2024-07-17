import { AttackTarget } from "../../../exploration/AttackTarget";
import { GameState } from "../../../GameState";
import { TemporaryEffect } from "../../../temporaryeffects/TemporaryEffect";
import { ItemParams } from "../../Item";
import { PouchItem } from "../PouchItem";
export declare abstract class BuffingPouchItem extends PouchItem {
    abstract getTemporaryEffect(): TemporaryEffect;
    getId(): string;
    getPicture(): any;
    getBaseName(params: ItemParams): string;
    getTarget(): AttackTarget;
    doPouchItemEffect(state: GameState, params: ItemParams): GameState;
    doCleanup(state: GameState, params: ItemParams): GameState;
    shouldAutoUse(state: GameState, params: ItemParams): boolean;
    isIneffectiveInUniversal(): boolean;
    shouldCombineUnderAutoCombineAll(): boolean;
}
