import { GameState } from "../../GameState";
import { SpellElement, SpellElementType } from "../Elements";
import { BasicChannelingSpellBase } from "./BasicChannelingSpellBase";
declare class ChannelWater extends BasicChannelingSpellBase {
    getId(): string;
    getSpellName(): string;
    getElement(): SpellElementType;
    getDisplayDescription(state: GameState): string;
    getLevelRequirements(): Partial<Record<SpellElement, number>>;
}
declare const _default: ChannelWater;
export default _default;
