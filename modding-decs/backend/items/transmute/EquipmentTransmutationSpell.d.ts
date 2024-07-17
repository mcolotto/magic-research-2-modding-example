import { GameState } from "../../GameState";
import { EquippableItem } from "../equipment/EquippableItem";
import { TransmutationSpell } from "./TransmutationSpell";
export declare abstract class EquipmentTransmutationSpell extends TransmutationSpell {
    abstract getItem(): EquippableItem;
    isVisible(state: GameState): boolean;
    timesCraftable(state: GameState): number;
    simplifyCrafting(): boolean;
}
