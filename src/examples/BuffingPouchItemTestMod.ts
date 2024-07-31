import { MR2Globals } from "magic-research-2-modding-sdk";
import { GameState } from "magic-research-2-modding-sdk/modding-decs/backend/GameState";
import { EquippableItem } from "magic-research-2-modding-sdk/modding-decs/backend/items/equipment/EquippableItem";
import { ItemParams } from "magic-research-2-modding-sdk/modding-decs/backend/items/Item";
import { Resource } from "magic-research-2-modding-sdk/modding-decs/backend/Resources";
import { SpellElement } from "magic-research-2-modding-sdk/modding-decs/backend/spells/Elements";
import { TemporaryEffect } from "magic-research-2-modding-sdk/modding-decs/backend/temporaryeffects/TemporaryEffect";
import { TemporaryEffectData } from "magic-research-2-modding-sdk/modding-decs/backend/temporaryeffects/TemporaryEffects";

/**
 * This mod creates a pouch item that grants a buff, like a buff potion.
 * The buff potion will grant extra Studying exp and attack power.
 */
export function loadBuffingPouchItemTestMod(MR2: MR2Globals) {
  // We need to first declare the TemporaryEffect (the buff).
  class InsightTemporaryEffect extends MR2.TemporaryEffect {
    getId(): string {
      return "insight";
    }

    getDisplayName(): string {
      return "Insight";
    }

    getDisplayDescription(
      state: GameState,
      temporaryEffectData: TemporaryEffectData,
    ): string {
      // When we grant the temporary effect, we will add some params
      // describing the magnitude of the effect.
      const studyExpMultiplier = temporaryEffectData.params.studyExp + 1.0;
      const attack = temporaryEffectData.params.attack;
      return `${MR2.formatMultiplier(
        studyExpMultiplier,
      )} Exp from Studying; +${MR2.formatNumber(attack)}:attack:`;
    }
  }
  // Create a singleton for the buff.
  const Insight = new InsightTemporaryEffect();
  // Since it's a new entity, it needs to be registered.
  MR2.TemporaryEffects.register(Insight);

  // This transformation will take care of increasing the Study exp gain
  // by the multiplier in the buff.
  MR2.registerTransformation(
    [[MR2.TransformationTags.ExpGain, MR2.TransformationTags.Study]],
    Insight.getId() + "exp",
    Insight.getDisplayName(),
    MR2.TransformationType.Multiplier,
    (state, params) => {
      if (!MR2.hasTemporaryEffect(state, Insight.getId())) {
        return 1.0;
      }
      return (
        MR2.getTemporaryEffectData(state, Insight.getId())?.params?.studyExp +
        1.0
      );
    },
  );

  // This transformation increases the player's attack.
  MR2.registerTransformation(
    [[MR2.AttackTarget.Player, MR2.CombatStat.Attack]],
    Insight.getId() + "attack",
    Insight.getDisplayName(),
    MR2.TransformationType.Addition,
    (state, params) => {
      if (!MR2.hasTemporaryEffect(state, Insight.getId())) {
        return 0;
      }
      return MR2.getTemporaryEffectData(state, Insight.getId())?.params?.attack;
    },
  );

  // If you have any temporary effect that may change combat stats,
  // you will need to register this cache clearer because combat stats
  // are cached.
  MR2.registerTemporaryEffectCombatStatCacheClearer(
    Insight.getId(),
    MR2.CombatStat.Attack,
  );

  // Next, we need to declare the item...
  class PotionOfInsight extends MR2.BuffingPouchItem {
    getId(): string {
      return "potionOfInsight";
    }

    getTemporaryEffect(): TemporaryEffect {
      return Insight;
    }

    getBaseName(params: ItemParams) {
      return "Potion of Insight";
    }
    getDescription(state: GameState, params: ItemParams) {
      return `A potion that reveals your inner strength but also makes you study harder than ever.`;
    }

    // It is best practice to put any effects that are going to be "transformed"
    // into this function, so that they are picked up automatically by the
    // transformation system.
    // The tags here are not the only tags that will be applied:
    // it will append other tags, such as the item ID ("potionOfInsight")
    // and MR2.TransformationTags.ItemEffect.
    getBaseItemEffects(params: ItemParams) {
      return {
        attack: {
          // The base value
          value: 5,
          // Any tags describing the value, so that other transformations
          // can affect the value
          tags: [MR2.TransformationTags.TemporaryEffectMagnitude],
          // This unit is used in explanations (tooltips)
          unit: ":attack:",
        },
        studyExp: {
          value: 0.1,
          tags: [MR2.TransformationTags.TemporaryEffectMagnitude],
          // Sometimes values scale or are applied differently.
          // In this case, it is a 10% multiplicative increase (base),
          // so we specify this valueType.
          valueType: MR2.TransformationValueType.Percent,
        },
        duration: {
          value: 300,
          tags: [MR2.TransformationTags.TemporaryEffectDuration],
          unit: " sec",
        },
      };
    }

    getPicture(): any {
      return require("./potionOfInsight.png");
    }

    getEffect(state: GameState, params: ItemParams) {
      const effects = this.getItemEffects(state, params);
      const explanations = this.getItemEffectExplanations(state, params);
      return `^${MR2.formatMultiplier(effects.studyExp + 1.0)}^<${
        explanations.studyExp
      }> Exp from Studying; ^+${MR2.formatNumber(effects.attack)}^<${
        explanations.attack
      }>:attack: for ^${MR2.formatNumber(effects.duration)}^<${
        explanations.duration
      }> sec`;
    }

    getBaseSalePrice(state: GameState, params: ItemParams) {
      return 1200;
    }
  }

  // Create the singleton for the entity
  const potionOfInsight = new PotionOfInsight();

  // We want it to be transmutable, so we need to create the transmutation spell...
  class TransmutePotionOfInsight extends MR2.EquipmentTransmutationSpell {
    getItem(): EquippableItem {
      return potionOfInsight;
    }

    getElement(): SpellElement | undefined {
      return MR2.SpellElement.Water;
    }

    getCraftingMaterialsBase(state: GameState): {
      resources: Partial<Record<Resource, number>>;
      items: Record<string, number>;
    } {
      return {
        resources: {
          WaterEssence: 50,
        },
        items: {
          // Those are item IDs
          elementalShardFire: 2,
          elementalShardWater: 4,
        },
      };
    }

    getCraftingElementLevelRequirements(): Partial<
      Record<SpellElement, number>
    > {
      return {
        Water: 4,
      };
    }
  }

  // Create the singleton for the spell
  const transmutePotionOfInsight = new TransmutePotionOfInsight();

  // This registers both the spell and the item.
  MR2.registerTransmutationSpellAndItem(transmutePotionOfInsight);

  // We're finally done!
}
