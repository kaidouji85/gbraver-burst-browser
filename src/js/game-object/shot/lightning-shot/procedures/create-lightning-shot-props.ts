import { ResourcesContainer } from "../../../../resource";
import { LightningShotProps } from "../props";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import * as THREE from "three";
import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";

/**
 * 電撃ショットのプロパティを生成する
 * @param options オプション
 * @returns 電撃ショットのプロパティ
 */
export function createLightningShotProps(
  options: ResourcesContainer,
): LightningShotProps {
  const { resources } = options;
  const texture =
    resources.textures.find((t) => t.id === TEXTURE_IDS.LIGHTNING_SHOT)
      ?.texture ?? new THREE.Texture();
  const mesh = new HorizontalAnimationMesh({
    texture,
    maxAnimation: 8,
    width: 200,
    height: 200,
  });

  return { mesh };
}
