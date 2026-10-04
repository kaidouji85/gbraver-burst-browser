import { all } from "../../../../../../../animation/object-animation/all";
import { Animate } from "../../../../../../../animation/object-animation/animate";
import { LightningDozer } from "../../../../../../../game/game-object/armdozer/lightning-dozer/lightning-dozer";
import { TDCamera } from "../../../../../../../game/game-object/camera/td";

/**
 * アタッカーにフォーカスを合わせる
 * attentionArmdozerよりもカメラ移動は控えめ
 * @param camera カメラ
 * @param attacker アタッカーのスプライト
 * @returns アニメーション
 */
export function focusToAttacker(
  camera: TDCamera,
  attacker: LightningDozer,
): Animate {
  const duration = 400;
  const x = attacker.getObject3D().position.x * 0.6;
  const z = "-30";
  return all(
    camera.move({ x, z }, duration),
    camera.lookAt({ x, z }, duration),
  );
}
