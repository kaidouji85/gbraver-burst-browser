// @flow
import type {
  BattleAnimationTimeScale,
  GbraverBurstBrowserConfig,
  SoundVolume,
  WebGLPixelRatio
} from "../../config/browser-config";
import {BattleAnimationTimeScales, WebGLPixelRatios} from "../../config/browser-config";

/** ルート要素のclass属性 */
export const ROOT_CLASS = 'config';

/** data-idを集めたもの */
type DataIDs = {
  battleAnimationTimeScaleSelector: string,
  webGLPixelRatioSelector: string,
  bgmVolumeSelector: string,
  bgmVolumeValue: string,
  seVolumeSelector: string,
  seVolumeValue: string,
  prev: string,
  configChange: string,
};

/**
 * 音量を画面表示用にパースする
 *
 * @param volume 音量
 * @return パース結果
 */
export function soundVolumeLabel(volume: SoundVolume): string {
  return volume.toFixed(1);
}

/**
 * ルート要素のHTML要素
 *
 * @param ids data-idを集めたもの
 * @param config Gブレイバーバースト ブラウザ側設定項目
 * @return ルート要素のHTML要素
 */
export function rootInnerHTML(ids: DataIDs, config: GbraverBurstBrowserConfig): string {
  const battleAnimationTimeScaleOption = (value: BattleAnimationTimeScale) => `
    <option class="${ROOT_CLASS}__battle-animation-time-scale-option"
      value="${value}" ${value === config.battleAnimationTimeScale ? 'selected' : ""}>
      ${Math.floor(1 / value)}倍
    </option>`;
  const battleAnimationTimeScaleOptions = BattleAnimationTimeScales.map(v => battleAnimationTimeScaleOption(v))
    .reduce((a, b) => a + b);
  const webGLPixelRatioOption = (value: WebGLPixelRatio) => `
    <option class="${ROOT_CLASS}__webgl-pixel-ratio-selector-option" 
      value="${value}" ${value === config.webGLPixelRatio ? 'selected' : ""}>
      ${Number(value).toFixed(2)}
    </option>`;
  const webGLPixelRatioOptions = WebGLPixelRatios.map(v => webGLPixelRatioOption(v))
    .reduce((a, b) => a + b);
  return `
    <div class="${ROOT_CLASS}__title">設定</div>
    <div class="${ROOT_CLASS}__configs">
      <div class="${ROOT_CLASS}__battle-animation-time-scale">
        <div class="${ROOT_CLASS}__battle-animation-time-scale-caption">戦闘アニメ再生速度</div>
        <select class="${ROOT_CLASS}__battle-animation-time-scale-selector" data-id="${ids.battleAnimationTimeScaleSelector}">
          ${battleAnimationTimeScaleOptions}
        </select>
      </div>
      <div class="${ROOT_CLASS}__webgl-pixel-ratio">
        <div class="${ROOT_CLASS}__webgl-pixel-ratio-caption">戦闘画面のピクセルレート</div>
        <select class="${ROOT_CLASS}__webgl-pixel-ratio-selector" data-id="${ids.webGLPixelRatioSelector}">
          ${webGLPixelRatioOptions}
        </select>
      </div>
      <div class="${ROOT_CLASS}__bgm-volume">
        <div class="${ROOT_CLASS}__bgm-volume-caption">BGM音量</div>
        <input class="${ROOT_CLASS}__bgm-volume-selector" type="range" min="0" max="1" step="0.1" value="${config.bgmVolume}" data-id="${ids.bgmVolumeSelector}">
        <div class="${ROOT_CLASS}__bgm-volume-value" data-id="${ids.bgmVolumeValue}">${soundVolumeLabel(config.bgmVolume)}</div>
      </div>
      <div class="${ROOT_CLASS}__se-volume">
        <div class="${ROOT_CLASS}__se-volume-caption">SE音量</div>
        <input class="${ROOT_CLASS}__se-volume-selector" type="range" min="0" max="1" step="0.1" value="${config.seVolume}" data-id="${ids.seVolumeSelector}">
        <div class="${ROOT_CLASS}__se-volume-value" data-id="${ids.seVolumeValue}">${soundVolumeLabel(config.seVolume)}</div>
      </div>
    </div>
    <div class="${ROOT_CLASS}__footer">
      <button class="${ROOT_CLASS}__prev" data-id="${ids.prev}">戻る</button>
      <button class="${ROOT_CLASS}__config-change" data-id="${ids.configChange}">この設定にする</button>
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  battleAnimationTimeScaleSelector: HTMLSelectElement,
  webGLPixelRatioSelector: HTMLSelectElement,
  bgmVolumeSelector: HTMLInputElement,
  bgmVolumeValue: HTMLElement,
  seVolumeSelector: HTMLInputElement,
  seVolumeValue: HTMLElement,
  prev: HTMLElement,
  configChange: HTMLElement,
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
export function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const extractedBattleAnimationTimeScaleSelector = root.querySelector(`[data-id="${ids.battleAnimationTimeScaleSelector}"]`);
  const battleAnimationTimeScaleSelector = (extractedBattleAnimationTimeScaleSelector instanceof HTMLSelectElement)
    ? extractedBattleAnimationTimeScaleSelector : document.createElement('select');
  const extractedWebGlPixelRatioSelector = root.querySelector(`[data-id="${ids.webGLPixelRatioSelector}"]`);
  const webGLPixelRatioSelector = (extractedWebGlPixelRatioSelector instanceof HTMLSelectElement)
    ? extractedWebGlPixelRatioSelector : document.createElement('select');
  const extractedBGMVolumeSelector = root.querySelector(`[data-id="${ids.bgmVolumeSelector}"]`);
  const bgmVolumeSelector = (extractedBGMVolumeSelector instanceof HTMLInputElement)
    ? extractedBGMVolumeSelector : document.createElement('input');
  const bgmVolumeValue = root.querySelector(`[data-id="${ids.bgmVolumeValue}"]`) ?? document.createElement('div');
  const extractedSeVolumeSelector = root.querySelector(`[data-id="${ids.seVolumeSelector}"]`);
  const seVolumeSelector = (extractedSeVolumeSelector instanceof HTMLInputElement)
    ? extractedSeVolumeSelector : document.createElement('input');
  const seVolumeValue = root.querySelector(`[data-id="${ids.seVolumeValue}"]`) ?? document.createElement('div');
  const prev = root.querySelector(`[data-id="${ids.prev}"]`) ?? document.createElement('button');
  const configChange = root.querySelector(`[data-id="${ids.configChange}"]`) ?? document.createElement('button');
  return {
    battleAnimationTimeScaleSelector,
    webGLPixelRatioSelector,
    prev,
    configChange,
    bgmVolumeSelector,
    bgmVolumeValue,
    seVolumeSelector,
    seVolumeValue
  };
}