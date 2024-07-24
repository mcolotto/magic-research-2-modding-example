import { MR2Globals } from "magic-research-2-modding-sdk";

export function loadWorldsMaxDifficultyTestMod(MR2: MR2Globals) {
  // Set the max difficulty level and max boon level
  MR2.NewGamePlus.MAX_DIFFICULTY_LEVEL = 100;
  MR2.NewGamePlus.MAX_BOON_LEVEL = 100;
  MR2.NewGamePlus.getIncrementalPointsRequiredForLevel = (level) => 1;
  // Do not require people to continue to beat levels to jump to max difficulty
  MR2.NewGamePlus.getMaxPossibleDifficultyLevel = (state) =>
    MR2.NewGamePlus.MAX_DIFFICULTY_LEVEL;

  // Override stats for difficulty levels > D11
  const oldFn1 = MR2.NewGamePlus.getNewGamePlusAccuracyAndDodgeMultiplier;
  MR2.NewGamePlus.getNewGamePlusAccuracyAndDodgeMultiplier = (
    difficultyLevel: number,
  ) => {
    if (difficultyLevel <= 11) {
      return oldFn1(difficultyLevel);
    }
    return oldFn1(11) * Math.pow(1.1, difficultyLevel - 11);
  };
  const oldFn2 = MR2.NewGamePlus.getNewGamePlusAttackDelayMultiplier;
  MR2.NewGamePlus.getNewGamePlusAttackDelayMultiplier = (
    difficultyLevel: number,
  ) => {
    if (difficultyLevel <= 11) {
      return oldFn2(difficultyLevel);
    }
    return oldFn2(11) * Math.pow(0.9, difficultyLevel - 11);
  };
  const oldFn3 = MR2.NewGamePlus.getNewGamePlusHpMultiplier;
  MR2.NewGamePlus.getNewGamePlusHpMultiplier = (difficultyLevel: number) => {
    if (difficultyLevel <= 11) {
      return oldFn3(difficultyLevel);
    }
    return oldFn3(11) * Math.pow(1.6, difficultyLevel - 11);
  };
  const oldFn4 = MR2.NewGamePlus.getNewGamePlusOtherStatMultiplier;
  MR2.NewGamePlus.getNewGamePlusOtherStatMultiplier = (
    difficultyLevel: number,
  ) => {
    if (difficultyLevel <= 11) {
      return oldFn4(difficultyLevel);
    }
    return oldFn4(11) * Math.pow(1.3, difficultyLevel - 11);
  };

  // Remove outdated warnings
  MR2.registerStringOverride(
    " **And if you clear the World, you may unlock something special...**",
    "",
  );
  MR2.registerStringOverride(
    " **This is the maximum World Difficulty! Some Challenges may not be possible. Good luck!**",
    "",
  );
  MR2.registerStringOverride(
    ' You can access higher difficulties by traveling to a new World and reaching the ending "To Save a Life".',
    "",
  );
}
