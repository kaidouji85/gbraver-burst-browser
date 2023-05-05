import {
  BattleAnimationTimeScale,
  BattleAnimationTimeScales,
  GbraverBurstBrowserConfig,
  WebGLPixelRatio,
  WebGLPixelRatios,
} from "../../../game/config/browser-config";
import {
  BattleControllerType,
  BattleControllerTypes,
} from "../../../td-scenes/battle/controller-type";
import { ROOT_CLASS } from "./class-name";
import type { DataIDs } from "./data-ids";
import { soundVolumeLabel } from "./sound-volume-label";

/**
 * 戦闘アニメ再生速度のoption要素HTMLを生成する
 * @param selected 選択中の戦闘アニメ再生速度
 * @return 生成結果
 */
const battleAnimationTimeScaleOptions = (selected: BattleAnimationTimeScale) =>
  BattleAnimationTimeScales.map(
    (value) => `
    <option class="${ROOT_CLASS}__battle-animation-time-scale-option"
      value="${value}"
      ${value === selected ? "selected" : ""}
    >
      ${Math.floor(1 / value)}倍
    </option>
  `
  ).reduce((a, b) => a + b);

/**
 * 戦闘画面のピクセルレートのoption要素HTMLを生成する
 * @param selected 選択中の戦闘画面のピクセルレート
 * @return 生成結果
 */
const webGLPixelRatioOptions = (selected: WebGLPixelRatio) =>
  WebGLPixelRatios.map(
    (value) => `
    <option class="${ROOT_CLASS}__webgl-pixel-ratio-selector-option" 
      value="${value}" 
      ${value === selected ? "selected" : ""}
    >
      ${Number(value).toFixed(2)}
    </option>
  `
  ).reduce((a, b) => a + b);

/**
 * 戦闘画面コントローラーoptionのラベルを生成する
 * @param value 値
 * @return 生成結果
 */
const battleControllerTypeOptionLabel = (value: BattleControllerType) => {
  switch (value) {
    case "MiniController":
      return "ミニコントローラー";
    case "BigButton":
    default:
      return "ボタン";
  }
};

/**
 * 戦闘画面コントローラーのoption要素HTMLを生成する
 * @param selected 選択中の戦闘画面コントローラー
 * @return 生成結果
 */
const battleControllerTypeOptions = (selected: BattleControllerType) =>
  BattleControllerTypes.map(
    (value) => `
    <option class="${ROOT_CLASS}__battle-controller-type-option"
      value="${value}"
      ${value === selected ? "selected" : ""}
    >
      ${battleControllerTypeOptionLabel(value)}
    </option>  
  `
  ).reduce((a, b) => a + b);

/**
 * ルート要素のHTML要素
 *
 * @param ids data-idを集めたもの
 * @param config Gブレイバーバースト ブラウザ側設定項目
 * @return ルート要素のHTML要素
 */
export function rootInnerHTML(
  ids: DataIDs,
  config: GbraverBurstBrowserConfig
): string {
  return `
      <div class="${ROOT_CLASS}__title">設定</div>
      <div class="${ROOT_CLASS}__configs">
        <div class="${ROOT_CLASS}__battle-animation-time-scale">
          <div class="${ROOT_CLASS}__battle-animation-time-scale-caption">戦闘アニメ再生速度</div>
          <select class="${ROOT_CLASS}__battle-animation-time-scale-selector"
            data-id="${ids.battleAnimationTimeScaleSelector}"
           >
            ${battleAnimationTimeScaleOptions(config.battleAnimationTimeScale)}
          </select>
        </div>
        <div class="${ROOT_CLASS}__webgl-pixel-ratio">
          <div class="${ROOT_CLASS}__webgl-pixel-ratio-caption">戦闘画面のピクセルレート</div>
          <select class="${ROOT_CLASS}__webgl-pixel-ratio-selector"
            data-id="${ids.webGLPixelRatioSelector}"
          >
            ${webGLPixelRatioOptions(config.webGLPixelRatio)}
          </select>
        </div>
        <div class="${ROOT_CLASS}__battle-controller-type">
          <div class="${ROOT_CLASS}__battle-controller-type-caption">戦闘画面コントローラー</div>
          <select class="${ROOT_CLASS}__battle-controller-type-selector"
            data-id="${ids.battleControllerTypeSelector}"
          >
            ${battleControllerTypeOptions(config.battleControllerType)}
          </select>
        </div>
        <div class="${ROOT_CLASS}__bgm-volume">
          <div class="${ROOT_CLASS}__bgm-volume-caption">BGM音量</div>
          <input class="${ROOT_CLASS}__bgm-volume-selector" 
            type="range" min="0" max="1" step="0.1" 
            value="${config.bgmVolume}" 
            data-id="${ids.bgmVolumeSelector}"
          >
          <div class="${ROOT_CLASS}__bgm-volume-value"
            data-id="${ids.bgmVolumeValue}"
          >
          ${soundVolumeLabel(config.bgmVolume)}</div>
        </div>
        <div class="${ROOT_CLASS}__se-volume">
          <div class="${ROOT_CLASS}__se-volume-caption">SE音量</div>
          <input class="${ROOT_CLASS}__se-volume-selector" type="range" min="0" max="1" step="0.1"
            value="${config.seVolume}" 
            data-id="${ids.seVolumeSelector}"
          >
          <div class="${ROOT_CLASS}__se-volume-value"
            data-id="${ids.seVolumeValue}"
          >
          ${soundVolumeLabel(config.seVolume)}</div>
        </div>
      </div>
      <div class="${ROOT_CLASS}__footer">
        <button class="${ROOT_CLASS}__prev" data-id="${ids.prev}">戻る</button>
        <button class="${ROOT_CLASS}__config-change"
          data-id="${ids.configChange}"
        >
          この設定にする
        </button>
      </div>
  `;
}
