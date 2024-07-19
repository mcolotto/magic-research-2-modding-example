import { MR2Globals } from "magic-research-2-modding-sdk";

function overrideWaterElement(MR2: MR2Globals) {
  // NOTE: This doesn't even fully work yet

  // This test mod is by far the most complex and difficult one.
  // In this test mod we will try to override most things related to the Water element
  // and leave it closer to a blank state.
  // If you are overriding unlockable Elements, you'll need to do different kinds of work
  // where for example you remove the events that unlock them.

  // The theme for the element.
  // You can generate a theme by using the tool at
  // https://callstack.github.io/react-native-paper/docs/guides/theming
  const iceTheme = (isDark: boolean) => {
    const exportedColors = !isDark
      ? {
          colors: {
            primary: "rgb(0, 95, 172)",
            onPrimary: "rgb(255, 255, 255)",
            primaryContainer: "rgb(212, 227, 255)",
            onPrimaryContainer: "rgb(0, 28, 57)",
            secondary: "rgb(84, 95, 113)",
            onSecondary: "rgb(255, 255, 255)",
            secondaryContainer: "rgb(216, 227, 248)",
            onSecondaryContainer: "rgb(17, 28, 43)",
            tertiary: "rgb(109, 86, 119)",
            onTertiary: "rgb(255, 255, 255)",
            tertiaryContainer: "rgb(246, 217, 255)",
            onTertiaryContainer: "rgb(39, 20, 48)",
            error: "rgb(186, 26, 26)",
            onError: "rgb(255, 255, 255)",
            errorContainer: "rgb(255, 218, 214)",
            onErrorContainer: "rgb(65, 0, 2)",
            background: "rgb(253, 252, 255)",
            onBackground: "rgb(26, 28, 30)",
            surface: "rgb(253, 252, 255)",
            onSurface: "rgb(26, 28, 30)",
            surfaceVariant: "rgb(223, 226, 235)",
            onSurfaceVariant: "rgb(67, 71, 78)",
            outline: "rgb(115, 119, 127)",
            outlineVariant: "rgb(195, 198, 207)",
            shadow: "rgb(0, 0, 0)",
            scrim: "rgb(0, 0, 0)",
            inverseSurface: "rgb(47, 48, 51)",
            inverseOnSurface: "rgb(241, 240, 244)",
            inversePrimary: "rgb(164, 201, 255)",
            elevation: {
              level0: "transparent",
              level1: "rgb(240, 244, 251)",
              level2: "rgb(233, 239, 248)",
              level3: "rgb(225, 235, 246)",
              level4: "rgb(223, 233, 245)",
              level5: "rgb(218, 230, 243)",
            },
            surfaceDisabled: "rgba(26, 28, 30, 0.12)",
            onSurfaceDisabled: "rgba(26, 28, 30, 0.38)",
            backdrop: "rgba(45, 49, 56, 0.4)",
          },
        }
      : {
          colors: {
            primary: "rgb(164, 201, 255)",
            onPrimary: "rgb(0, 49, 93)",
            primaryContainer: "rgb(0, 72, 131)",
            onPrimaryContainer: "rgb(212, 227, 255)",
            secondary: "rgb(188, 199, 219)",
            onSecondary: "rgb(38, 49, 65)",
            secondaryContainer: "rgb(61, 71, 88)",
            onSecondaryContainer: "rgb(216, 227, 248)",
            tertiary: "rgb(217, 189, 227)",
            onTertiary: "rgb(61, 41, 70)",
            tertiaryContainer: "rgb(84, 63, 94)",
            onTertiaryContainer: "rgb(246, 217, 255)",
            error: "rgb(255, 180, 171)",
            onError: "rgb(105, 0, 5)",
            errorContainer: "rgb(147, 0, 10)",
            onErrorContainer: "rgb(255, 180, 171)",
            background: "rgb(26, 28, 30)",
            onBackground: "rgb(227, 226, 230)",
            surface: "rgb(26, 28, 30)",
            onSurface: "rgb(227, 226, 230)",
            surfaceVariant: "rgb(67, 71, 78)",
            onSurfaceVariant: "rgb(195, 198, 207)",
            outline: "rgb(141, 145, 153)",
            outlineVariant: "rgb(67, 71, 78)",
            shadow: "rgb(0, 0, 0)",
            scrim: "rgb(0, 0, 0)",
            inverseSurface: "rgb(227, 226, 230)",
            inverseOnSurface: "rgb(47, 48, 51)",
            inversePrimary: "rgb(0, 95, 172)",
            elevation: {
              level0: "transparent",
              level1: "rgb(33, 37, 41)",
              level2: "rgb(37, 42, 48)",
              level3: "rgb(41, 47, 55)",
              level4: "rgb(43, 49, 57)",
              level5: "rgb(45, 52, 62)",
            },
            surfaceDisabled: "rgba(227, 226, 230, 0.12)",
            onSurfaceDisabled: "rgba(227, 226, 230, 0.38)",
            backdrop: "rgba(45, 49, 55, 0.4)",
          },
        };
    return exportedColors.colors;
  };

  // Register the icon and override the other icons
  const iceIcon = require("./ice.png");
  MR2.registerGameIcon("ice", iceIcon);
  MR2.registerGameIcon("water", iceIcon);
  MR2.registerGameIcon("wateressence", iceIcon);

  // Override the resource
  MR2.registerResource(MR2.Resource.WaterEssence, {
    id: MR2.Resource.WaterEssence,
    name: "Ice",
    resourceInfo: { baseCap: 100, icon: "ice" },
  });

  // Override the element!
  MR2.registerSpellElement({
    colors: iceTheme,
    id: MR2.SpellElement.Water,
    name: "Ice",
    description:
      "A frosty Element. It used to be Water, but in this World, it is just too cold.",
  });

  // Get rid of all the spells and transmutations (except Channeling)
  const allSpells = MR2.Spells.getAll();
  const waterSpells = allSpells.filter(
    (spell) =>
      !(spell instanceof MR2.BuildingSpell) &&
      spell.getLevelRequirements()?.Water != null &&
      !(spell instanceof MR2.BasicChannelingSpellBase),
  );
  for (let spell of waterSpells) {
    MR2.Spells.delete(spell.getId());
    // Spells are also Actions so we need to delete the Action
    MR2.Actions.delete(spell.getId());
  }

  // Take Channel Water and rename it
  const channelWater = MR2.Spells.getById("channelWater");
  channelWater.getSpellName = () => "Channel Ice";
  const oldDisplayDescription =
    channelWater.getDisplayDescription.bind(channelWater);
  channelWater.getDisplayDescription = (state) =>
    oldDisplayDescription(state).replaceAll("Water", "Ice");

  // Change the Tower of Training dungeon
  const towerOfTrainingWaterFloor =
    MR2.DungeonFloors.getById("trainingTowerWater");
  towerOfTrainingWaterFloor.getFloorName = () => "Tower of Training (Ice)";

  // There are a lot more things that you'd need to do that are not covered here.
  // Some (but not all!) of them are the following:
  // Add / modify elemental shards, prisms, and jewels
  // Modify the Boost
  // Modify Elemental Orbs and Mastery Expeditions
  // Modify any events or event conditions that require Water
  // Modify Synchro bonuses
  // Account for all the enemy attacks or temporary effects that relate to Water as an Element.
  // For example, the Head Instructor Giselle boss uses Water elemental attacks,
  // and there is logic to clear Sear when Water damage is received.
  // Of course, add all the content of the new Element (spells, items, etc.)
}

export function loadElementOverrideTestMod(MR2: MR2Globals) {
  overrideWaterElement(MR2);
}
