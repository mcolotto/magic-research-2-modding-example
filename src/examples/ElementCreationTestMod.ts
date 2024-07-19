import { MR2Globals } from "magic-research-2-modding-sdk";
import { GameState } from "magic-research-2-modding-sdk/modding-decs/backend/GameState";
import { SpellElementType } from "magic-research-2-modding-sdk/modding-decs/backend/spells/Elements";

const ELEMENT_NAME = "Fungus";
const RESOURCE_NAME = ELEMENT_NAME;

// This test mod creates a new simple Element using the preload feature
// of the modding system to obtain many of the "default" behaviors
// (like being unable to cast their spells during the pilgrimage of another Element)
export function preloadElementCreationTestMod(MR2: MR2Globals) {
  // The theme for the element.
  // You can generate a theme by using the tool at
  // https://callstack.github.io/react-native-paper/docs/guides/theming
  const fungusTheme = (isDark: boolean) => {
    const exportedColors = !isDark
      ? {
          colors: {
            primary: "rgb(135, 82, 0)",
            onPrimary: "rgb(255, 255, 255)",
            primaryContainer: "rgb(255, 221, 186)",
            onPrimaryContainer: "rgb(43, 23, 0)",
            secondary: "rgb(113, 90, 65)",
            onSecondary: "rgb(255, 255, 255)",
            secondaryContainer: "rgb(253, 221, 189)",
            onSecondaryContainer: "rgb(40, 24, 5)",
            tertiary: "rgb(85, 99, 60)",
            onTertiary: "rgb(255, 255, 255)",
            tertiaryContainer: "rgb(216, 233, 183)",
            onTertiaryContainer: "rgb(20, 31, 2)",
            error: "rgb(186, 26, 26)",
            onError: "rgb(255, 255, 255)",
            errorContainer: "rgb(255, 218, 214)",
            onErrorContainer: "rgb(65, 0, 2)",
            background: "rgb(255, 251, 255)",
            onBackground: "rgb(31, 27, 22)",
            surface: "rgb(255, 251, 255)",
            onSurface: "rgb(31, 27, 22)",
            surfaceVariant: "rgb(241, 224, 208)",
            onSurfaceVariant: "rgb(80, 69, 58)",
            outline: "rgb(130, 117, 104)",
            outlineVariant: "rgb(212, 196, 181)",
            shadow: "rgb(0, 0, 0)",
            scrim: "rgb(0, 0, 0)",
            inverseSurface: "rgb(53, 47, 42)",
            inverseOnSurface: "rgb(249, 239, 231)",
            inversePrimary: "rgb(255, 184, 101)",
            elevation: {
              level0: "transparent",
              level1: "rgb(249, 243, 242)",
              level2: "rgb(245, 238, 235)",
              level3: "rgb(242, 232, 227)",
              level4: "rgb(241, 231, 224)",
              level5: "rgb(238, 227, 219)",
            },
            surfaceDisabled: "rgba(31, 27, 22, 0.12)",
            onSurfaceDisabled: "rgba(31, 27, 22, 0.38)",
            backdrop: "rgba(57, 47, 36, 0.4)",
          },
        }
      : {
          colors: {
            primary: "rgb(255, 184, 101)",
            onPrimary: "rgb(72, 42, 0)",
            primaryContainer: "rgb(102, 61, 0)",
            onPrimaryContainer: "rgb(255, 221, 186)",
            secondary: "rgb(224, 193, 163)",
            onSecondary: "rgb(63, 45, 23)",
            secondaryContainer: "rgb(88, 67, 43)",
            onSecondaryContainer: "rgb(253, 221, 189)",
            tertiary: "rgb(189, 205, 157)",
            onTertiary: "rgb(40, 52, 18)",
            tertiaryContainer: "rgb(62, 75, 39)",
            onTertiaryContainer: "rgb(216, 233, 183)",
            error: "rgb(255, 180, 171)",
            onError: "rgb(105, 0, 5)",
            errorContainer: "rgb(147, 0, 10)",
            onErrorContainer: "rgb(255, 180, 171)",
            background: "rgb(31, 27, 22)",
            onBackground: "rgb(235, 225, 217)",
            surface: "rgb(31, 27, 22)",
            onSurface: "rgb(235, 225, 217)",
            surfaceVariant: "rgb(80, 69, 58)",
            onSurfaceVariant: "rgb(212, 196, 181)",
            outline: "rgb(157, 142, 129)",
            outlineVariant: "rgb(80, 69, 58)",
            shadow: "rgb(0, 0, 0)",
            scrim: "rgb(0, 0, 0)",
            inverseSurface: "rgb(235, 225, 217)",
            inverseOnSurface: "rgb(53, 47, 42)",
            inversePrimary: "rgb(135, 82, 0)",
            elevation: {
              level0: "transparent",
              level1: "rgb(42, 35, 26)",
              level2: "rgb(49, 40, 28)",
              level3: "rgb(56, 44, 31)",
              level4: "rgb(58, 46, 32)",
              level5: "rgb(62, 49, 33)",
            },
            surfaceDisabled: "rgba(235, 225, 217, 0.12)",
            onSurfaceDisabled: "rgba(235, 225, 217, 0.38)",
            backdrop: "rgba(57, 47, 36, 0.4)",
          },
        };
    return exportedColors.colors;
  };

  // Register the icon
  const fungusIcon = require("./fungus.png");
  MR2.registerGameIcon(ELEMENT_NAME.toLowerCase(), fungusIcon);
  MR2.registerGameIcon("fungusessence", fungusIcon);

  // Register the resource
  MR2.registerResource(RESOURCE_NAME, {
    id: RESOURCE_NAME,
    name: "Fungus",
    resourceInfo: { baseCap: 100, icon: "fungusessence" },
  });

  // Register the element
  MR2.registerSpellElement({
    colors: fungusTheme,
    id: ELEMENT_NAME,
    name: "Fungus",
    description:
      "A mysterious Element. Nothing is known about it except that it's ridiculous.",
  });

  // Register the association between the element and the resource
  MR2.registerExtraElementToResourceMapping(ELEMENT_NAME, RESOURCE_NAME);

  // All the rest is done in the post-load phase
}

