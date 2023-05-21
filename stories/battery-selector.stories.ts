import { BatterySelector } from "../src/js/game-object/battery-selector";
import { ButtonLabel } from "../src/js/game-object/battery-selector/model/button-label";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub";

export default {
  title: "battery-selector",
};

/**
 * バッテリーセレクタのストーリー
 * @param maxBattery 最大バッテリー
 * @param label ボタンラベル
 * @return story
 */
const batterySelectorStory = (maxBattery: number, label: ButtonLabel) => () => {
  const stub = new HUDGameObjectStub(({ resources, gameObjectAction }) => {
    const selector: BatterySelector = new BatterySelector({
      resources: resources,
      gameObjectAction: gameObjectAction,
    });
    selector
      .open({
        initialValue: 1,
        maxBattery,
        enableMaxBattery: maxBattery,
        label,
      })
      .play();
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
    return [selector.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};

/** 攻撃 最大値5 */
export const attack5 = batterySelectorStory(5, "Attack");

/** 防御 最大値5 */
export const defense5 = batterySelectorStory(5, "Defense");

/** 攻撃 最大値4 */
export const attack4 = batterySelectorStory(4, "Attack");

/** 防御 最大値4 */
export const defense4 = batterySelectorStory(4, "Defense");

/** 攻撃 最大値8 */
export const attack8 = batterySelectorStory(8, "Attack");

/** 防御 最大値8 */
export const defense8 = batterySelectorStory(8, "Defense");
