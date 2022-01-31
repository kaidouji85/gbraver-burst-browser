// @flow

import type {
  GbraverBurstBrowserConfig,
  WebGLPixelRatio,
} from "../../config/browser-config";
import {WebGLPixelRatios} from "../../config/browser-config";
import type {DOMScene} from "../dom-scene";
import {domUuid} from "../../../uuid/dom-uuid";

/** ルート要素のclass属性 */
const ROOT_CLASS = 'config-scene';

/** data-idを集めたもの */
type DataIDs = {
  webGLPixelRatioSelector: string,
  prev: string,
  configChange: string,
};

/**
 * ルート要素のHTML要素
 *
 * @param ids data-idを集めたもの
 * @param config Gブレイバーバースト ブラウザ側設定項目
 * @return ルート要素のHTML要素
 */
function rootInnerHTML(ids: DataIDs, config: GbraverBurstBrowserConfig) {
  const webGLPixelRatioOption  = (value: WebGLPixelRatio) => `
    <option class="${ROOT_CLASS}__configs__webgl-pixel-ratio__selector__${value}" 
      value="${value}" ${value===config.webGLPixelRatio ? 'selected' : ""}>${value}</option>`;
  const webGLPixelRatioOptions = WebGLPixelRatios
    .map(v => webGLPixelRatioOption(v))
    .reduce((a, b) => a + b);
  return `
    <div class="${ROOT_CLASS}__title">設定</div>
    <div class="${ROOT_CLASS}__configs">
      <div class="${ROOT_CLASS}__configs__webgl-pixel-ratio">
        <div class="${ROOT_CLASS}__configs__webgl-pixel-ratio__caption">WebGLピクセルレート</div>
        <select class="${ROOT_CLASS}__configs__webgl-pixel-ratio__selector" data-id="${ids.webGLPixelRatioSelector}">
          ${webGLPixelRatioOptions}
        </select>
      </div>
    </div>
    <div class="${ROOT_CLASS}__footer">
      <button class="${ROOT_CLASS}__footer__prev" data-id="${ids.prev}">戻る</button>
      <button class="${ROOT_CLASS}__footer__config-change" data-ids="${ids.configChange}">設定変更する</button>
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  webGLPixelRatioSelector: HTMLSelectElement,
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
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const extractedWebGlPixelRatioSelector = root.querySelector(`[data-id="${ids.webGLPixelRatioSelector}"]`);
  const webGLPixelRatioSelector = (extractedWebGlPixelRatioSelector instanceof HTMLSelectElement) 
    ? extractedWebGlPixelRatioSelector : document.createElement('select');
  const prev = root.querySelector(`[data-id="${ids.prev}"]`) ?? document.createElement('button');
  const configChange = root.querySelector(`[data-id="${ids.configChange}"]`) ?? document.createElement('button');
  return {webGLPixelRatioSelector, prev, configChange};
}

/** 設定画面 */
export class ConfigScene implements DOMScene {
  _root: HTMLElement;

  /**
   * コンストラクタ
   *
   * @param config Gブレイバーバースト ブラウザ側設定項目
   */
  constructor(config: GbraverBurstBrowserConfig) {
    const ids = {webGLPixelRatioSelector: domUuid(), prev: domUuid(), configChange: domUuid()};
    this._root = document.createElement('div');
    this._root.innerHTML = rootInnerHTML(ids, config);
    this._root.className = ROOT_CLASS;
  }

  /** @override */
  destructor(): void {
    // NOP
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}