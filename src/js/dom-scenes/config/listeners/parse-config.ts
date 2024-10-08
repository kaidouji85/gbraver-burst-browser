import { GBraverBurstBrowserConfig } from "../../../game/config/browser-config";
import { parseBrowserConfig } from "../../../game/config/parser/browser-config";
import { ConfigProps } from "../props";

/**
 * 画面の入力値からプレイヤーセレクタータイプをパースする
 * @param props ゲームプロパティ
 * @returns パース結果、パースできなかった場合はnull
 */
const parsePlayerSelectorType = (props: ConfigProps) => {
  const foundPlayerSelectorType = props.playerSelectorType.querySelector(
    'input[type="radio"]:checked',
  );
  return foundPlayerSelectorType instanceof HTMLInputElement
    ? foundPlayerSelectorType.value
    : null;
};

/**
 * 画面の入力値からバトルアニメーションのタイムスケールをパースする
 * @param props ゲームプロパティ
 * @returns パース結果、パースできなかった場合はnull
 */
const parseBattleAnimationTimeScale = (props: ConfigProps) => {
  const foundBattleAnimationTimeScale =
    props.battleAnimationTimeScaleSelector.querySelector(
      'input[type="radio"]:checked',
    );
  return foundBattleAnimationTimeScale instanceof HTMLInputElement
    ? foundBattleAnimationTimeScale.value
    : null;
};

/**
 * 画面の入力値からバトルウィンドウのフォントサイズをパースする
 * @param props ゲームプロパティ
 * @returns パース結果、パースできなかった場合はnull
 */
const parseBattleWindowFontSize = (props: ConfigProps) => {
  const foundBattleWindowFontSize =
    props.battleWindowFontSizeSelector.querySelector(
      'input[type="radio"]:checked',
    );
  return foundBattleWindowFontSize instanceof HTMLInputElement
    ? foundBattleWindowFontSize.value
    : null;
};

/**
 * 画面の入力値からWebGLのピクセル比をパースする
 * @param props ゲームプロパティ
 * @returns パース結果、パースできなかった場合はnull
 */
const parseWebGLPixelRatio = (props: ConfigProps) => {
  const foundWebGLPixelRatio = props.webGLPixelRatioSelector.querySelector(
    'input[type="radio"]:checked',
  );
  return foundWebGLPixelRatio instanceof HTMLInputElement
    ? foundWebGLPixelRatio.value
    : null;
};

/**
 * 画面の入力値からバトルコントローラータイプをパースする
 * @param props ゲームプロパティ
 * @returns パース結果、パースできなかった場合はnull
 */
const parseBattleControllerType = (props: ConfigProps) => {
  const foundBattleControllerType =
    props.battleControllerTypeSelector.querySelector(
      'input[type="radio"]:checked',
    );
  return foundBattleControllerType instanceof HTMLInputElement
    ? foundBattleControllerType.value
    : null;
};

/**
 * 画面の入力値からパフォーマンス統計の表示状態をパースする
 * @param props ゲームプロパティ
 * @returns パース結果、パースできなかった場合はnull
 */
const parsePerformanceStatsVisibility = (props: ConfigProps) => {
  const foundPerformanceStatsVisibility =
    props.performanceStatsVisibilitySelector.querySelector(
      'input[type="radio"]:checked',
    );
  return foundPerformanceStatsVisibility instanceof HTMLInputElement
    ? foundPerformanceStatsVisibility.value
    : null;
};

/**
 * 画面の入力値から設定オブジェクトをパースするヘルパー関数
 * @param props 画面の入力値
 * @returns パース結果
 */
export const parseConfig = (props: ConfigProps): GBraverBurstBrowserConfig =>
  parseBrowserConfig({
    playerSelectorType: parsePlayerSelectorType(props),
    battleAnimationTimeScale: parseBattleAnimationTimeScale(props),
    battleWindowFontSize: parseBattleWindowFontSize(props),
    webGLPixelRatio: parseWebGLPixelRatio(props),
    battleControllerType: parseBattleControllerType(props),
    bgmVolume: props.bgmVolumeSelector.value,
    seVolume: props.seVolumeSelector.value,
    performanceStatsVisibility: parsePerformanceStatsVisibility(props),
  });
