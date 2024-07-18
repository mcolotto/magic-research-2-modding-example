import { GameState } from "../GameState";
import { Resource } from "../Resources";
import { Action, DoActionArgs } from "../action/Action";
import { ActionArea, ActionSubcategory } from "../action/ActionAreas";
import { AutocastRule } from "../autocast/Autocast";
import { SpellAutocastCategory } from "../autocast/SpellAutocastCategory";
import { SpellElementType } from "./Elements";
export declare abstract class Spell extends Action {
    abstract getBaseManaCost(state: GameState): number;
    abstract doSpellAction(state: GameState, args: DoActionArgs): GameState;
    abstract getLevelRequirements(): Partial<Record<SpellElementType, number>>;
    abstract getElement(): SpellElementType | undefined;
    abstract getSpellName(): string;
    abstract getAutocastCategory(): SpellAutocastCategory;
    constructor();
    _tagArray: string[] | null;
    getTags(): string[];
    getExtraTags(): string[];
    _manaCostTags: (parentSpell?: Spell) => string[];
    getCost(state: GameState): {
        resources: Partial<Record<Resource, number>>;
        items: Record<string, number>;
    };
    getManaCost(state: GameState, parentSpell?: Spell): number;
    private getManaCostUncached;
    hasFixedManaCost(): boolean;
    getAreas(): Partial<Record<ActionArea, ActionSubcategory[]>>;
    getLastCastTime(state: GameState): number;
    isTransmutationSpell(): boolean;
    /**
     * Display name without cooldown or perma-cast
     */
    getBasicDisplayName(state: GameState): string;
    getDisplayName(state: GameState): string;
    hasActiveSpellcrafts(state: GameState): boolean;
    getBaseCooldown(): number;
    _cooldownTagArray: string[] | null;
    _actionParams: () => {
        action: Spell;
    };
    getCooldown(state: GameState): number;
    hasEverBeenVisible(state: GameState): boolean;
    isVisible(state: GameState): boolean;
    isEnabled(state: GameState, skipAffordabilityChecks?: boolean): boolean;
    protected shouldIgnoreCanCastSpell(): boolean;
    _isEnabledNoCache(state: GameState, skipAffordabilityChecks?: boolean): boolean;
    _cacheEnabled: {
        value: boolean;
        ticks: number;
    } | null;
    isPermaCastAllowed(): boolean;
    getPermaCastDelaySec(state: GameState): number;
    getPermaCastManaCostPerSec(state: GameState): number;
    getPermaCastAutocastPointsConsumptionPerSec(state: GameState): number;
    canCastSpellTags: () => string[];
    autocastPointsRequirementTags: () => string[];
    getAutocastPointsRequirement(state: GameState): number;
    getBaseAutocastPointsRequirement(): number;
    getExpFromUsage(state: GameState): Partial<Record<SpellElementType, number>>;
    getMainExp(state: GameState): {
        element: SpellElementType | undefined;
        expMin: number;
        expMax: number;
    };
    grantExpFromUsage(state: GameState): GameState;
    doActionPermaCast(state: GameState): GameState;
    doAction(args: DoActionArgs, state: GameState): GameState;
    isCastingRecommended(state: GameState): boolean;
    getEstimatedMinAutocastDelay(state: GameState, rule?: AutocastRule): number;
    protected isEmpowerable(): boolean;
    getEmpoweringLevelRequirements(): Partial<Record<SpellElementType, number>>;
    isEmpoweringPossible(state: GameState): boolean;
    isEmpowered(state: GameState): boolean;
    allowRegisteringTemporaryEffectsAsPermacast(): boolean;
    isIneffectiveInUniversal(): boolean;
}
