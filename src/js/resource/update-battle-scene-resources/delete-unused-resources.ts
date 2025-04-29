import { ArmdozerId, PilotId } from "gbraver-burst-core";
import * as R from "ramda";

import { disposeGltfModel } from "../gltf/dispose-gltf-model";
import { Resources } from "../index";
import { ResourceType } from "../resource-type";

/**
 * 不要なリソースを削除する
 * @param options オプション
 * @returns 削除後のリソース管理オブジェクト
 */
export const deleteUnusedResources = (options: {
  /** リソース管理オブジェクト */
  resources: Readonly<Resources>;
  /** 削除するリソースのArmdozerId */
  deletionArmdozerIds: Readonly<ArmdozerId[]>;
  /** 削除するリソースのPilotId */
  deletionPilotIds: Readonly<PilotId[]>;
}): Resources => {
  const { resources, deletionArmdozerIds, deletionPilotIds } = options;
  const shouldDelete = (t: ResourceType) =>
    (t.type === "DynamicArmdozer" &&
      deletionArmdozerIds.includes(t.armdozerId)) ||
    (t.type === "DynamicPilot" && deletionPilotIds.includes(t.pilotId));

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
