// @flow

import * as THREE from "three";

import { toSilhouette } from "../src/js/canvas/silhouette/to-silhouette";
import { TEXTURE_IDS } from "../src/js/resource/texture/ids";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";

export default {
  title: "silhouette",
};

export const texture: DOMStubStory = domStub((resources) => {
  const texture =
    resources.textures.find((v) => v.id === TEXTURE_IDS.SHIN_BRAVER_STAND)
      ?.texture ?? new THREE.Texture();
  const image = texture.image;
  const canvas = toSilhouette(image, 255, 0, 0);
  return canvas;
});
