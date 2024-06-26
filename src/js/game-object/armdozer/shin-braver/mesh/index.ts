import { Resources } from "../../../../resource";
import { AnimationMesh } from "./animation-mesh";
import { backStep } from "./back-step";
import { bow } from "./bow";
import { burstDown } from "./burst-down";
import { burstUp } from "./burst-up";
import { down } from "./down";
import { frontStep } from "./front-step";
import { guard } from "./guard";
import { gutsDown } from "./guts-down";
import { gutsUp } from "./guts-up";
import { knockBack } from "./knock-back";
import { spAttack } from "./sp-attack";
import { spCharge } from "./sp-charge";
import { spToStand } from "./sp-to-stand";
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
    ...spCharge(resources),
    ...spAttack(resources),
    ...spToStand(resources),
    ...knockBack(resources),
    ...guard(resources),
    ...down(resources),
    ...gutsUp(resources),
    ...gutsDown(resources),
    ...burstUp(resources),
    ...burstDown(resources),
    ...backStep(resources),
    ...frontStep(resources),
    ...upright(resources),
    ...bow(resources),
  ];
}
