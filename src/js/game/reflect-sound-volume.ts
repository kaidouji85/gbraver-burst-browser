import { changeVolume } from "../bgm/bgm-operators";
import { GBraverBurstBrowserConfig } from "./config/browser-config";
import { GameProps } from "./game-props";

/**
 * 音量設定を音リソースに反映する
 * 本関数にはresourcesを変更する副作用がある
 * @param props ゲームプロパティ
 * @param config 反映するブラウザ設定
 */
export async function reflectSoundVolume(
  props: GameProps,
  config: GBraverBurstBrowserConfig,
): Promise<void> {
  props.resources.sounds
    .filter((sound) => sound.type === "SE")
    .forEach((sound) => {
      sound.sound.volume(sound.volumeScale * config.seVolume);
    });
  await props.bgm.do(changeVolume(config.bgmVolume));
}
