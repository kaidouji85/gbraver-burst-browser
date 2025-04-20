import { ArmdozerId } from "gbraver-burst-core";
import * as R from "ramda";

import { disposeGltfModel } from "../gltf/dispose-gltf-model";
import { Resources } from "../index";
import { ResourceType } from "../resource-type";

/**
 * 不要なリソースを削除する
 * @param options オプション
 * @param options.resources リソース管理オブジェクト
 * @param options.deletionArmdozerIds 削除するリソースのArmdozerId
 * @returns 削除後のリソース管理オブジェクト
 */
export const deleteUnusedResources = (options: {
  resources: Readonly<Resources>;
  deletionArmdozerIds: Readonly<ArmdozerId[]>;
}): Resources => {
  const { resources, deletionArmdozerIds } = options;
  const shouldDelete = (t: ResourceType) =>
    t.type === "DynamicArmdozer" && deletionArmdozerIds.includes(t.armdozerId);

  const { deleteGltfs, keepGltfs } = R.groupBy(
    (g) => (shouldDelete(g) ? "deleteGltfs" : "keepGltfs"),
    resources.gltfs,
  );
  deleteGltfs?.forEach((g) => disposeGltfModel(g));

  const { deleteTextures, keepTextures } = R.groupBy(
    (t) => (shouldDelete(t) ? "deleteTextures" : "keepTextures"),
    resources.textures,
  );
  deleteTextures?.forEach((textures) => {
    textures.texture.dispose();
  });

  const { deleteCubeTextures, keepCubeTextures } = R.groupBy(
    (c) => (shouldDelete(c) ? "deleteCubeTextures" : "keepCubeTextures"),
    resources.cubeTextures,
  );
  deleteCubeTextures?.forEach((textures) => {
    textures.texture.dispose();
  });

  const { deleteCanvasImages, keepCanvasImages } = R.groupBy(
    (c) => (shouldDelete(c) ? "deleteCanvasImages" : "keepCanvasImages"),
    resources.canvasImages,
  );
  deleteCanvasImages?.forEach((c) => (c.image.src = ""));

  const { deleteSounds, keepSounds } = R.groupBy(
    (s) => (shouldDelete(s) ? "deleteSounds" : "keepSounds"),
    resources.sounds,
  );
  deleteSounds?.forEach((s) => s.sound.unload());

  return {
    ...resources,
    gltfs: keepGltfs ?? [],
    textures: keepTextures ?? [],
    cubeTextures: keepCubeTextures ?? [],
    canvasImages: keepCanvasImages ?? [],
    sounds: keepSounds ?? [],
  };
};