export function loadElementCreationTestMod(MR2: MR2Globals) {
  // Create a channeling spell (required)
  class ChannelFungus extends MR2.BasicChannelingSpellBase {
    getId(): string {
      return "channelFungus";
    }
    getSpellName(): string {
      return "Channel Fungus";
    }
    getElement(): SpellElementType | undefined {
      return ELEMENT_NAME;
    }
    getDisplayDescription(state: GameState): string {
      return "Channel some of your Mana into Fungus Essence, a basic resource.";
    }
    getLevelRequirements(): Partial<Record<SpellElementType, number>> {
      return {
        Fungus: 1,
      };
    }
    getManaCostProportion(): number {
      // Requires a lot of Mana
      return 0.3;
    }
    getBaseEssenceEfficiency(): number {
      // Produces a ton of Essence
      return 10;
    }
  }

  const channelFungus = new ChannelFungus();
  MR2.registerSpell(channelFungus);
  MR2.registerChannelingSpellForElement("Fungus", channelFungus);

  // Create and load a shard (required because of Shard Stockpile Storyline)
  MR2.createAndLoadElementalShard("Fungus", require("./fungus.png"), 0.25);

  // Create a way to unlock this Element
  const tomeOfFungalKnowledge = new MR2.Storyline(
    "tomeOfFungalKnowledge",
    "Tome of Fungal Knowledge",
    45,
    1,
    "Defeat the boss of the Tower of Earth Training",
    "Unlock the Fungus Element",
    (state) => true,
  );
  MR2.Storylines.register(tomeOfFungalKnowledge);
  const fungusUnlockEventBuilder = MR2.buildEvent(
    "tomeOfFungalKnowledge",
    "(Storyline) Tome of Fungal Knowledge",
    [MR2.EventTag.STORYLINE],
  ).setStorylineIds(tomeOfFungalKnowledge.getId());

  fungusUnlockEventBuilder
    .message(
      "At the end of the long tower and after that Windglider, you find something really, really special...!",
    )
    .option(
      "Continue",
      {
        transform: (state) => {
          state = tomeOfFungalKnowledge.complete(state);
          if (
            MR2.hasElementBeenPartiallyUnlockedInPreviousRun(
              state,
              ELEMENT_NAME,
            )
          ) {
            state = tomeOfFungalKnowledge.activateBonus(state);
            const fungusLevel = MR2.getElementLevel(state, ELEMENT_NAME);
            state = MR2.unlockElement(ELEMENT_NAME)(state);
            state.run.elementExperience[ELEMENT_NAME] = 0;
            delete state.run.elementExponents[ELEMENT_NAME];
            state = MR2.grantElementExp(
              ELEMENT_NAME,
              MR2.getTotalExpRequiredForLevel(state, fungusLevel, ELEMENT_NAME),
            )(state);
          }
          state = MR2.clearResourceCapCache(state);
          state = MR2.clearResearcherExpCache(state);
          return state;
        },
      },
      "end",
    );
  fungusUnlockEventBuilder
    .message(
      `Amazing! It's a Tome of Fungal Knowledge! Just what you wanted!

/lastLine/`,
    )
    .tag("end")
    .end();

  const fungusUnlockEvent = fungusUnlockEventBuilder.build();

  MR2.EnemyDeathListeners.register((state, enemy) => {
    if (enemy.getId() != "windglider") {
      return state;
    }
    if (
      !fungusUnlockEvent.hasTriggered(state) &&
      !tomeOfFungalKnowledge.isCompleted(state)
    ) {
      return MR2.triggerEvent(fungusUnlockEvent, {
        lastLine: MR2.hasElementBeenPartiallyUnlockedInPreviousRun(
          state,
          ELEMENT_NAME,
        )
          ? '**You have completed the "Tome of Fungal Knowledge" Storyline and have fully unlocked the Fungus element! There will be no more penalties to Fungus or :fungus: Essence. Also, in future retirements, Fungus will be available from the start, with no penalties, and it will be possible to select it as a primary element!**'
          : '**You have completed the "Tome of Fungal Knowledge" Storyline! There will be no more penalties to :fungus: Essence. Also, in future retirements, Fungus will be fully unlocked! This means that it will be available from the start, with no penalties, and it will be possible to select it as a primary element!**',
      })(state);
    }
    return state;
  }, fungusUnlockEvent.getId());

  MR2.registerRetirementListener(
    "fungusUnlockRetirementListener",
    (state, isMock) => {
      if (
        tomeOfFungalKnowledge.isCompleted(state) &&
        !MR2.getFullyUnlockedElements(state).includes(ELEMENT_NAME)
      ) {
        state = MR2.unlockElement(ELEMENT_NAME)(state);
      }
      return state;
    },
  );

  MR2.registerTransformation(
    [[ELEMENT_NAME, MR2.TransformationTags.PerBuildingCap]],
    "afterFungusUnlockCap",
    tomeOfFungalKnowledge.getName(),
    MR2.TransformationType.Multiplier,
    (state) =>
      tomeOfFungalKnowledge.isCompleted(state) &&
      !MR2.getFullyUnlockedElements(state).includes(ELEMENT_NAME)
        ? 1 / 4.0
        : 1.0,
  );

  MR2.registerTransformation(
    [
      [ELEMENT_NAME, MR2.TransformationTags.ChannelingEfficiency],
      [ELEMENT_NAME, MR2.TransformationTags.ExpGain],
    ],
    "afterFungusUnlockChanneling",
    tomeOfFungalKnowledge.getName(),
    MR2.TransformationType.Multiplier,
    (state) =>
      tomeOfFungalKnowledge.isCompleted(state) &&
      !MR2.getFullyUnlockedElements(state).includes(ELEMENT_NAME)
        ? 1 / 4.0
        : 1.0,
  );

  // Partially unlock the Element when Exploration is unlocked, without any fanfare
  MR2.SetFlagListeners.register((state, flag) => {
    if (
      state.run.primaryElement != null &&
      flag == "ExplorationUnlocked" &&
      !tomeOfFungalKnowledge.isBonusActive(state)
    ) {
      state = MR2.partiallyUnlockElement(ELEMENT_NAME)(state);
    }
    return state;
  }, "fungusPartialUnlocker");
  // This one is needed in case a retirement listener pre-unlocks Exploration
  // The last number is high so it runs as the last post-retirement listener
  MR2.registerPostRetirementListener(
    "fungusPartialUnlocker",
    (state) => {
      if (
        MR2.hasFlag(state, "ExplorationUnlocked") &&
        !tomeOfFungalKnowledge.isBonusActive(state)
      ) {
        state = MR2.partiallyUnlockElement(ELEMENT_NAME)(state);
      }
      return state;
    },
    9850,
  );
  // Finally, if we load a save file where Exploration is already unlocked,
  // we will need to partially unlock it
  MR2.SaveDataCompatibilityTransforms.register((state) => {
    if (
      !tomeOfFungalKnowledge.isBonusActive(state) &&
      MR2.hasFlag(state, "ExplorationUnlocked")
    ) {
      state = MR2.partiallyUnlockElement(ELEMENT_NAME)(state);
    }
    return state;
  }, "fungusPartialUnlocker");
}
