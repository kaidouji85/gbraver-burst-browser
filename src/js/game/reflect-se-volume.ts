import { Resources } from "../resource";
import { GBraverBurstBrowserConfig } from "./config/browser-config";

/**
 * ブラウザ設定のSE音量を音リソースに反映する
 * 本関数にはresourcesを変更する副作用がある
 * @param resources リソース管理オブジェクト
 * @param config 反映するブラウザ設定
 */
export function reflectSEVolume(
  resources: Resources,
  config: GBraverBurstBrowserConfig,
): void {
  resources.sounds
    .filter((sound) => sound.type === "SE")
    .forEach((sound) => {
      sound.sound.volume(sound.volumeScale * config.seVolume);
    });
}
