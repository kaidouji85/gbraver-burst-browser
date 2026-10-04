import { all } from "../../../../../../../animation/object-animation/all";
import { Animate } from "../../../../../../../animation/object-animation/animate";
import { GenesisBraver } from "../../../../../../../game/game-object/armdozer/genesis-braver/genesis-braver";
import { TDCamera } from "../../../../../../../game/game-object/camera/td";

/**
 * アタッカーにフォーカスを合わせる
 * @param camera カメラ
 * @param attacker スプライト
 * @returns アニメーション
 */
export function focusToAttacker(
  camera: TDCamera,
  attacker: GenesisBraver,
): Animate {
  const duration = 400;
  const x = attacker.getObject3D().position.x * 0.6;
  const z = "-30";
  return all(
    camera.move({ x, z }, duration),
    camera.lookAt({ x, z }, duration),
  );
}
