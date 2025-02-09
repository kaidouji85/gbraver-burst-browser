import { Resources } from "../../../../resource";
import { AnimationMesh } from "./animation-mesh";
import { hmAttack } from "./hm-attack";
import { hmCharge } from "./hm-charge";
import { hmToStand } from "./hm-to-stand";
import { stand } from "./stand";
import { tackle } from "./tackle";

/**
 * ビューで利用するすべてのメッシュを生成する
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function createAllMeshes(resources: Resources): AnimationMesh[] {
  return [
    ...stand(resources),
    ...hmCharge(resources),
    ...hmAttack(resources),
    ...hmToStand(resources),
    ...tackle(resources),
  ];
}
