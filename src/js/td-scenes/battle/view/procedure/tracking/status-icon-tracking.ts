import * as THREE from "three";

import { StatusIcon } from "../../../../../game-object/status-icon";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z,
} from "../../../../../game-object/td-position";
import { toHUDCoordinate } from "../../../../../tracking/to-hud-coordinate";
import { TrackingParams } from "./tracking-params";

/** ステータスアイコン トラッキング オプション */
type StatusIconTrackingOptions = {
  /** ステータスアイコン */
  statusIcon: StatusIcon;
  /** 3Dレイヤーカメラ */
  tdCamera: THREE.PerspectiveCamera;
  /** レンダラのHTML要素 */
  rendererDOM: HTMLElement;
};

/**
 * ステータスアイコンのトラッキング（プレイヤー側）
 * @param options パラメータ
 */
function playerStatusIconTracking(options: StatusIconTrackingOptions) {
  const { statusIcon, tdCamera, rendererDOM } = options;
  const origin = {
    x: ARMDOZER_EFFECT_STANDARD_X - 80,
    y: ARMDOZER_EFFECT_STANDARD_Y + 80,
    z: ARMDOZER_EFFECT_STANDARD_Z,
  };
  const hudCoordinate = toHUDCoordinate(origin, tdCamera, rendererDOM);
  statusIcon.getObject3D().position.x = hudCoordinate.x;
  statusIcon.getObject3D().position.y = hudCoordinate.y;
}

/**
 * ステータスアイコンのトラッキング（敵側）
 * @param options パラメータ
 */
function enemyStatusIconTracking(options: StatusIconTrackingOptions) {
  const { statusIcon, tdCamera, rendererDOM } = options;
  const origin = {
    x: -ARMDOZER_EFFECT_STANDARD_X + 80,
    y: ARMDOZER_EFFECT_STANDARD_Y + 80,
    z: ARMDOZER_EFFECT_STANDARD_Z,
  };
  const hudCoordinate = toHUDCoordinate(origin, tdCamera, rendererDOM);
  statusIcon.getObject3D().position.x = hudCoordinate.x;
  statusIcon.getObject3D().position.y = hudCoordinate.y;
}

/**
 * ステータスアイコンのトラッキング
 * @param params パラメータ
 */
export function statusIconTracking(params: TrackingParams) {
  const { td, hud, rendererDOM, playerId } = params;
  hud.players.forEach(({ playerId: currentPlayerId, statusIcon }) => {
    const isPlayer = currentPlayerId === playerId;
    const trackingOptions = {
      tdCamera: td.camera.getCamera(),
      rendererDOM,
      statusIcon,
    };
    if (isPlayer) {
      playerStatusIconTracking(trackingOptions);
    } else {
      enemyStatusIconTracking(trackingOptions);
    }
  });
}
