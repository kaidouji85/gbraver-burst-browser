// @flow

import type { BattleSceneProps } from "../battle-scene-props";

/**
 * バッテリーセレクタ マイナス押下時の処理
 *
 * @param props 戦闘シーンプロパティ
 */
export const onMinusBattery = (props: BattleSceneProps): void => {
  props.exclusive.execute(async () => {
    props.view.hud.gameObjects.batterySelector.batteryMinus().play();
  });
};
