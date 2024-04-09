import type { ResourceRoot } from "../resource-root";
import { SOUND_CONFIGS } from "../sound/configs";
import { SOUND_IDS } from "../sound/ids";
import type { ResourceLoading } from "./resource-loading";
import { resourceLoading } from "./resource-loading";

/** タイトルで利用する音声 */
const TITLE_SOUND_IDS = [
  SOUND_IDS.PUSH_BUTTON,
  SOUND_IDS.CHANGE_VALUE,
  SOUND_IDS.TITLE_BGM,
];

/**
 * タイトルで利用するリソースを読み込む
 *
 * @param resourceRoot リソースルート
 * @return リソース読み込みオブジェクト
 */
export function titleResourceLoading(
  resourceRoot: ResourceRoot,
): ResourceLoading {
  const soundConfigs = SOUND_CONFIGS.filter((v) =>
    TITLE_SOUND_IDS.includes(v.id),
  );
  return resourceLoading({
    resourceRoot,
    preLoadImages: [],
    gltfConfigs: [],
    textureConfigs: [],
    cubeTextureConfigs: [],
    canvasImageConfigs: [],
    soundConfigs,
  });
}
