import type { BattleSceneProps } from "../../props";

/**
 * バッテリーセレクタ プラス押下時の処理
 *
 * @param props 戦闘シーンプロパティ
 */
export const onPlusBattery = (props: BattleSceneProps): void => {
  props.exclusive.execute(async () => {
    props.view.hud.gameObjects.batterySelector.batteryPlus();
  });
};
