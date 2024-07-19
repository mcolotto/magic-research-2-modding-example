import { MR2Globals } from "magic-research-2-modding-sdk";
import {
  ActionEffect,
  DoActionArgs,
} from "magic-research-2-modding-sdk/modding-decs/backend/action/Action";
import { SpellAutocastCategory } from "magic-research-2-modding-sdk/modding-decs/backend/autocast/SpellAutocastCategory";
import { GameState } from "magic-research-2-modding-sdk/modding-decs/backend/GameState";
import { SpellElement } from "magic-research-2-modding-sdk/modding-decs/backend/spells/Elements";

export function loadSpellTestMod(MR2: MR2Globals) {
  class OverpoweredChanneling extends MR2.Spell {
    getId(): string {
      return "overpoweredChanneling";
    }

    getSpellName(): string {
      return "Overpowered Channeling";
    }

    getAutocastCategory(): SpellAutocastCategory {
      return MR2.SpellAutocastCategory.OTHER;
    }

    getElement(): SpellElement | undefined {
      return MR2.SpellElement.Earth;
    }

    getDisplayDescription(state: GameState): string {
      return "Channel Earth, but get a lot of Essence.";
    }

    getDisplayEffect(state: GameState): string {
      const effects = this.getActionEffects(state);
      const explanations = this.getActionEffectExplanations(state);
      return `^+${MR2.formatNumber(effects.magnitude)}^<${
        explanations.magnitude
      }>:earthessence:`;
    }

    getBaseCooldown(): number {
      return 5.0;
    }

    getBaseManaCost(state: GameState): number {
      return 30;
    }

    doSpellAction(state: GameState, args: DoActionArgs): GameState {
      const effects = this.getActionEffects(state);
      return MR2.grantResource(
        MR2.Resource.EarthEssence,
        effects.magnitude,
      )(state);
    }

    getLevelRequirements(): Partial<Record<SpellElement, number>> {
      return {
        Earth: 1,
      };
    }

    protected getBaseActionEffects(): Record<string, ActionEffect> {
      return {
        magnitude: {
          value: 1000000,
          unit: ":earthessence:",
          tags: [MR2.TransformationTags.ActionMagnitude],
        },
      };
    }

    getBaseAutocastPointsRequirement(): number {
      return 30;
    }

    getEmpoweringLevelRequirements(): Partial<Record<SpellElement, number>> {
      return { Earth: 55 };
    }

    protected isEmpowerable(): boolean {
      return true;
    }

    isEnabled(state: GameState, skipAffordabilityChecks?: boolean): boolean {
      return (
        MR2.getResourceAmount(state, MR2.Resource.EarthEssence) <
        MR2.getResourceCap(state, MR2.Resource.EarthEssence)
      );
    }
  }

  const overpoweredChanneling = new OverpoweredChanneling();

  MR2.registerStandardEmpowerEffects(overpoweredChanneling, 4, 10);

  MR2.registerSpell(overpoweredChanneling);

  class OverpoweredStrike extends MR2.CombatSpellBase {
    getId(): string {
      return "overpoweredStrike";
    }

    getSpellName(): string {
      return "Overpowered Strike";
    }

    getElement(): SpellElement {
      return MR2.SpellElement.Fire;
    }

    getAutocastCategory(): SpellAutocastCategory {
      return MR2.SpellAutocastCategory.ATTACK;
    }

    getExtraTags(): string[] {
      return [MR2.TransformationTags.AttackSpell];
    }

    getBaseManaCost(state: GameState): number {
      return 250;
    }

    getDisplayDescription(state: GameState): string {
      return "An overpowered Fire spell.";
    }

    protected getBaseActionEffects(): Record<string, ActionEffect> {
      return {
        average: {
          value: 1000,
          tags: [MR2.TransformationTags.ActionMagnitude],
          unit: ":attack:",
        },
        variance: {
          value: 100,
          tags: [MR2.TransformationTags.ActionVariance],
          unit: ":attack:",
        },
      };
    }

    getDisplayEffect(state: GameState): string {
      return MR2.getStandardSpellAttackEffectText(state, this);
    }

    doSpellAction(state: GameState): GameState {
      return MR2.getStandardSpellAttackEffect(state, this);
    }

    getBaseCooldown(): number {
      return 3.0;
    }

    getBaseAutocastPointsRequirement(): number {
      return 10;
    }

    getLevelRequirements(): Partial<Record<SpellElement, number>> {
      return {
        Fire: 3,
      };
    }

    protected isEmpowerable(): boolean {
      return true;
    }

    getEmpoweringLevelRequirements(): Partial<Record<SpellElement, number>> {
      return { Fire: 55 };
    }
  }

  const overpoweredStrike = new OverpoweredStrike();

  MR2.registerStandardEmpowerEffects(overpoweredStrike, 7, 20);

  MR2.registerSpell(overpoweredStrike);
}
