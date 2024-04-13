import { Observable } from "rxjs";

import { delay } from "../src/js/animation/delay";
import { GameObjectAction } from "../src/js/game-object/action/game-object-action";
import {
  enemyBatteryEnchantment,
  playerBatteryEnchantment,
} from "../src/js/game-object/battery-enchantment";
import { BatteryEnchantment } from "../src/js/game-object/battery-enchantment/battery-enchantment";
import { Resources } from "../src/js/resource";
import { TDGameObjectStub } from "./stub/td-game-object-stub";

export default {
  title: "battery-enchantment",
};

/**
 * バッテリー増強インジケータのストーリー
 * @param generator バッテリー増強インジケータ生成関数
 * @param fn バッテリー増強インジケータ操作関数
 * @return story
 */
const batteryEnchantmentStory =
  (
    generator: (params: {
      resources: Resources,
      gameObjectAction: Observable<GameObjectAction>,
    }) => BatteryEnchantment,
    fn: (batteryEnchantment: BatteryEnchantment) => void,
  ) =>
  () => {
    const stub = new TDGameObjectStub((params) => {
      const batteryEnchantment = generator(params);
      fn(batteryEnchantment);
      return {
        objects: [batteryEnchantment.getObject3D()],
      };
    });
    stub.start();
    return stub.domElement();
  };

/**
 * ポップアップ
 * @param batteryEnchantment バッテリー増強インジケータ
 */
const popUp = (batteryEnchantment: BatteryEnchantment) => {
  delay(1000).chain(batteryEnchantment.popUp()).loop();
};

/** プレイヤー バッテリー増強インジケータ ポップアップ */
export const playerPopUp = batteryEnchantmentStory(
  playerBatteryEnchantment,
  popUp,
);

/** 敵 バッテリー増強インジケータ ポップアップ */
export const enemyPopUP = batteryEnchantmentStory(
  enemyBatteryEnchantment,
  popUp,
);
