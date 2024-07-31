import { MR2Globals } from "magic-research-2-modding-sdk";
import {
  ActionArea,
  ActionSubcategory,
} from "magic-research-2-modding-sdk/modding-decs/backend/action/ActionAreas";
import { Building } from "magic-research-2-modding-sdk/modding-decs/backend/buildings/Building";
import { GameState } from "magic-research-2-modding-sdk/modding-decs/backend/GameState";
import { Resource } from "magic-research-2-modding-sdk/modding-decs/backend/Resources";
import { SpellElement } from "magic-research-2-modding-sdk/modding-decs/backend/spells/Elements";

/**
 * This mod creates a new furniture, Mana Geysers, that produces Mana
 * in exchange for Earth Essence.
 * The furniture is unlocked via a Storyline.
 */
export function loadStorylineAndBuildingTestMod(MR2: MR2Globals) {
  // Event

  // First, define the Storyline...
  const storyline = new MR2.Storyline(
    "manaGeyserStoryline",
    "Bursts from the Ground",
    55,
    10,
    "Do not Explore anything",
    "Unlocks furniture Mana Geysers",
    (state) => true,
  );
  // Register the Storyline in the game.
  MR2.Storylines.register(storyline);

  // Now, we'll build the event that completes the Storyline.
  // This is done via an event builder.
  // You can call .message() subsequently for a sequence of messages.
  // You can have each message have multiple options, and enumerate them
  // with .option(). There are some examples on how to use these here.
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
  // Once done enumerating all the messages, we should build the event.
  // This automatically registers the event as well.
  const gameEvent = eventBuilder.build();

  // We will make the Storyline event happen randomly
  // if the player is not exploring at all.
  MR2.registerRandomEventTrigger(
    gameEvent,
    40,
    (state) =>
      !gameEvent.hasTriggered(state) &&
      !storyline.isCompleted(state) &&
      MR2.getExplorationStatus(state) == MR2.ExplorationStatus.None,
    (state) => {
      // The required Essence is actually random, and we calculate it
      // at the time the event triggers and set it as params.
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

  // These functions will calculate the income and expenses of each building.
  // Notice the use of applyTransformationsCached for performance.
  const calculateIncomePerGeyser = (state: GameState) =>
    MR2.applyTransformationsCached(
      // These are the tags that will be used to determine what transformations
      // apply to this calculation.
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
  // These functions are used to explain the income and expenses, for the
  // tooltips.
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

  // Finally, we define the building...
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

  // We create the singleton for the building
  const manaGeyser = new ManaGeyser();

  // This is where we actually make the building have an effect.
  // We add a new IncomeOverTimeProducer, and it's based on
  // the auxiliary functions we added at first.
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

  // We register the building...
  MR2.Buildings.register(manaGeyser);

  // We need to define a way to "build" the building.
  // This is done via a BuildingSpell.
  // So we need to define this spell.
  class BuildManaGeyser extends MR2.BuildingSpell {
    getBuilding(): Building {
      return manaGeyser;
    }

    // This is where we want the spell to appear.
    // We don't want this to appear in the spell menu, we want it to
    // show in the Home screen in the Mana subcategory.
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

    // The first two buildings do not get their cost penalized by Land
    // in Classic Mode.
    getBaseAlternateLandUnawareBuildingAmount(): number {
      return 2;
    }

    // The spell to build the building is only visible
    // if we have completed the Storyline above and its bonus
    // is active (i.e. after retirement).
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

  // Create the singleton...
  const buildManaGeyser = new BuildManaGeyser();

  // One thing is that there is a cache for incomes.
  // Because changing the amount of buildings active of this type
  // changes the income, we'll need to clear the cache when it happens.
  MR2.BuildingAmountListeners.register((state, building) => {
    if (building == manaGeyser) {
      state = MR2.clearCalculatedIncomeCache(state);
    }
    return state;
  });

  // Finally, register the spell
  MR2.registerSpell(buildManaGeyser);
}
