import { MR2Globals } from "magic-research-2-modding-sdk";
import {
  BattlerAction,
  BattlerStats,
  EnemyLoot,
} from "magic-research-2-modding-sdk/modding-decs/backend/exploration/enemies/Enemy";
import { GameState } from "magic-research-2-modding-sdk/modding-decs/backend/GameState";

export function loadEnemyTestMod(MR2: MR2Globals) {
  class StickFigure extends MR2.Enemy {
    getId() {
      return "mr2-test-mods-stickFigure";
    }

    getName(): string {
      return "Stick Figure";
    }

    getBaseStats(): BattlerStats {
      return {
        maxHP: 100,
        attack: 10,
        defense: 20,
        attackDelay: 0.5,
        accuracy: 100,
        dodge: 100,
        crit: 0,
      };
    }

    getPicture(state: GameState) {
      return require("./stickFigure.png");
    }
    getLevel(): number {
      return 5;
    }
    getCoinsAwardedBase(state: GameState): number {
      return 10;
    }
    getMonstiumAwardedBase(state: GameState): number {
      return 10;
    }

    getItemsAwardedBase(state: GameState): EnemyLoot[] {
      return [
        {
          itemId: "glaive",
          amount: 1,
          chance: 0.05,
        },
      ];
    }

    getNextAction(state: GameState): BattlerAction {
      if (
        !MR2.hasTemporaryEffect(state, "haste", MR2.AttackTarget.Enemy) &&
        MR2.getCurrentEnemyHPFraction(state) < 0.5
      ) {
        return {
          name: "Haste",
          delay: this.getAttackDelay(state) * 1.0,
          transform: MR2.grantTemporaryEffect("haste", 15, {
            target: MR2.AttackTarget.Enemy,
            params: { commonBuff: { AttackDelayMultiplier: 0.85 } },
          }),
        };
      }
      if (Math.random() < 0.3) {
        return {
          name: "Air Blast",
          delay: this.getAttackDelay(state) * 1.3,
          transform: (state) =>
            MR2.standardEnemyAttackEffect(state, this.getAttack(state) * 1.3, {
              tags: [MR2.SpellElement.Air],
              cause: "Air Blast",
            }),
        };
      }
      return {
        name: "Attack",
        delay: this.getAttackDelay(state),
        transform: (state) =>
          MR2.standardEnemyAttackEffect(state, this.getAttack(state)),
      };
    }
  }

  const stickFigure = new StickFigure();

  MR2.Enemies.register(stickFigure);

  // Modify the spawn rates in the Training Tower Water
  const NEW_EXPLORATION_POSSIBILITIES = [
    {
      weight: 100,
      transforms: MR2.encounterEnemy(MR2.Enemies.getById("slime")),
    },
    {
      weight: 150,
      transforms: MR2.encounterEnemy(stickFigure),
    },
  ];
  const trainingTowerWater = MR2.DungeonFloors.getById("trainingTowerWater");
  trainingTowerWater.getBaseExplorationPossibilities = (state: GameState) => {
    return NEW_EXPLORATION_POSSIBILITIES;
  };
}
