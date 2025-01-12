import { all } from "../../../../../../../animation/all";
import { Animate } from "../../../../../../../animation/animate";
import { NeoLandozer } from "../../../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import { TDCamera } from "../../../../../../../game-object/camera/td";

/**
 * アタッカーにフォーカスを合わせる
 * @param camera カメラ
 * @param attacker アタッカーのスプライト
 * @returns アニメーション
 */
export function focusToAttacker(
  camera: TDCamera,
  attacker: NeoLandozer,
): Animate {
  const duration = 400;
  const x = attacker.getObject3D().position.x * 0.6;
  const z = "-30";
  return all(
    camera.move({ x, z }, duration),
    camera.lookAt({ x, z }, duration),
  );
}
