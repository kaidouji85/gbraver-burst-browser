import { StoryFn } from "@storybook/html";
import * as THREE from "three";

import { toSilhouette } from "../src/js/canvas/to-silhouette";
import { CANVAS_IMAGE_IDS } from "../src/js/resource/canvas-image";
import { TEXTURE_IDS } from "../src/js/resource/texture/ids";
import { domStub } from "./stub/dom-stub";

export default {
  title: "silhouette",
};

export const texture: StoryFn = domStub(({ resources }) => {
  const texture =
    resources.textures.find((v) => v.id === TEXTURE_IDS.SHIN_BRAVER_STAND)
      ?.texture ?? new THREE.Texture();
  const image = texture.image;
  return toSilhouette({ image, r: 255, g: 0, b: 0 });
});

export const scaleDownTexture: StoryFn = domStub(({ resources }) => {
  const texture =
    resources.textures.find((v) => v.id === TEXTURE_IDS.SHIN_BRAVER_STAND)
      ?.texture ?? new THREE.Texture();
  const image = texture.image;
  return toSilhouette({ image, r: 255, g: 0, b: 0, scale: 0.5 });
});

export const horizontalTexture: StoryFn = domStub(({ resources }) => {
  const texture =
    resources.textures.find((v) => v.id === TEXTURE_IDS.SHIN_BRAVER_BURST_DOWN)
      ?.texture ?? new THREE.Texture();
  const image = texture.image;
  return toSilhouette({ image, r: 255, g: 0, b: 0 });
});

export const scaleDownHorizontalTexture: StoryFn = domStub(({ resources }) => {
  const texture =
    resources.textures.find((v) => v.id === TEXTURE_IDS.SHIN_BRAVER_BURST_DOWN)
      ?.texture ?? new THREE.Texture();
  const image = texture.image;
  return toSilhouette({ image, r: 255, g: 0, b: 0, scale: 0.5 });
});

export const canvasImage: StoryFn = domStub(({ resources }) => {
  const image =
    resources.canvasImages.find((v) => v.id === CANVAS_IMAGE_IDS.BURST_BUTTON)
      ?.image ?? new Image();
  return toSilhouette({ image, r: 0, g: 0, b: 255 });
});

export const scaleDownCanvasImage: StoryFn = domStub(({ resources }) => {
  const image =
    resources.canvasImages.find((v) => v.id === CANVAS_IMAGE_IDS.BURST_BUTTON)
      ?.image ?? new Image();
  return toSilhouette({ image, r: 0, g: 0, b: 255, scale: 0.5 });
});
