import { Resources } from "../../../resource";
import { findTextureOrThrow } from "../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import { ResultIndicatorView } from "./result-indicator-view";
import { SimpleIndicatorView } from "./simple-result-indicator";

/**
 * DRAWビューを生成する
 *
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function drawIndicatorView(resources: Resources): ResultIndicatorView {
  const { texture } = findTextureOrThrow(resources, TEXTURE_IDS.DRAW);
  return new SimpleIndicatorView(texture, 150, 60);
}
