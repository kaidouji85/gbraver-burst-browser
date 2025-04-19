import type { Resources } from "..";
import { LoadingTargetConfigs } from "./resource-loading";

/**
 * @deprecated
 * 読みこまれていないリソース設定を抽出する
 * @param configs 抽出対象となるリソース設定
 * @param resources 既に読みこんだリソース
 * @returns 抽出結果
 */
export function extractUnloadedResourceConfigs(
  configs: LoadingTargetConfigs,
  resources: Resources,
): LoadingTargetConfigs {
  const loadedGltfIDs = resources.gltfs.map((v) => v.id);
  const loadedTextureIDs = resources.textures.map((v) => v.id);
  const loadedCubeTextureIDs = resources.cubeTextures.map((v) => v.id);
  const loadedCanvasImageIDs = resources.canvasImages.map((v) => v.id);
  const loadedSoundIDs = resources.sounds.map((v) => v.id);
  return {
    gltfConfigs: configs.gltfConfigs.filter(
      (v) => !loadedGltfIDs.includes(v.id),
    ),
    textureConfigs: configs.textureConfigs.filter(
      (v) => !loadedTextureIDs.includes(v.id),
    ),
    cubeTextureConfigs: configs.cubeTextureConfigs.filter(
      (v) => !loadedCubeTextureIDs.includes(v.id),
    ),
    canvasImageConfigs: configs.canvasImageConfigs.filter(
      (v) => !loadedCanvasImageIDs.includes(v.id),
    ),
    soundConfigs: configs.soundConfigs.filter(
      (v) => !loadedSoundIDs.includes(v.id),
    ),
  };
}
