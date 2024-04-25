import { Resources } from "../../../../resource";
import { AnimationMesh } from "./animation-mesh";
import { backStep } from "./back-step";
import { bow } from "./bow";
import { dashDown } from "./dash-down";
import { dashToStand } from "./dash-to-stand";
import { dashUp } from "./dash-up";
import { down } from "./down";
import { frontStep } from "./front-step";
import { guard } from "./guard";
import { knockBack } from "./knock-back";
import { stand } from "./stand";
import { upperAttack } from "./upper-attack";
import { upperCharge } from "./upper-charge";
import { upperToStand } from "./upper-to-stand";
import { upright } from "./upright";

/**
 * ビューで利用するすべてのメッシュを生成する
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function createAllMeshes(resources: Resources): AnimationMesh[] {
  return [
    ...stand(resources),
    ...upperCharge(resources),
    ...upperAttack(resources),
    ...upperToStand(resources),
    ...dashUp(resources),
    ...dashDown(resources),
    ...dashToStand(resources),
    ...knockBack(resources),
    ...down(resources),
    ...backStep(resources),
    ...frontStep(resources),
    ...guard(resources),
    ...upright(resources),
    ...bow(resources),
  ];
}
