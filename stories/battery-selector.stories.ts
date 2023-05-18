import { BatterySelector } from "../src/js/game-object/battery-selector";
import { ButtonLabel } from "../src/js/game-object/battery-selector/model/button-label";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub";

export default {
  title: "battery-selector",
};

/**
 * バッテリーセレクタのストーリー
 * @param initialValue 初期選択バッテリー
 * @param maxBattery 最大バッテリー
 * @param enableValue 選択可能な最大値
 * @param buttonLabel ボタンラベル
 * @return story
 */
const batterySelectorStory = (
  initialValue: number,
  maxBattery: number,
  enableValue: number,
  buttonLabel: ButtonLabel
) => () => {
  const stub = new HUDGameObjectStub(({ resources, gameObjectAction }) => {
    const selector: BatterySelector = new BatterySelector({
      resources: resources,
      gameObjectAction: gameObjectAction,
      maxBattery: maxBattery,
    });
    selector.open(initialValue, maxBattery, enableValue, buttonLabel).play();
    selector.notifyDecision().subscribe((event) => {
      event.preventDefault();
      event.stopPropagation();
      selector.decide().play();
      console.log(selector.getBattery());
    });
    selector.notifyBatteryPlus().subscribe(() => {
      selector.batteryPlus().play();
    });
    selector.notifyBatteryMinus().subscribe(() => {
      selector.batteryMinus().play();
    });
    return [selector.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};

/** 攻撃 最大値5 */
export const attack5 = batterySelectorStory(1, 5, 5, "Attack");

/** 防御 最大値5 */
export const defense5 = batterySelectorStory(1, 5, 5, "Defense");

/** 攻撃 最大値4 */
export const attack4 = batterySelectorStory(1, 4, 4, "Attack");

/** 防御 最大値4 */
export const defense4 = batterySelectorStory(1, 4, 4, "Defense");

/** 攻撃 最大値8 */
export const attack8 = batterySelectorStory(1, 8, 8, "Attack");

/** 防御 最大値8 */
export const defense8 = batterySelectorStory(1, 8, 8, "Defense");
