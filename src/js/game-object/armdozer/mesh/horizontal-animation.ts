import {
  HorizontalAnimationMesh,
  HorizontalAnimationMeshParam,
} from "../../../mesh/horizontal-animation";
import type { ArmdozerAnimation } from "./armdozer-animation";

/** createHorizontalAnimationのパラメータ */
type CreatorParam = HorizontalAnimationMeshParam;

/**
 * @deprecated
 * HorizontalArmdozerAnimationを生成する
 * @param param パラメータ
 * @returns 生成結果
 */
export function createHorizontalAnimation(
  param: CreatorParam,
): ArmdozerAnimation {
  return new HorizontalAnimationMesh(param);
}
