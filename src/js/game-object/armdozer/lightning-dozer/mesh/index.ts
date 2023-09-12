import { Resources } from "../../../../resource";
import { AnimationMesh } from "./animation-mesh";
import { backStep } from "./back-step";
import { bow } from "./bow";
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
import { upright } from "./upright";

/**
 * ビューで利用するすべてのメッシュを生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createAllMeshes(resources: Resources): AnimationMesh[] {
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
    ...upright(resources),
    ...bow(resources),
  ];
}
