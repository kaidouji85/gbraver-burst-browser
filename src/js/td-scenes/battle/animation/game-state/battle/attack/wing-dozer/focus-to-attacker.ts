import { all } from "../../../../../../../animation/all";
import { Animate } from "../../../../../../../animation/animate";
import { WingDozer } from "../../../../../../../game-object/armdozer/wing-dozer/wing-dozer";
import { TDCamera } from "../../../../../../../game-object/camera/td";

/**
 * アタッカーにフォーカスを合わせる
 * attentionArmdozerよりもカメラ移動は控えめ
 * @param camera カメラ
 * @param attacker アタッカーのスプライト
 * @returns アニメーション
 */
export function focusToAttacker(
  camera: TDCamera,
  attacker: WingDozer,
): Animate {
  const duration = 400;
  const x = attacker.getObject3D().position.x * 0.6;
  const z = "-20";
  return all(
    camera.move({ x, z }, duration),
    camera.lookAt({ x, z }, duration),
  );
}
