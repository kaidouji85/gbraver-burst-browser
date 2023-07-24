import {
  HorizontalAnimationMesh,
  HorizontalAnimationMeshConstructParam,
} from "../../../mesh/horizontal-animation";
import type { ArmdozerAnimation } from "./armdozer-animation";

/** createHorizontalAnimationのパラメータ */
type CreatorParam = HorizontalAnimationMeshConstructParam;

/**
 * HorizontalArmdozerAnimationを生成する
 * @param param パラメータ
 * @return 生成結果
 */
export function createHorizontalAnimation(
  param: CreatorParam,
): ArmdozerAnimation {
  return new HorizontalAnimationMesh(param);
}
