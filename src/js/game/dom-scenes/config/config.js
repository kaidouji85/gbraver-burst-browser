// @flow
import {Howl} from "howler";
import type {GbraverBurstBrowserConfig, WebGLPixelRatio} from "../../config/browser-config";
import {isConfigChanged, parseWebGLPixelRatio, WebGLPixelRatios,} from "../../config/browser-config";
import type {DOMScene} from "../dom-scene";
import {domUuid} from "../../../uuid/dom-uuid";
import {Exclusive} from "../../../exclusive/exclusive";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/stream";
import {createStreamSource} from "../../../stream/stream";
import type {PushDOM} from "../../../dom/push/push-dom";
import {pushDOMStream} from "../../../dom/push/push-dom";
import {pop} from "../../../dom/animation/pop";
import type {Resources} from "../../../resource";
import {SOUND_IDS} from "../../../resource/sound";
import {ConfigChangedDialog} from "./config-changed-dialog";

/** ルート要素のclass属性 */
const ROOT_CLASS = 'config';

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
      value="${value}" ${value===config.webGLPixelRatio ? 'selected' : ""}>
      ${Number(value).toFixed(2)}
    </option>`;
  const webGLPixelRatioOptions = WebGLPixelRatios
    .map(v => webGLPixelRatioOption(v))
    .reduce((a, b) => a + b);
  return `
    <div class="${ROOT_CLASS}__title">設定</div>
    <div class="${ROOT_CLASS}__configs">
      <div class="${ROOT_CLASS}__configs__webgl-pixel-ratio">
        <div class="${ROOT_CLASS}__configs__webgl-pixel-ratio__caption">戦闘画面のピクセルレート</div>
        <select class="${ROOT_CLASS}__configs__webgl-pixel-ratio__selector" data-id="${ids.webGLPixelRatioSelector}">
          ${webGLPixelRatioOptions}
        </select>
      </div>
    </div>
    <div class="${ROOT_CLASS}__footer">
      <button class="${ROOT_CLASS}__footer__prev" data-id="${ids.prev}">戻る</button>
      <button class="${ROOT_CLASS}__footer__config-change" data-id="${ids.configChange}">この設定にする</button>
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
export class Config implements DOMScene {
  _originConfig: GbraverBurstBrowserConfig;
  _root: HTMLElement;
  _webGLPixelRatioSelector: HTMLSelectElement;
  _prevButton: HTMLElement;
  _configChangeButton: HTMLElement;
  _dialog: ConfigChangedDialog;
  _changeValue: typeof Howl;
  _pushButton: typeof Howl;
  _exclusive: Exclusive;
  _prev: StreamSource<void>;
  _configChange: StreamSource<GbraverBurstBrowserConfig>;
  _unsubscriver: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param config Gブレイバーバースト ブラウザ側設定項目
   */
  constructor(resources: Resources, config: GbraverBurstBrowserConfig) {
    this._originConfig = config;
    const ids = {webGLPixelRatioSelector: domUuid(), prev: domUuid(), configChange: domUuid()};
    this._root = document.createElement('div');
    this._root.innerHTML = rootInnerHTML(ids, config);
    this._root.className = ROOT_CLASS;
    const elements = extractElements(this._root, ids);
    this._webGLPixelRatioSelector = elements.webGLPixelRatioSelector;
    this._prevButton = elements.prev;
    this._configChangeButton = elements.configChange;
    this._pushButton = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)?.sound ?? new Howl();
    this._changeValue = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)?.sound ?? new Howl();

    this._dialog = new ConfigChangedDialog(resources);
    this._root.appendChild(this._dialog.getRootHTMLElement());

    this._exclusive = new Exclusive();
    this._prev = createStreamSource();
    this._configChange = createStreamSource();
    this._unsubscriver = [
      pushDOMStream(this._prevButton).subscribe(action => {
        this._onPrevButtonPush(action);
      }),
      pushDOMStream(this._configChangeButton).subscribe(action => {
        this._onConfigChangeButtonPush(action);
      }),
      this._dialog.closeNotifier().subscribe(() => {
        this._onDialogClose();
      }),
      this._dialog.discardNotifier().subscribe(() => {
        this._onDiscardConfigChange();
      }),
      this._dialog.acceptNotifier().subscribe(() => {
        this._onAcceptConfigChange();
      }),
    ];
  }

  /** @override */
  destructor(): void {
    this._unsubscriver.forEach(v => {
      v.unsubscribe();
    });
    this._dialog.destructor();
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }

  /**
   * 戻る通知
   *
   * @return 通知ストリーム
   */
  prevNotifier(): Stream<void> {
    return this._prev;
  }

  /**
   * 設定変更通知
   *
   * @return 通知ストリーム
   */
  configChangeNotifier(): Stream<GbraverBurstBrowserConfig> {
    return this._configChange;
  }

  /**
   * 戻るボタンを押した際の処理
   *
   * @param action アクション
   */
  _onPrevButtonPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this._exclusive.execute(async () => {
      await Promise.all([
        pop(this._prevButton),
        this._changeValue.play()
      ]);
      const updatedConfig = this._parseConfig();
      if (isConfigChanged(this._originConfig, updatedConfig)) {
        this._dialog.show();
        return;
      }
      this._prev.next();
    });
  }

  /**
   * 設定変更するボタンを押した際の処理
   *
   * @param action アクション
   */
  _onConfigChangeButtonPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this._exclusive.execute(async () => {
      this._isInputDisabled(true);
      await Promise.all([
        pop(this._configChangeButton),
        this._pushButton.play()
      ]);
      const config = this._parseConfig();
      this._configChange.next(config);
    });
  }

  /**
   * 設定変更通知ダイアログを閉じた時の処理
   */
  _onDialogClose() {
    this._exclusive.execute(async () => {
      this._dialog.hidden();
    });
  }

  /**
   * 設定変更ダイアログで「設定変更を破棄」を選択した時の処理
   */
  _onDiscardConfigChange() {
    this._exclusive.execute(async () => {
      this._prev.next();
    });
  }

  /**
   * 設定変更ダイアログで「この設定にする」を選択した時の処理
   */
  _onAcceptConfigChange() {
    this._exclusive.execute(async () => {
      const config = this._parseConfig();
      this._configChange.next(config);
    });
  }

  /**
   * 本シーンの入力要素が操作可能であるか否かの設定をする
   *
   * @param isDisabled trueで操作可能である
   */
  _isInputDisabled(isDisabled: boolean): void {
    this._webGLPixelRatioSelector.disabled = isDisabled;
  }

  /**
   * 画面の入力値から設定オブジェクトをパースする
   *
   * @return パース結果
   */
  _parseConfig(): GbraverBurstBrowserConfig {
    const webGLPixelRatio = parseWebGLPixelRatio(this._webGLPixelRatioSelector.value) ?? WebGLPixelRatios[0];
    const battleAnimeSpeed = 1; // TODO 設定画面の値をセットする
    return {webGLPixelRatio, battleAnimeSpeed};
  }
}