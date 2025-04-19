import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";
import { Resources } from "../../../../resource";
import { findTextureOrThrow } from "../../../../resource/find-texture-or-throw";
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
 * @returns 生成結果
 */
export function genesisBraverCutInBurstDown(
  resources: Resources,
): HorizontalAnimationMesh {
  const { texture } = findTextureOrThrow(
    resources,
    TEXTURE_IDS.GENESIS_BRAVER_CUTIN_BURST_DOWN,
  );
  return new HorizontalAnimationMesh({
    texture,
    maxAnimation: MAX_ANIMATION,
    width: WIDTH,
    height: HEIGHT,
  });
}
