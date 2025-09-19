import { ArmdozerId, ArmdozerIds } from "gbraver-burst-core";

import { BatterySelector } from "../src/js/game-object/battery-selector";
import { ButtonLabel } from "../src/js/game-object/battery-selector/model/button-label";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "battery-selector",
};

/**
 * バッテリーセレクタストーリー
 * @param fn バッテリーセレクタ操作関数
 * @returns story
 */
const batterySelectorStory = (
  fn: (selector: BatterySelector) => void,
  armdozerId: ArmdozerId = ArmdozerIds.SHIN_BRAVER,
) =>
  hudGameObjectStory((params) => {
    const selector: BatterySelector = new BatterySelector({
      ...params,
      armdozerId,
    });
    fn(selector);
    return [selector.getObject3D()];
  });

/**
 * バッテリーセレクタを操作可能な状態に設定する
 * @param maxBattery 最大バッテリー
 * @param label ボタンラベル
 * @returns バッテリーセレクタ操作関数
 */
const enabled =
  (maxBattery: number, label: ButtonLabel) =>
  async (selector: BatterySelector) => {
    selector.notifyDecision().subscribe((event) => {
      event.preventDefault();
      event.stopPropagation();
      selector.decide().play();
      console.log(selector.getBattery());
    });
    selector.notifyBatteryPlus().subscribe(() => {
      selector.batteryPlus();
    });
    selector.notifyBatteryMinus().subscribe(() => {
      selector.batteryMinus();
    });
    await selector
      .open({
        initialValue: 1,
        maxBattery,
        enableMaxBattery: maxBattery,
        label,
      })
      .play();
  };

/** 攻撃 最大値5 */
export const attack5 = batterySelectorStory(enabled(5, "Attack"));

/** 防御 最大値5 */
export const defense5 = batterySelectorStory(enabled(5, "Defense"));

/** 攻撃 最大値4 */
export const attack4 = batterySelectorStory(enabled(4, "Attack"));

/** 防御 最大値4 */
export const defense4 = batterySelectorStory(enabled(4, "Defense"));

/** 攻撃 最大値8 */
export const attack8 = batterySelectorStory(enabled(8, "Attack"));

/** 防御 最大値8 */
export const defense8 = batterySelectorStory(enabled(8, "Defense"));

/**
 * バッテリーセレクタを操作不可能な状態に設定する
 * @param maxBattery 最大バッテリー
 * @param label ボタンラベル
 * @returns バッテリーセレクタ操作関数
 */
const disabled =
  (maxBattery: number, label: ButtonLabel) =>
  async (selector: BatterySelector) => {
    await enabled(maxBattery, label)(selector);
    selector.disabled(true);
  };

/** 攻撃 最大値5 操作不可能 */
export const attack5Disabled = batterySelectorStory(disabled(5, "Attack"));

/**
 * バッテリー値設定
 * @param battery 設定値
 * @param maxBattery 最大バッテリー
 * @param label ボタンラベル
 * @returns バッテリーセレクタ操作関数
 */
const toBattery =
  (battery: number, maxBattery: number, label: ButtonLabel) =>
  async (selector: BatterySelector) => {
    await enabled(maxBattery, label)(selector);
    selector.toBatterySilently(battery);
  };

/** 5に設定 最大値5 */
export const attackTo5 = batterySelectorStory(toBattery(5, 5, "Attack"));
