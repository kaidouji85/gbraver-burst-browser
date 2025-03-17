import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";
import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";

/** スプライト幅 */
export const WIDTH = 800;

/** スプライト高 */
export const HEIGHT = 800;

/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * グランドーザ カットイン バーストアップ メッシュを生成
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function granDozerCutInBurstUp(
  resources: Resources,
): HorizontalAnimationMesh {
  const texture =
    resources.textures.find(
      (v) => v.id === TEXTURE_IDS.GRAN_DOZER_CUTIN_BURST_UP,
    )?.texture ?? new THREE.Texture();
  return new HorizontalAnimationMesh({
    texture,
    maxAnimation: MAX_ANIMATION,
    width: WIDTH,
    height: HEIGHT,
  });
}
