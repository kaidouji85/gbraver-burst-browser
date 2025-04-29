import { Howl } from "howler";

import { ResourceRoot } from "../resource-root";
import { SoundConfig, SoundResource } from "./resource";

/**
 * 指定した音リソースを読み込む
 * ボリュームには初期値として1がセットされる
 * @param resourceRoot リソースルート
 * @param config 音設定
 * @returns 読み込み結果
 */
export function loadSound(
  resourceRoot: ResourceRoot,
  config: SoundConfig,
): Promise<SoundResource> {
  return new Promise((resolve, reject) => {
    const sound = new Howl({
      src: [config.path(resourceRoot)],
      volume: config.volumeScale,
    });
    const resource: SoundResource = { ...config, sound };

    if (sound.state() === "loaded") {
      resolve(resource);
      return;
    }

    sound.on("load", () => {
      resolve(resource);
    });
    sound.on("loaderror", () => {
      reject();
    });
  });
}
