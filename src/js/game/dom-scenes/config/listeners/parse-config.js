// @flow
import {
  BattleAnimationTimeScales,
  parseBattleAnimationTimeScale,
  parseSoundVolume,
  parseWebGLPixelRatio,
  SoundVolumes,
  WebGLPixelRatios
} from "../../../config/browser-config";
import type {GbraverBurstBrowserConfig} from "../../../config/browser-config";
import type {ConfigProps} from "../props";

/**
 * 画面の入力値から設定オブジェクトをパースする
 *
 * @return パース結果
 */
export function parseConfig(props: ConfigProps): GbraverBurstBrowserConfig {
  const battleAnimationTimeScale = parseBattleAnimationTimeScale(props.battleAnimationTimeScaleSelector.value) ?? BattleAnimationTimeScales[0];
  const webGLPixelRatio = parseWebGLPixelRatio(props.webGLPixelRatioSelector.value) ?? WebGLPixelRatios[0];
  const bgmVolume = parseSoundVolume(props.bgmVolumeSelector.value) ?? SoundVolumes[0];
  const seVolume = parseSoundVolume(props.seVolumeSelector.value) ?? SoundVolumes[0];
  return {battleAnimationTimeScale, webGLPixelRatio, bgmVolume, seVolume};
}