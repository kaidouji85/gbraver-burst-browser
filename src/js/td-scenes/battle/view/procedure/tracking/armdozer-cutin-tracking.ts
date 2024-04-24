import * as THREE from "three";

import { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import { ARMDOZER_EFFECT_STANDARD_Y } from "../../../../../game-object/armdozer/position";
import { HUDCoordinate } from "../../../../../tracking/coordinate";
import { toHUDCoordinate } from "../../../../../tracking/to-hud-coordinate";
import { GenesisBraverHUD } from "../../hud/armdozer-objects/genesis-braver";
import { HUDArmdozerObjects } from "../../hud/armdozer-objects/hud-armdozer-objects";
import { LightningDozerHUD } from "../../hud/armdozer-objects/lightning-dozer";
import { NeoLandozerHUD } from "../../hud/armdozer-objects/neo-landozer";
import { ShinBraverHUD } from "../../hud/armdozer-objects/shin-braver";
import { WingDozerHUD } from "../../hud/armdozer-objects/wing-dozer";
import { TrackingParams } from "./tracking-params";

/**
 * アームドーザカットインを抽出する
 * @param hudArmdozer 取得元
 * @return 取得結果、抽出できない場合はnullを返す
 */
function extractArmdozerCutIn(
  hudArmdozer: Readonly<HUDArmdozerObjects>,
) {
  if (
    hudArmdozer instanceof ShinBraverHUD ||
    hudArmdozer instanceof NeoLandozerHUD ||
    hudArmdozer instanceof LightningDozerHUD ||
    hudArmdozer instanceof WingDozerHUD ||
    hudArmdozer instanceof GenesisBraverHUD
  ) {
    return hudArmdozer.cutIn;
  }

  return null;
}

/**
 * 3D座標系をHUD座標系に変換する
 * @param tdCamera 3Dレイヤーのカメラ
 * @param rendererDOM レンダラDOM
 * @param sprite トラッキングするスプライト
 * @return 変換結果
 */
function toCutInHUDPos(
  tdCamera: Readonly<THREE.PerspectiveCamera>,
  rendererDOM: Readonly<HTMLElement>,
  sprite: Readonly<ArmdozerSprite>,
): HUDCoordinate {
  const target = sprite.getObject3D();
  const tdPosition = {
    x: target.position.x,
    y: ARMDOZER_EFFECT_STANDARD_Y,
    z: target.position.z,
  };
  return toHUDCoordinate(tdPosition, tdCamera, rendererDOM);
}

/**
 * アームドーザカットインのトラッキング
 * @param params パラメータ
 */
export function armdozerCutInTracking(params: TrackingParams): void {
  const { td, hud, rendererDOM } = params;
  td.armdozers.forEach((tdArmdozer) => {
    const hudArmdozer = hud.armdozers.find(
      (a) => a.playerId === tdArmdozer.playerId,
    );
    if (!hudArmdozer) {
      return;
    }

    const cutIn = extractArmdozerCutIn(hudArmdozer);
    if (!cutIn) {
      return;
    }

    const hudCoordinate = toCutInHUDPos(
      td.camera.getCamera(),
      rendererDOM,
      tdArmdozer.sprite(),
    );
    cutIn.tracking(hudCoordinate);
  });
}
