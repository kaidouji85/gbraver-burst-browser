import { Resources } from "../../../../resource";
import { AnimationMeshMapping } from "./animation-mesh-mapping";
import { backStep } from "./back-step";
import { down } from "./down";
import { frontStep } from "./front-step";
import { guard } from "./guard";
import { gutsDown } from "./guts-down";
import { gutsUp } from "./guts-up";
import { hmAttack } from "./hm-attack";
import { hmCharge } from "./hm-charge";
import { hmToStand } from "./hm-to-stand";
import { knockBack } from "./knock-back";
import { stand } from "./stand";

/**
 * ビューで利用するメッシュ群を生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createMeshes(resources: Resources): AnimationMeshMapping[] {
  return [
    ...stand(resources),
    ...knockBack(resources),
    ...guard(resources),
    ...hmCharge(resources),
    ...hmAttack(resources),
    ...hmToStand(resources),
    ...down(resources),
    ...gutsDown(resources),
    ...gutsUp(resources),
    ...backStep(resources),
    ...frontStep(resources),
  ];
}
