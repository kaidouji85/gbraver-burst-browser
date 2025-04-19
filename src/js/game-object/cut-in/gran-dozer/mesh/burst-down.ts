import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";
import { Resources } from "../../../../resource";
import { findTextureOrThrow } from "../../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { MESH_SIZE } from "./mesh-size";

/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * グランドーザ カットイン バーストダウン メッシュを生成
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function granDozerCutInBurstDown(
  resources: Resources,
): HorizontalAnimationMesh {
  const { texture } = findTextureOrThrow(
    resources,
    TEXTURE_IDS.GRAN_DOZER_CUTIN_BURST_DOWN,
  );
  return new HorizontalAnimationMesh({
    texture,
    maxAnimation: MAX_ANIMATION,
    width: MESH_SIZE,
    height: MESH_SIZE,
  });
}
