import { GameState } from "../../GameState";
import { SpellElement, SpellElementType } from "../Elements";
import { BasicChannelingSpellBase } from "./BasicChannelingSpellBase";
declare class ChannelTime extends BasicChannelingSpellBase {
    getId(): string;
    getSpellName(): string;
    getElement(): SpellElementType;
    getBaseEssenceEfficiency(): number;
    getManaCostProportion(): number;
    getDisplayDescription(state: GameState): string;
    getLevelRequirements(): Partial<Record<SpellElement, number>>;
}
declare const _default: ChannelTime;
export default _default;
