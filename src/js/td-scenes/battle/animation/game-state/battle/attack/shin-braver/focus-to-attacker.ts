import { all } from "../../../../../../../animation/all";
import { Animate } from "../../../../../../../animation/animate";
import { ShinBraver } from "../../../../../../../game-object/armdozer/shin-braver/shin-braver";
import { TDCamera } from "../../../../../../../game-object/camera/td";

/**
 * アタッカーにフォーカスを合わせる
 * @param camera カメラ
 * @param attacker スプライト
 * @returns アニメーション
 */
export function focusToAttacker(
  camera: TDCamera,
  attacker: ShinBraver,
): Animate {
  const duration = 400;
  const x = attacker.getObject3D().position.x * 0.6;
  const z = "-30";
  return all(
    camera.move({ x, z }, duration),
    camera.lookAt({ x, z }, duration),
  );
}
