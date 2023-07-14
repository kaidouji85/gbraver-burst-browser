import { Resources } from "../../../../resource";
import { AnimationMeshMapping } from "./animation-mesh-mapping";
import { backStep } from "./back-step";
import { down } from "./down";
import { frontStep } from "./front-step";
import { guard } from "./guard";
import { gutsToStand } from "./gut-to-stand";
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
    ...hmCharge(resources),
    ...hmAttack(resources),
    ...hmToStand(resources),
    ...knockBack(resources),
    ...down(resources),
    ...gutsUp(resources),
    ...gutsDown(resources),
    ...gutsToStand(resources),
    ...guard(resources),
    ...backStep(resources),
    ...frontStep(resources),
  ];
}
