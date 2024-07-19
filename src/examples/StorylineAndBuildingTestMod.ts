import { MR2Globals } from "magic-research-2-modding-sdk";
import {
  ActionArea,
  ActionSubcategory,
} from "magic-research-2-modding-sdk/modding-decs/backend/action/ActionAreas";
import { Building } from "magic-research-2-modding-sdk/modding-decs/backend/buildings/Building";
import { GameState } from "magic-research-2-modding-sdk/modding-decs/backend/GameState";
import { Resource } from "magic-research-2-modding-sdk/modding-decs/backend/Resources";
import { SpellElement } from "magic-research-2-modding-sdk/modding-decs/backend/spells/Elements";

export function loadStorylineAndBuildingTestMod(MR2: MR2Globals) {
  // Event
  const storyline = new MR2.Storyline(
    "manaGeyserStoryline",
    "Bursts from the Ground",
    55,
    10,
    "Do not Explore anything",
    "Unlocks furniture Mana Geysers",
    (state) => true,
  );
  MR2.Storylines.register(storyline);
  const eventBuilder = MR2.buildEvent(
    "manaGeyserUnlockerStoryline",
    "(Storyline) Bursts from the Ground",
    [MR2.EventTag.STORYLINE],
  ).setStorylineIds(storyline.getId());
  eventBuilder.message("Something is **up**!");
  eventBuilder
    .message(
      "You find something bursting from the ground, but you need something to take advantage of it.",
    )
    .option(
      "Build a containing structure (Requires Lv8 Earth and /essenceAmountText/ Earth Essence)",
      {
        transform: (state, params) => {
          state = MR2.grantResource(
            MR2.Resource.EarthEssence,
            -params.essenceAmount,
          )(state);
          state = storyline.complete(state);
          return state;
        },
        isEnabled: (state, params) =>
          MR2.getCappedResourceAmount(state, MR2.Resource.EarthEssence) >=
            params.essenceAmount &&
          MR2.getElementLevel(state, MR2.SpellElement.Earth) >= 8,
      },
      "paid",
    )
    .option("Maybe later")
    .end();
  eventBuilder
    .message(
      `You build the containing structure. It will work in your next life!

**You have completed the "Bursts from the Ground" Storyline! In future retirements, you will be able to build Mana Geysers, a new furniture that you can use to get :mana:!**`,
    )
    .tag("paid");
  const gameEvent = eventBuilder.build();

  MR2.registerRandomEventTrigger(
    gameEvent,
    40,
    (state) =>
      !gameEvent.hasTriggered(state) &&
      !storyline.isCompleted(state) &&
      MR2.getExplorationStatus(state) == MR2.ExplorationStatus.None,
    (state) => {
      const essenceAmount = Math.random() * 2000 + 1000;
      const essenceAmountText = MR2.formatNumber(essenceAmount, {
        showDecimals: false,
        roundingMethod: MR2.RoundingMethod.UP,
      });
      return {
        essenceAmount: essenceAmount,
        essenceAmountText: essenceAmountText,
      };
    },
  );

  // Building
  const calculateIncomePerGeyser = (state: GameState) =>
    MR2.applyTransformationsCached(
      [MR2.TransformationTags.Production, MR2.Resource.Mana, "manaGeyser"],
      state,
      20.0,
    );
  const calculateExpensePerGeyser = (state: GameState) =>
    MR2.applyTransformationsCached(
      [
        MR2.TransformationTags.Consumption,
        MR2.Resource.EarthEssence,
        "manaGeyser",
      ],
      state,
      200.0,
    );
  const explainIncomePerGeyser = (state: GameState) =>
    MR2.explainTransformationsText(
      [MR2.TransformationTags.Production, MR2.Resource.Mana, "manaGeyser"],
      state,
      20.0,
      { unit: ":mana:" },
    );
  const explainExpensePerGeyser = (state: GameState) =>
    MR2.explainTransformationsText(
      [
        MR2.TransformationTags.Consumption,
        MR2.Resource.EarthEssence,
        "manaGeyser",
      ],
      state,
      200.0,
      { unit: ":earthessence:" },
    );

  class ManaGeyser extends MR2.Building {
    getId(): string {
      return "manaGeyser";
    }

    getName(): string {
      return "Mana Geyser";
    }

    getBaseLandRequired(): number {
      return 6;
    }

    canTurnOff(): boolean {
      return true;
    }
    getDisplayDescription(state: GameState): string {
      return "A strong source of :mana:. Draws from the power of :earthessence:.";
    }

    getDisplayEffect(state: GameState): string {
      const income = calculateIncomePerGeyser(state);
      const expense = calculateExpensePerGeyser(state);
      const incomeExplanation = explainIncomePerGeyser(state);
      const expenseExplanation = explainExpensePerGeyser(state);
      return `^${MR2.formatNumber(
        income,
      )}^<${incomeExplanation}>:mana:/sec; ^-${MR2.formatNumber(
        expense,
      )}^<${expenseExplanation}>:earthessence:/sec`;
    }
  }

  const manaGeyser = new ManaGeyser();

  MR2.IncomeOverTimeProducers.register(
    new MR2.IncomeOverTimeProducer(
      manaGeyser.getId(),
      manaGeyser.getName(),
      (state) => ({
        Mana:
          calculateIncomePerGeyser(state) *
          MR2.getBuildingAmountTurnedOn(state, manaGeyser),
        EarthEssence:
          -1 *
          calculateExpensePerGeyser(state) *
          MR2.getBuildingAmountTurnedOn(state, manaGeyser),
      }),
    ),
  );

  MR2.Buildings.register(manaGeyser);

  class BuildManaGeyser extends MR2.BuildingSpell {
    getBuilding(): Building {
      return manaGeyser;
    }

    getAreas(): Partial<Record<ActionArea, ActionSubcategory[]>> {
      return { HOME: [MR2.ActionSubcategories.MANA] };
    }

    getBaseResourceCost(): Partial<Record<Resource, number>> {
      return {
        WaterEssence: 500,
        EarthEssence: 500,
      };
    }

    getBaseResourceScale(): Partial<Record<Resource, number>> {
      return {
        WaterEssence: 1.4,
        EarthEssence: 1.2,
      };
    }

    getBaseAlternateLandUnawareBuildingAmount(): number {
      return 2;
    }

    isVisible(state: GameState): boolean {
      return storyline.isBonusActive(state);
    }

    getLevelRequirements(): Partial<Record<SpellElement, number>> {
      return { Earth: 1 };
    }

    getElement(): SpellElement | undefined {
      return MR2.SpellElement.Earth;
    }
  }

  const buildManaGeyser = new BuildManaGeyser();

  MR2.BuildingAmountListeners.register((state, building) => {
    if (building == manaGeyser) {
      state = MR2.clearCalculatedIncomeCache(state);
    }
    return state;
  });

  MR2.registerSpell(buildManaGeyser);
}
