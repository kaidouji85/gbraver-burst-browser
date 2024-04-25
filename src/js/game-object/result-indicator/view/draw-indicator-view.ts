import * as THREE from "three";

import type { Resources } from "../../../resource";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import type { ResultIndicatorView } from "./result-indicator-view";
import { SimpleIndicatorView } from "./simple-result-indicator";

/**
 * DRAWビューを生成する
 *
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function drawIndicatorView(resources: Resources): ResultIndicatorView {
  const texture =
    resources.textures.find((v) => v.id === TEXTURE_IDS.DRAW)?.texture ??
    new THREE.Texture();
  return new SimpleIndicatorView(texture, 150, 60);
}
