import * as THREE from "three";

import { toHUDCoordinate } from "../../../../../../../web-gl/tracking/to-hud-coordinate";
import { PredicatedDamage } from "../../../../../../game-object/predicated-damage";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z,
} from "../../../../../../game-object/td-position";
import { TrackingParams } from "./tracking-params";

/**
 * プレイヤーダメージ予想のトラッキング
 * @param options オプション
 * @param options.predicatedDamage 予想ダメージオブジェクト
 * @param options.camera カメラ
 * @param options.rendererDOM レンダラーのDOM要素
 */
const playerPredicatedDamageTracking = (options: {
  predicatedDamage: PredicatedDamage;
  camera: THREE.PerspectiveCamera;
  rendererDOM: HTMLElement;
}): void => {
  const { predicatedDamage, camera, rendererDOM } = options;
  const origin = {
    x: ARMDOZER_EFFECT_STANDARD_X - 150,
    y: ARMDOZER_EFFECT_STANDARD_Y + 200,
    z: ARMDOZER_EFFECT_STANDARD_Z,
  };
  const hudCoordinate = toHUDCoordinate(origin, camera, rendererDOM);
  predicatedDamage.getObject3D().position.x = hudCoordinate.x;
  predicatedDamage.getObject3D().position.y = hudCoordinate.y;
};

/**
 * 敵プレイヤーダメージ予想のトラッキング
 * @param options オプション
 * @param options.predicatedDamage 予想ダメージオブジェクト
 * @param options.camera カメラ
 * @param options.rendererDOM レンダラーのDOM要素
 */
const enemyPredicatedDamageTracking = (options: {
  predicatedDamage: PredicatedDamage;
  camera: THREE.PerspectiveCamera;
  rendererDOM: HTMLElement;
}): void => {
  const { predicatedDamage, camera, rendererDOM } = options;
  const origin = {
    x: -ARMDOZER_EFFECT_STANDARD_X + 100,
    y: ARMDOZER_EFFECT_STANDARD_Y + 200,
    z: ARMDOZER_EFFECT_STANDARD_Z,
  };
  const hudCoordinate = toHUDCoordinate(origin, camera, rendererDOM);
  predicatedDamage.getObject3D().position.x = hudCoordinate.x;
  predicatedDamage.getObject3D().position.y = hudCoordinate.y;
};

/**
 * 予想ダメージのトラッキング
 * @param params パラメータ
 */
export function predicatedDamageTracking(params: TrackingParams) {
  const { td, hud, rendererDOM, playerId } = params;
  hud.players.forEach(({ playerId: currentPlayerId, predicatedDamage }) => {
    const isPlayer = currentPlayerId === playerId;
    const func = isPlayer
      ? playerPredicatedDamageTracking
      : enemyPredicatedDamageTracking;
    func({ predicatedDamage, camera: td.camera.getCamera(), rendererDOM });
  });
}
