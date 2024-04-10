import { BGMManager } from "../../bgm/bgm-manager";
import { changeVolume } from "../../bgm/bgm-operators";
import { Resources } from "../../resource";
import { GBraverBurstBrowserConfig } from "../config/browser-config";

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
  // SEはマスター音量を持たないので、個別に音量を設定する
  props.resources.sounds
    .filter((sound) => sound.type === "SE")
    .forEach((sound) => {
      sound.sound.volume(sound.volumeScale * config.seVolume);
    });
  // BGMはBGMManagerがマスター音量を持つので、BGMManagerにだけ音量設定をする
  await props.bgm.do(changeVolume(config.bgmVolume));
}
