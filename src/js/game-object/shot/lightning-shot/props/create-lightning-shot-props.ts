import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";
import { ResourcesContainer } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { createModelInitialValue } from "../model/create-model-initial-value";
import { LightningShotProps } from "./lightning-shot-props";

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

  const model = createModelInitialValue();

  return { mesh, model };
}
