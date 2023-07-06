import { Resources } from "../../../../resource";
import { lightningDozerOutlineGuard } from "../mesh/guard";
import { lightningDozerOutlineGutsToStand } from "../mesh/gut-to-stand";
import { lightningDozerOutlineGutsDown } from "../mesh/guts-down";
import { lightningDozerOutlineGutsUp } from "../mesh/guts-up";
import { lightningDozerOutlineKnockBack } from "../mesh/knock-back";
import { lightningDozerOutlineStand } from "../mesh/stand";
import { AnimationMeshMapping } from "./animation-mesh-mapping";

/**
 * アウトラインアニメーションメッシュマッピングを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createOutlineMeshes(
  resources: Resources
): AnimationMeshMapping[] {
  return [
    {
      type: "KNOCK_BACK",
      mesh: lightningDozerOutlineKnockBack(resources),
    },
    {
      type: "GUTS_UP",
      mesh: lightningDozerOutlineGutsUp(resources),
    },
    {
      type: "GUTS_DOWN",
      mesh: lightningDozerOutlineGutsDown(resources),
    },
    {
      type: "GUTS_TO_STAND",
      mesh: lightningDozerOutlineGutsToStand(resources),
    },
    {
      type: "GUARD",
      mesh: lightningDozerOutlineGuard(resources),
    },
    {
      type: "STAND",
      mesh: lightningDozerOutlineStand(resources)
    },
  ];
}