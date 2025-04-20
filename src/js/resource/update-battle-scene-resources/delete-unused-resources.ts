import { ArmdozerId } from "gbraver-burst-core";

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
}) => {
  const { resources, deletionArmdozerIds } = options;
  const shouldDelete = (t: ResourceType) =>
    t.type === "DynamicArmdozer" && deletionArmdozerIds.includes(t.armdozerId);

  const gltfs = resources.gltfs.filter((g) => {
    if (shouldDelete(g)) {
      disposeGltfModel(g);
      return false;
    } else {
      return true;
    }
  });

  const textures = resources.textures.filter((t) => {
    if (shouldDelete(t)) {
      t.texture.dispose();
      return false;
    } else {
      return true;
    }
  });

  const cubeTextures = resources.cubeTextures.filter((t) => {
    if (shouldDelete(t)) {
      t.texture.dispose();
      return false;
    } else {
      return true;
    }
  });

  const canvasImages = resources.canvasImages.filter((t) => {
    if (shouldDelete(t)) {
      t.image.src = "";
      return false;
    } else {
      return true;
    }
  });

  const sounds = resources.sounds.filter((t) => {
    if (shouldDelete(t)) {
      t.sound.unload();
      return false;
    } else {
      return true;
    }
  });

  return {
    ...resources,
    gltfs,
    textures,
    cubeTextures,
    canvasImages,
    sounds,
  };
};
