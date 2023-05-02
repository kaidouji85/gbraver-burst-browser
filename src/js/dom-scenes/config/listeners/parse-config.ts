import { BattleAnimationTimeScales, GbraverBurstBrowserConfig, SoundVolumes, WebGLPixelRatios } from "../../../game/config/browser-config";
import { parseBattleAnimationTimeScale } from "../../../game/config/parser/battle-animation-time-scale";
import { parseSoundVolume } from "../../../game/config/parser/sound-volume";
import { parseWebGLPixelRatio } from "../../../game/config/parser/web-gl-pixel-ratio";
import type { ConfigProps } from "../props";

/**
 * 画面の入力値から設定オブジェクトをパースするヘルパー関数
 *
 * @return パース結果
 */
export function parseConfig(props: ConfigProps): GbraverBurstBrowserConfig {
  const battleAnimationTimeScale =
    parseBattleAnimationTimeScale(
      props.battleAnimationTimeScaleSelector.value
    ) ?? BattleAnimationTimeScales[0];
  const webGLPixelRatio =
    parseWebGLPixelRatio(props.webGLPixelRatioSelector.value) ??
    WebGLPixelRatios[0];
  const bgmVolume =
    parseSoundVolume(props.bgmVolumeSelector.value) ?? SoundVolumes[0];
  const seVolume =
    parseSoundVolume(props.seVolumeSelector.value) ?? SoundVolumes[0];
  return {
    battleAnimationTimeScale,
    webGLPixelRatio,
    bgmVolume,
    seVolume,
  };
}
