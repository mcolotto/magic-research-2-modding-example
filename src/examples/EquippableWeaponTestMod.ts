import { MR2Globals } from "magic-research-2-modding-sdk";
import { GameState } from "magic-research-2-modding-sdk/modding-decs/backend/GameState";
import { EquipmentSlot } from "magic-research-2-modding-sdk/modding-decs/backend/items/Equipment";
import { EquippableItem } from "magic-research-2-modding-sdk/modding-decs/backend/items/equipment/EquippableItem";
import { ItemParams } from "magic-research-2-modding-sdk/modding-decs/backend/items/Item";
import { Resource } from "magic-research-2-modding-sdk/modding-decs/backend/Resources";
import { SpellElement } from "magic-research-2-modding-sdk/modding-decs/backend/spells/Elements";

/**
 * This mod creates a basic equippable weapon.
 */
export function loadEquippableWeaponTestMod(MR2: MR2Globals) {
  // Define the weapon
  class SwordOfPower2 extends MR2.EquippableItem {
    getId(): string {
      return "swordOfPower2";
    }

    getSlot(): EquipmentSlot {
      return MR2.EquipmentSlot.Hand;
    }

    // It will be two handed
    getExtraSlots(): EquipmentSlot[] {
      return [MR2.EquipmentSlot.Accessory];
    }

    getPicture() {
      // The picture can be base64, or you can just require() it (see EnemyTestMod)
      return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAc1JREFUWIXd1r9rE2EYwPFP0i4SVwmttRRcBEsHwYqYoC62LvVvUBdxUAQXneoSHNS5iygOzoIoVRChcSm2g3UVaRCCBcEftEjAeg6Xi7wxtEkk5MezHHfP8z73fr/33nuXmhqb1KGIdsmnIN2puzcbwx3oGcG7T++Di5XiYfBkaRkUFo5HDJiBgPxzLgdmSt/BzUsxeXlub1y9EB8GwsCO5KqrPXnmE9mXweC+NhDByuP4ZCOfx7/kSd3E2dvxSd3u0JcGIlg9F5N+uTEOZkrfknxAPl4lN30ElG6dCep60kD9Hh4Qrc7FpE8Xs2C+0viZJ+SpozH5eh15Ej1lIIIHxVPgza9tcP90MSR/MQLmKz+TcQ3J09M7kyfRdQOpBv8DwRq4+DofJA/MroBX+0+C4sdFtE6eRE8aqI8IfjycBVdzV8CjE9fwl2Bf9iAorz2v9W5mAv1jYGg0/o5/LeSC5KF7Q6C89qzWs5UJ9LSBgHy7vBkkt64fA5k7y7Ve7UygpwwE7396NAN+l7dqtXVjI/7fRNcNDKsjSVc97LnbHNHm2w2QaXMCXTeQmhqbjOD8h3gHK1y4DEaW1ms1u/RI1s6AvQXaJGo1um7gD//AjOrFrfUXAAAAAElFTkSuQmCC";
    }

    getBaseName(params: ItemParams): string {
      return "Sword of Power 2";
    }

    getBaseSalePrice(state: GameState, params: ItemParams): number {
      return 9999999;
    }

    getDescription(state: GameState, params: ItemParams): string | undefined {
      return "A fool's item. Modded.";
    }

    getAttackBonusBase(params: ItemParams): number {
      return 120000;
    }
  }

  // Create the singleton...
  const swordOfPower2 = new SwordOfPower2();

  // We want this to be transmutable, so we need to create the spell
  class TransmuteSwordOfPower2 extends MR2.EquipmentTransmutationSpell {
    getItem(): EquippableItem {
      return swordOfPower2;
    }

    getCraftingElementLevelRequirements(): Partial<
      Record<SpellElement, number>
    > {
      return { Fire: 72 };
    }

    getCraftingMaterialsBase(state: GameState): {
      resources: Partial<Record<Resource, number>>;
      items: Record<string, number>;
    } {
      return {
        resources: {
          Mana: 50000,
          FireEssence: 1500000000,
        },
        items: {
          elementalJewelFire: 12200,
        },
      };
    }

    getElement(): SpellElement | undefined {
      return MR2.SpellElement.Fire;
    }
  }

  // Create the singleton for the spell
  const transmuteSwordOfPower2 = new TransmuteSwordOfPower2();

  // This registers both the item and the spell
  MR2.registerTransmutationSpellAndItem(transmuteSwordOfPower2);
}
