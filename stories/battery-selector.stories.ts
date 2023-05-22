import { BatterySelector } from "../src/js/game-object/battery-selector";
import { ButtonLabel } from "../src/js/game-object/battery-selector/model/button-label";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub";

export default {
  title: "battery-selector",
};

/**
 * バッテリーセレクタストーリー
 * @param fn バッテリーセレクタ操作関数
 * @return story
 */
const batterySelectorStory = (
  fn: (selector: BatterySelector) => void
) => () => {
  const stub = new HUDGameObjectStub(({ resources, gameObjectAction }) => {
    const selector: BatterySelector = new BatterySelector({
      resources: resources,
      gameObjectAction: gameObjectAction,
    });
    fn(selector);
    return [selector.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};

/**
 * バッテリーセレクタを操作可能な状態に設定する
 * @param maxBattery 最大バッテリー
 * @param label ボタンラベル
 * @return バッテリーセレクタ操作関数
 */
const operateSelector = (
  maxBattery: number, 
  label: ButtonLabel
) => (
  selector: BatterySelector
) => {
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
};

/** 攻撃 最大値5 */
export const attack5 = batterySelectorStory(operateSelector(5, "Attack"));

/** 防御 最大値5 */
export const defense5 = batterySelectorStory(operateSelector(5, "Defense"));

/** 攻撃 最大値4 */
export const attack4 = batterySelectorStory(operateSelector(4, "Attack"));

/** 防御 最大値4 */
export const defense4 = batterySelectorStory(operateSelector(4, "Defense"));

/** 攻撃 最大値8 */
export const attack8 = batterySelectorStory(operateSelector(8, "Attack"));

/** 防御 最大値8 */
export const defense8 = batterySelectorStory(operateSelector(8, "Defense"));