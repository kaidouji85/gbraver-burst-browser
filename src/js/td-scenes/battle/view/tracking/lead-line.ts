import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z,
} from "../../../../game-object/armdozer/position";
import { Coordinate, toHUDCoordinate } from "../../../../tracking/coordinate";
import { HudLayer } from "../hud";
import { ThreeDimensionLayer } from "../td";

/** 引き出し線が指し示す3Dレイヤー座標 */
const targetTDCoordinate = {
  x: ARMDOZER_EFFECT_STANDARD_X - 30,
  y: ARMDOZER_EFFECT_STANDARD_Y + 30,
  z: ARMDOZER_EFFECT_STANDARD_Z,
};

/**
 * バッテリーセレクタ引き出し線をトラッキングする
 * @param td 3Dレイヤー
 * @param hud HUDレイヤー
 * @param targetHUDCoordinate 引き出し線が指し示すHUDレイヤー座標
 */
function trackingBatterySelectorLeadLine(
  td: Readonly<ThreeDimensionLayer>,
  hud: Readonly<HudLayer>,
  targetHUDCoordinate: Readonly<Coordinate>,
): void {
  const batterySelectorPosition =
    hud.gameObjects.batterySelector.getObject3D().position;
  const startHUDCoordinate = {
    x: batterySelectorPosition.x,
    y: batterySelectorPosition.y,
  };
  hud.gameObjects.batterySelectorLeadLine.set(
    startHUDCoordinate,
    targetHUDCoordinate,
  );
  hud.gameObjects.batterySelectorLeadLine.getObject3D().position.z =
    batterySelectorPosition.z - 0.1;
}

/**
 * バーストボタン引き出し線をトラッキングする
 * @param td 3Dレイヤー
 * @param hud HUDレイヤー
 * @param targetHUDCoordinate 引き出し線が指し示すHUDレイヤー座標
 */
function trackingBurstButtonLeadLine(
  td: Readonly<ThreeDimensionLayer>,
  hud: Readonly<HudLayer>,
  targetHUDCoordinate: Readonly<Coordinate>,
): void {
  const burstButtonPosition =
    hud.gameObjects.burstButton.getObject3D().position;
  const startHUDCoordinate = {
    x: burstButtonPosition.x,
    y: burstButtonPosition.y,
  };
  hud.gameObjects.burstButtonLeadLine.set(
    startHUDCoordinate,
    targetHUDCoordinate,
  );
  hud.gameObjects.burstButtonLeadLine.getObject3D().position.z =
    burstButtonPosition.z - 0.1;
}

/**
 * パイロットボタン引き出し線をトラッキングする
 * @param td 3Dレイヤー
 * @param hud HUDレイヤー
 * @param targetHUDCoordinate 引き出し線が指し示すHUDレイヤー座標
 */
function trackingPilotButtonLeadLine(
  td: Readonly<ThreeDimensionLayer>,
  hud: Readonly<HudLayer>,
  targetHUDCoordinate: Readonly<Coordinate>,
): void {
  const pilotButtonPosition =
    hud.gameObjects.pilotButton.getObject3D().position;
  const startHUDCoordinate = {
    x: pilotButtonPosition.x,
    y: pilotButtonPosition.y,
  };
  hud.gameObjects.pilotButtonLeadLine.set(
    startHUDCoordinate,
    targetHUDCoordinate,
  );
  hud.gameObjects.pilotButtonLeadLine.getObject3D().position.z =
    pilotButtonPosition.z - 0.1;
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
  rendererDOM: Readonly<HTMLElement>,
): void {
  const targetHUDCoordinate = toHUDCoordinate(
    targetTDCoordinate,
    td.camera.getCamera(),
    rendererDOM,
  );
  trackingBatterySelectorLeadLine(td, hud, targetHUDCoordinate);
  trackingBurstButtonLeadLine(td, hud, targetHUDCoordinate);
  trackingPilotButtonLeadLine(td, hud, targetHUDCoordinate);
}
