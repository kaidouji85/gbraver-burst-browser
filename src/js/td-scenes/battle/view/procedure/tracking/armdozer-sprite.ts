import * as THREE from "three";

import { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import { ARMDOZER_EFFECT_STANDARD_Y } from "../../../../../game-object/armdozer/position";
import { HUDCoordinate } from "../../../../../tracking/coordinate";
import { HUDTracking } from "../../../../../tracking/hud-tracking";
import { toHUDCoordinate } from "../../../../../tracking/to-hud-coordinate";
import { GenesisBraverHUD } from "../../hud/armdozer-objects/genesis-braver";
import { HUDArmdozerObjects } from "../../hud/armdozer-objects/hud-armdozer-objects";
import { LightningDozerHUD } from "../../hud/armdozer-objects/lightning-dozer";
import { NeoLandozerHUD } from "../../hud/armdozer-objects/neo-landozer";
import { ShinBraverHUD } from "../../hud/armdozer-objects/shin-braver";
import { WingDozerHUD } from "../../hud/armdozer-objects/wing-dozer";
import { TrackingParams } from "./tracking-params";

/**
 * アームドーザスプライトをトラッキングする
 * @param params パラメータ
 */
export function trackingArmdozerSprites(params: TrackingParams): void {
  const { td, hud, rendererDOM } = params;
  td.armdozers.forEach((tdArmdozer) => {
    const hudArmdozer = hud.armdozers.find(
      (v) => v.playerId === tdArmdozer.playerId,
    );

    if (!hudArmdozer) {
      return;
    }

    const tracks = getTracksFromHUDArmdozer(hudArmdozer);
    tracks.forEach((v) => {
      const position = toCutInHUDPos(
        td.camera.getCamera(),
        rendererDOM,
        tdArmdozer.sprite(),
      );
      v.tracking(position);
    });
  });
}

/**
 * HUDアームドーザからHUDTrackingを取得する
 * @param hudArmdozer 取得元
 * @return 取得結果
 */
function getTracksFromHUDArmdozer(
  hudArmdozer: Readonly<HUDArmdozerObjects>,
): HUDTracking[] {
  if (hudArmdozer instanceof ShinBraverHUD) {
    return [hudArmdozer.cutIn];
  }

  if (hudArmdozer instanceof NeoLandozerHUD) {
    return [hudArmdozer.cutIn];
  }

  if (hudArmdozer instanceof LightningDozerHUD) {
    return [hudArmdozer.cutIn];
  }

  if (hudArmdozer instanceof WingDozerHUD) {
    return [hudArmdozer.cutIn];
  }

  if (hudArmdozer instanceof GenesisBraverHUD) {
    return [hudArmdozer.cutIn];
  }

  return [];
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
