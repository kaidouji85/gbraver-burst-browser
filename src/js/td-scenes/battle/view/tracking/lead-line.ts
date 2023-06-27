import {ThreeDimensionLayer} from "../td";
import {HudLayer} from "../hud";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z
} from "../../../../game-object/armdozer/position";
import {toHUDCoordinate} from "../../../../tracking/coordinate";

/** 引き出し線が指し示す3Dレイヤー座標 */
const targetTDCoordinate = {
  x: ARMDOZER_EFFECT_STANDARD_X,
  y: ARMDOZER_EFFECT_STANDARD_Y,
  z: ARMDOZER_EFFECT_STANDARD_Z,
};

/**
 * バーストボタン引き出し線をトラッキングする
 * @param td 3Dレイヤー
 * @param hud HUDレイヤー
 * @param rendererDOM レンダラDOM
 */
function trackingBurstButton(
  td: Readonly<ThreeDimensionLayer>,
  hud: Readonly<HudLayer>,
  rendererDOM: Readonly<HTMLElement>
): void {
  const targetHUDCoordinate = toHUDCoordinate(
    targetTDCoordinate,
    td.camera.getCamera(),
    rendererDOM
  );
  const burstButtonPosition = hud.gameObjects.burstButton.getObject3D().position;
  const startHUDCoordinate = {
    x: burstButtonPosition.x,
    y: burstButtonPosition.y,
  };
  hud.gameObjects.burstButtonLeadLine.set(startHUDCoordinate, targetHUDCoordinate);
}

/**
 * 引き出し線をトラッキングする
 * @param td 3Dレイヤー
 * @param hud HUDレイヤー
 * @param rendererDOM レンダラDOM
 */
export function trackingLeadLine(
  td: Readonly<ThreeDimensionLayer>,
  hud: Readonly<HudLayer>,
  rendererDOM: Readonly<HTMLElement>
): void {
  trackingBurstButton(td, hud, rendererDOM);
}
