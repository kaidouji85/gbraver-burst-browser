import type { Resources } from "..";
import type { CanvasImageConfig } from "../canvas-image";
import type { CubeTextureConfig } from "../cube-texture";
import type { GlTFConfig } from "../gltf";
import type { SoundConfig } from "../sound";
import type { TextureConfig } from "../texture/resource";

/** リソース設定をあつめたもの */
type Configs = {
  /** 読み込むGLTFモデル */
  gltfConfigs: GlTFConfig[];
  /** 読み込むテクスチャ */
  textureConfigs: TextureConfig[];
  /** 読み込むキューブテクスチャ */
  cubeTextureConfigs: CubeTextureConfig[];
  /** 読み込むキャンバス用画像 */
  canvasImageConfigs: CanvasImageConfig[];
  /** 読み込む音声 */
  soundConfigs: SoundConfig[];
};

/**
 * 読みこまれていないリソース設定を抽出する
 * @param configs 抽出対象となるリソース設定
 * @param resources 既に読みこんだリソース
 * @return 抽出結果
 */
export function extractUnloadedResourceConfigs(
  configs: Configs,
  resources: Resources,
): Configs {
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
