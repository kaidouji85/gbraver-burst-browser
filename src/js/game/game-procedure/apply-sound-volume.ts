import { changeVolume } from "../../bgm/bgm-operators";
import { GBraverBurstBrowserConfig } from "../config/browser-config";
import { GameProps } from "../game-props";

/**
 * 音量設定を各種音リソースに反映する
 * 本関数にはresources、bgmを変更する副作用がある
 * @param props ゲームプロパティ
 * @param config 反映するブラウザ設定
 */
export async function applySoundVolume(
  props: GameProps,
  config: GBraverBurstBrowserConfig,
): Promise<void> {
  props.se.volume = config.seVolume;
  await props.bgm.do(changeVolume(config.bgmVolume));
}
