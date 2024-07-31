import { MR2Globals } from "magic-research-2-modding-sdk";
import {
  ActionEffect,
  DoActionArgs,
} from "magic-research-2-modding-sdk/modding-decs/backend/action/Action";
import { SpellAutocastCategory } from "magic-research-2-modding-sdk/modding-decs/backend/autocast/SpellAutocastCategory";
import { GameState } from "magic-research-2-modding-sdk/modding-decs/backend/GameState";
import { SpellElement } from "magic-research-2-modding-sdk/modding-decs/backend/spells/Elements";

/**
 * This mod adds two new spells.
 */
export function loadSpellTestMod(MR2: MR2Globals) {
  // Define the spell...
  class OverpoweredChanneling extends MR2.Spell {
    getId(): string {
      return "overpoweredChanneling";
    }

    getSpellName(): string {
      return "Overpowered Channeling";
    }

    getAutocastCategory(): SpellAutocastCategory {
      // Where will it show in the Wizards screen?
      return MR2.SpellAutocastCategory.OTHER;
    }

    getElement(): SpellElement | undefined {
      return MR2.SpellElement.Earth;
    }

    getDisplayDescription(state: GameState): string {
      return "Channel Earth, but get a lot of Essence.";
    }

    getDisplayEffect(state: GameState): string {
      // Notice the implementation of this method.
      // This display effect will have a tooltip and will vary
      // depending on transformations that may affect tthe effects.
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

    // This is where the stuff actually happens
    doSpellAction(state: GameState, args: DoActionArgs): GameState {
      // Notice the use of getActionEffects here. This will make sure
      // transformations are applied.
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

    // This works equivalently to getBaseItemEffects in BuffingPouchItemTestMod.
    // You want to put all your spell effects in here if they're modifiable.
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

    // We want our spell to be empowerable
    getEmpoweringLevelRequirements(): Partial<Record<SpellElement, number>> {
      return { Earth: 55 };
    }
    protected isEmpowerable(): boolean {
      return true;
    }

    // We don't want the spell to be castable if we're full of Earth Essence
    isEnabled(state: GameState, skipAffordabilityChecks?: boolean): boolean {
      return (
        MR2.getResourceAmount(state, MR2.Resource.EarthEssence) <
        MR2.getResourceCap(state, MR2.Resource.EarthEssence)
      );
    }
  }

  // Create the singleton
  const overpoweredChanneling = new OverpoweredChanneling();

  // This function creates a Transformation that applies to this spell's effects
  // if the spell is empowered
  MR2.registerStandardEmpowerEffects(overpoweredChanneling, 4, 10);

  // And register the singleton
  MR2.registerSpell(overpoweredChanneling);

  // And now, the other spell...
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
      // These will be appended to the ActionEffect-related applyTransformation calls.
      // This makes it possible for this spell to be modified by effects
      // that target attack spells, like Spell Catalysts.
      return [MR2.TransformationTags.AttackSpell];
    }

    getBaseManaCost(state: GameState): number {
      return 250;
    }

    getDisplayDescription(state: GameState): string {
      return "An overpowered Fire spell.";
    }

    protected getBaseActionEffects(): Record<string, ActionEffect> {
      // Standard attack spells have average and variance as action effects.
      // This will make it possible for the utility functions to pick them up
      // easily.
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
