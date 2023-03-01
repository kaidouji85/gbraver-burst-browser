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
 * ジェネシスブレイバー カットイン バーストダウン メッシュを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function genesisBraverCutInBurstDown(resources: Resources): HorizontalAnimationMesh {
  const texture =
    resources.textures.find(
      (v) => v.id === TEXTURE_IDS.GENESIS_BRAVER_CUTIN_BURST_DOWN
    )?.texture ?? new THREE.Texture();
    return new HorizontalAnimationMesh({
      texture,
      maxAnimation: MAX_ANIMATION,
      width: WIDTH,
      height: HEIGHT,
    });
}
