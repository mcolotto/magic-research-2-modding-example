import { MR2Globals } from "magic-research-2-modding-sdk";
import { GameState } from "magic-research-2-modding-sdk/modding-decs/backend/GameState";
import { EquippableItem } from "magic-research-2-modding-sdk/modding-decs/backend/items/equipment/EquippableItem";
import { ItemParams } from "magic-research-2-modding-sdk/modding-decs/backend/items/Item";
import { Resource } from "magic-research-2-modding-sdk/modding-decs/backend/Resources";
import { SpellElement } from "magic-research-2-modding-sdk/modding-decs/backend/spells/Elements";
import { TemporaryEffect } from "magic-research-2-modding-sdk/modding-decs/backend/temporaryeffects/TemporaryEffect";
import { TemporaryEffectData } from "magic-research-2-modding-sdk/modding-decs/backend/temporaryeffects/TemporaryEffects";

export function loadBuffingPouchItemTestMod(MR2: MR2Globals) {
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
      const studyExpMultiplier = temporaryEffectData.params.studyExp + 1.0;
      const attack = temporaryEffectData.params.attack;
      return `${MR2.formatMultiplier(
        studyExpMultiplier,
      )} Exp from Studying; +${MR2.formatNumber(attack)}:attack:`;
    }
  }
  const Insight = new InsightTemporaryEffect();
  MR2.TemporaryEffects.register(Insight);

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

  MR2.registerTemporaryEffectCombatStatCacheClearer(
    Insight.getId(),
    MR2.CombatStat.Attack,
  );

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
    getBaseItemEffects(params: ItemParams) {
      return {
        attack: {
          value: 5,
          tags: [MR2.TransformationTags.TemporaryEffectMagnitude],
          unit: ":attack:",
        },
        studyExp: {
          value: 0.1,
          tags: [MR2.TransformationTags.TemporaryEffectMagnitude],
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

  const potionOfInsight = new PotionOfInsight();

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

  const transmutePotionOfInsight = new TransmutePotionOfInsight();

  MR2.registerTransmutationSpellAndItem(transmutePotionOfInsight);
}
