import * as THREE from "three";
import { toSilhouette } from "../src/js/canvas/silhouette/to-silhouette";
import { CANVAS_IMAGE_IDS } from "../src/js/resource/canvas-image";
import { TEXTURE_IDS } from "../src/js/resource/texture/ids";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";
export default {
  title: "silhouette"
};
export const texture: DOMStubStory = domStub(resources => {
  const texture = resources.textures.find(v => v.id === TEXTURE_IDS.SHIN_BRAVER_STAND)?.texture ?? new THREE.Texture();
  const image = texture.image;
  const canvas = toSilhouette(image, 255, 0, 0);
  return canvas;
});
export const horizontalTexture: DOMStubStory = domStub(resources => {
  const root = document.createElement("div");
  const texture = resources.textures.find(v => v.id === TEXTURE_IDS.SHIN_BRAVER_BURST_DOWN)?.texture ?? new THREE.Texture();
  const image = texture.image;
  const canvas = toSilhouette(image, 255, 0, 0);
  root.appendChild(image);
  root.appendChild(canvas);
  return root;
});
export const canvasImage: DOMStubStory = domStub(resources => {
  const image = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BURST_BUTTON)?.image ?? new Image();
  const canvas = toSilhouette(image, 0, 0, 255);
  return canvas;
});