import { FamiliarClass } from "../../../familiars/FamiliarClass";
import { GameState } from "../../../GameState";
import { ItemParams } from "../../Item";
import { FamiliarItem, FamiliarTransmutationSpell } from "../FamiliarItem";
export declare abstract class FamiliarEvolutionItem extends FamiliarItem {
    abstract getFamiliarToEvolveTo(): FamiliarClass;
    doFamiliarItemEffect(state: GameState, params: ItemParams, familiarId: string): GameState;
    shouldConfirm(): boolean;
}
export declare abstract class FamiliarEvolutionTransmutationSpell extends FamiliarTransmutationSpell {
    abstract getItem(): FamiliarEvolutionItem;
}
