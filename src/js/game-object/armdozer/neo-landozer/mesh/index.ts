import { Resources } from "../../../../resource";
import { AnimationMesh } from "./animation-mesh";
import { backStep } from "./back-step";
import { bow } from "./bow";
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
import { upright } from "./upright";

/**
 * ビューで利用するすべてのメッシュを生成する
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function createAllMeshes(resources: Resources): AnimationMesh[] {
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
    ...upright(resources),
    ...bow(resources),
  ];
}
