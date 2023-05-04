import {
  GbraverBurstBrowserConfig,
} from "../../../game/config/browser-config";
import type { ConfigProps } from "../props";
import {parseBrowserConfig} from "../../../game/config/parser/browser-config";

/**
 * 画面の入力値から設定オブジェクトをパースするヘルパー関数
 *
 * @return パース結果
 */
export function parseConfig(props: ConfigProps): GbraverBurstBrowserConfig {
  return parseBrowserConfig({
    battleAnimationTimeScale: props.battleAnimationTimeScaleSelector.value,
    webGLPixelRatio: props.webGLPixelRatioSelector.value,
    bgmVolume: props.bgmVolumeSelector.value,
    seVolume: props.seVolumeSelector.value,
  });
}
