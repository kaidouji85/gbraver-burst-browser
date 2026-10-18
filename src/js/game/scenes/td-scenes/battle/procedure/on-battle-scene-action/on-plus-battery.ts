import { BattleSceneProps } from "../../props";
import { updatePredicatedDamage } from "../predicated-damage";

/**
 * バッテリーセレクタ プラス押下時の処理
 * @param props 戦闘シーンプロパティ
 */
export const onPlusBattery = (props: BattleSceneProps): void => {
  props.exclusive.execute(async () => {
    const nextPlayerBattery =
      props.view.hud.gameObjects.batterySelector.getBattery() + 1;
    props.view.hud.gameObjects.batterySelector.batteryPlus();
    updatePredicatedDamage(props, nextPlayerBattery);
  });
};
