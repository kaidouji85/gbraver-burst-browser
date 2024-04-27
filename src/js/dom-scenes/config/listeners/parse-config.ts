import { GBraverBurstBrowserConfig } from "../../../game/config/browser-config";
import { parseBrowserConfig } from "../../../game/config/parser/browser-config";
import { ConfigProps } from "../props";

/**
 * 画面の入力値から設定オブジェクトをパースするヘルパー関数
 * @param props 画面の入力値
 * @returns パース結果
 */
export function parseConfig(props: ConfigProps): GBraverBurstBrowserConfig {
  const foundPlayerSelectorType = props.playerSelectorType.querySelector(
    'input[type="radio"]:checked',
  );
  const playerSelectorType =
    foundPlayerSelectorType instanceof HTMLInputElement
      ? foundPlayerSelectorType.value
      : null;
  const foundBattleAnimationTimeScale =
    props.battleAnimationTimeScaleSelector.querySelector(
      'input[type="radio"]:checked',
    );
  const battleAnimationTimeScale =
    foundBattleAnimationTimeScale instanceof HTMLInputElement
      ? foundBattleAnimationTimeScale.value
      : null;
  const foundWebGLPixelRatio = props.webGLPixelRatioSelector.querySelector(
    'input[type="radio"]:checked',
  );
  const webGLPixelRatio =
    foundWebGLPixelRatio instanceof HTMLInputElement
      ? foundWebGLPixelRatio.value
      : null;
  const foundBattleControllerType =
    props.battleControllerTypeSelector.querySelector(
      'input[type="radio"]:checked',
    );
  const battleControllerType =
    foundBattleControllerType instanceof HTMLInputElement
      ? foundBattleControllerType.value
      : null;
  const foundPerformanceStatsVisibility =
    props.performanceStatsVisibilitySelector.querySelector(
      'input[type="radio"]:checked',
    );
  const performanceStatsVisibility =
    foundPerformanceStatsVisibility instanceof HTMLInputElement
      ? foundPerformanceStatsVisibility.value
      : null;
  return parseBrowserConfig({
    playerSelectorType,
    battleAnimationTimeScale,
    webGLPixelRatio,
    battleControllerType,
    bgmVolume: props.bgmVolumeSelector.value,
    seVolume: props.seVolumeSelector.value,
    performanceStatsVisibility,
  });
}
