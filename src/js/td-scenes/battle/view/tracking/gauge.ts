import * as THREE from "three";

import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z,
} from "../../../../game-object/armdozer/position";
import type { Coordinate } from "../../../../tracking/coordinate";
import { toHUDCoordinate } from "../../../../tracking/coordinate";
import type { HUDTracking } from "../../../../tracking/hud-tracking";
import { HUDPlayer } from "../hud/player";
import { TrackingParams } from "./tracking-params";

/**
 * ゲージをトラッキングする
 * @param params パラメータ
 */
export function trackingGauges(params: TrackingParams): void {
  const { td, hud, activePlayerId, rendererDOM } = params;
  hud.players.forEach((hudPlayer) => {
    const isActivePlayer = hudPlayer.playerId === activePlayerId;
    const hudPosition = isActivePlayer
      ? toPlayerGaugeHUDPos(td.camera.getCamera(), rendererDOM)
      : toEnemyGaugeHUDPos(td.camera.getCamera(), rendererDOM);
    const tracks = getTracksFromHUDPlayer(hudPlayer);
    tracks.forEach((v) => {
      v.tracking(hudPosition.x, hudPosition.y);
    });
  });
}

/**
 * HUDプレイヤーオブジェクトからトラッキング対象を取得する
 *
 * @param hudPlayer HUDプレイヤーオブジェクト
 * @return 取得結果
 */
function getTracksFromHUDPlayer(hudPlayer: Readonly<HUDPlayer>): HUDTracking[] {
  return [hudPlayer.gauge];
}

/**
 * プレイヤーゲージ用に3D系座標をHUD系座標に変換する
 *
 * @param tdCamera 3Dレイヤーのカメラ
 * @param rendererDOM レンダラDOM
 * @return 変換結果
 */
function toPlayerGaugeHUDPos(
  tdCamera: Readonly<THREE.PerspectiveCamera>,
  rendererDOM: Readonly<HTMLElement>,
): Coordinate {
  const tdCoordinate = {
    x: ARMDOZER_EFFECT_STANDARD_X,
    y: ARMDOZER_EFFECT_STANDARD_Y + 200,
    z: ARMDOZER_EFFECT_STANDARD_Z,
  };
  return toHUDCoordinate(tdCoordinate, tdCamera, rendererDOM);
}

/**
 * 敵ゲージ用に3D系座標をHUD系座標に変換する
 *
 * @param tdCamera 3Dレイヤーのカメラ
 * @param rendererDOM レンダラDOM
 * @return 変換結果
 */
function toEnemyGaugeHUDPos(
  tdCamera: Readonly<THREE.PerspectiveCamera>,
  rendererDOM: Readonly<HTMLElement>,
): Coordinate {
  const tdCoordinate = {
    x: -ARMDOZER_EFFECT_STANDARD_X,
    y: ARMDOZER_EFFECT_STANDARD_Y + 200,
    z: ARMDOZER_EFFECT_STANDARD_Z,
  };
  return toHUDCoordinate(tdCoordinate, tdCamera, rendererDOM);
}
