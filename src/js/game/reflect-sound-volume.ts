import { BGMManager } from "../bgm/bgm-manager";
import { changeVolume } from "../bgm/bgm-operators";
import { Resources } from "../resource";
import { SoundResource } from "../resource/sound/resource";
import { GBraverBurstBrowserConfig } from "./config/browser-config";

/**
 * SEの音量を変更する
 * @param sounds 音リソースの配列
 * @param volume 音量
 */
function changeSEVolume(sounds: SoundResource[], volume: number): void {
  sounds
    .filter((sound) => sound.type === "SE")
    .forEach((sound) => {
      sound.sound.volume(sound.volumeScale * volume);
    });
}

/** GamePropsから音関連のプロパティを取り出しもの */
type SoundProps = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** BGM管理オブジェクト */
  bgm: BGMManager;
};

/**
 * 音量設定を各種音リソースに反映する
 * 本関数にはresources、bgmを変更する副作用がある
 * @param props ゲームプロパティ
 * @param config 反映するブラウザ設定
 */
export async function reflectSoundVolume(
  props: SoundProps,
  config: GBraverBurstBrowserConfig,
): Promise<void> {
  changeSEVolume(props.resources.sounds, config.seVolume);
  await props.bgm.do(changeVolume(config.bgmVolume));
}
