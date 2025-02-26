import { Resources } from "../../../../resource";
import { AnimationMesh } from "./animation-mesh";
import { knockBack } from "./knock-back";
import { stand } from "./stand";
import { frontStep } from "./front-step";
import { tackleAttack } from "./tackle-attack";
import { tackleCharge } from "./tackle-charge";
import { tackleToStand } from "./tackle-to-stand";
import { backStep } from "./back-step";

/**
 * ビューで利用するすべてのメッシュを生成する
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function createAllMeshes(resources: Resources): AnimationMesh[] {
  return [
    ...stand(resources),
    ...tackleCharge(resources),
    ...tackleAttack(resources),
    ...tackleToStand(resources),
    ...frontStep(resources),
    ...backStep(resources),
    ...knockBack(resources),
  ];
}
