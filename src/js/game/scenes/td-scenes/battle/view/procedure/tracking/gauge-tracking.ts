import * as THREE from "three";

import { toHUDCoordinate } from "../../../../../../../web-gl/tracking/to-hud-coordinate";
import { Gauge } from "../../../../../../game-object/gauge/gauge";
import { PredicatedDamage } from "../../../../../../game-object/predicated-damage";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z,
} from "../../../../../../game-object/td-position";
import { TrackingParams } from "./tracking-params";

/**
 * プレイヤー側ゲージのトラッキング
 * @param options オプション
 * @param options.gauge トラッキングするゲージ
 * @param options.predicatedDamage 予想ダメージオブジェクト
 * @param options.tdCamera 3Dレイヤーのカメラ
 * @param options.rendererDOM レンダラDOM
 * @returns 変換結果
 */
function playerGaugeTracking(options: {
  gauge: Gauge;
  predicatedDamage: PredicatedDamage;
  tdCamera: Readonly<THREE.PerspectiveCamera>;
  rendererDOM: Readonly<HTMLElement>;
}) {
  const { gauge, predicatedDamage, tdCamera, rendererDOM } = options;
  const origin = {
    x: ARMDOZER_EFFECT_STANDARD_X,
    y: ARMDOZER_EFFECT_STANDARD_Y + 200,
    z: ARMDOZER_EFFECT_STANDARD_Z,
  };
  const hudCoordinate = toHUDCoordinate(origin, tdCamera, rendererDOM);
  gauge.tracking(hudCoordinate);

  const gaugePosition = gauge.getObject3D().position;
  predicatedDamage.getObject3D().position.x = gaugePosition.x + 70;
  predicatedDamage.getObject3D().position.y = gaugePosition.y + 20;
}

/**
 * 敵側ゲージのトラッキング
 * @param options オプション
 * @param options.gauge トラッキングするゲージ
 * @param options.predicatedDamage 予想ダメージオブジェクト
 * @param options.tdCamera 3Dレイヤーのカメラ
 * @param options.rendererDOM レンダラDOM
 * @returns 変換結果
 */
function enemyGaugeTracking(options: {
  gauge: Gauge;
  predicatedDamage: PredicatedDamage;
  tdCamera: Readonly<THREE.PerspectiveCamera>;
  rendererDOM: Readonly<HTMLElement>;
}) {
  const { gauge, predicatedDamage, tdCamera, rendererDOM } = options;
  const origin = {
    x: -ARMDOZER_EFFECT_STANDARD_X,
    y: ARMDOZER_EFFECT_STANDARD_Y + 200,
    z: ARMDOZER_EFFECT_STANDARD_Z,
  };
  const hudCoordinate = toHUDCoordinate(origin, tdCamera, rendererDOM);
  gauge.tracking(hudCoordinate);

  const gaugePosition = gauge.getObject3D().position;
  predicatedDamage.getObject3D().position.x = gaugePosition.x + 150;
  predicatedDamage.getObject3D().position.y = gaugePosition.y + 20;
}

/**
 * ゲージのトラッキング
 * 本メソッドではゲージの相対位置となるダメージ予想の座標調整も行う
 * @param params パラメータ
 */
export function gaugeTracking(params: TrackingParams): void {
  const { td, hud, playerId, rendererDOM } = params;
  hud.players.forEach(
    ({ playerId: currentPlayerId, gauge, predicatedDamage }) => {
      const isPlayer = currentPlayerId === playerId;
      const tracking = isPlayer ? playerGaugeTracking : enemyGaugeTracking;
      const camera = td.camera.getCamera();
      tracking({ gauge, predicatedDamage, tdCamera: camera, rendererDOM });
    },
  );
}
