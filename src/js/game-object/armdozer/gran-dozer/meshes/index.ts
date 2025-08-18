import { Resources } from "../../../../resource";
import { AnimationMesh } from "./animation-mesh";
import { backStep } from "./back-step";
import { bow } from "./bow";
import { burstDown } from "./burst-down";
import { burstUp } from "./burst-up";
import { down } from "./down";
import { frontStep } from "./front-step";
import { guard } from "./guard";
import { knockBack } from "./knock-back";
import { stand } from "./stand";
import { tackleAttack } from "./tackle-attack";
import { tackleCharge } from "./tackle-charge";
import { tackleToBackStep } from "./tackle-to-back-step";
import { upright } from "./upright";

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
    ...tackleToBackStep(resources),
    ...burstUp(resources),
    ...burstDown(resources),
    ...frontStep(resources),
    ...backStep(resources),
    ...knockBack(resources),
    ...down(resources),
    ...guard(resources),
    ...upright(resources),
    ...bow(resources),
  ];
}
