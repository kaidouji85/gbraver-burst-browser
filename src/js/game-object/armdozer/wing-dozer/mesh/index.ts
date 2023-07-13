import { Resources } from "../../../../resource";
import { AnimationMeshMapping } from "./animation-mesh-mapping";
import { backStep } from "./back-step";
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

/**
 * ビューで利用するメッシュ群を生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createMeshes(resources: Resources): AnimationMeshMapping[] {
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
  ];
}