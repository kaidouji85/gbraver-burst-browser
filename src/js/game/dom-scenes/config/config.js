// @flow
import {Howl} from "howler";
import {pop} from "../../../dom/animation";
import type {InputDOM, PushDOM} from "../../../dom/event-stream";
import {inputDOMStream, pushDOMStream} from "../../../dom/event-stream";
import {Exclusive} from "../../../exclusive/exclusive";
import type {Resources} from "../../../resource";
import {SOUND_IDS} from "../../../resource/sound";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/stream";
import {createStreamSource} from "../../../stream/stream";
import {domUuid} from "../../../uuid/dom-uuid";
import type {
  BattleAnimationTimeScale,
  GbraverBurstBrowserConfig,
  SoundVolume,
  WebGLPixelRatio
} from "../../config/browser-config";
import {
  BattleAnimationTimeScales,
  isConfigChanged,
  parseBattleAnimationTimeScale,
  parseSoundVolume,
  parseWebGLPixelRatio,
  SoundVolumes,
  WebGLPixelRatios
} from "../../config/browser-config";
import type {DOMScene} from "../dom-scene";
import {ConfigChangedDialog} from "./config-changed-dialog";

/** ルート要素のclass属性 */
const ROOT_CLASS = 'config';

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
function soundVolumeLabel(volume: SoundVolume): string {
  return volume.toFixed(1);
}

/**
 * ルート要素のHTML要素
 *
 * @param ids data-idを集めたもの
 * @param config Gブレイバーバースト ブラウザ側設定項目
 * @return ルート要素のHTML要素
 */
function rootInnerHTML(ids: DataIDs, config: GbraverBurstBrowserConfig) {
  const battleAnimationTimeScaleOption = (value: BattleAnimationTimeScale) => `
    <option class="${ROOT_CLASS}__configs__battle-animation-time-scale__selector__option"
      value="${value}" ${value===config.battleAnimationTimeScale ? 'selected' : ""}>
      ${Math.floor(1/value)}倍
    </option>`;
  const battleAnimationTimeScaleOptions = BattleAnimationTimeScales.map(v => battleAnimationTimeScaleOption(v))
    .reduce((a, b) => a + b);
  const webGLPixelRatioOption  = (value: WebGLPixelRatio) => `
    <option class="${ROOT_CLASS}__configs__webgl-pixel-ratio__selector__option" 
      value="${value}" ${value===config.webGLPixelRatio ? 'selected' : ""}>
      ${Number(value).toFixed(2)}
    </option>`;
  const webGLPixelRatioOptions = WebGLPixelRatios.map(v => webGLPixelRatioOption(v))
    .reduce((a, b) => a + b);
  return `
    <div class="${ROOT_CLASS}__title">設定</div>
    <div class="${ROOT_CLASS}__configs">
      <div class="${ROOT_CLASS}__configs__battle-animation-time-scale">
        <div class="${ROOT_CLASS}__configs__battle-animation-time-scale__caption">戦闘アニメ再生速度</div>
        <select class="${ROOT_CLASS}__configs__battle-animation-time-scale__selector" data-id="${ids.battleAnimationTimeScaleSelector}">
          ${battleAnimationTimeScaleOptions}
        </select>
      </div>
      <div class="${ROOT_CLASS}__configs__webgl-pixel-ratio">
        <div class="${ROOT_CLASS}__configs__webgl-pixel-ratio__caption">戦闘画面のピクセルレート</div>
        <select class="${ROOT_CLASS}__configs__webgl-pixel-ratio__selector" data-id="${ids.webGLPixelRatioSelector}">
          ${webGLPixelRatioOptions}
        </select>
      </div>
      <div class="${ROOT_CLASS}__configs__bgm-volume">
        <div class="${ROOT_CLASS}__configs__bgm-volume__caption">BGM音量</div>
        <input class="${ROOT_CLASS}__configs__bgm-volume__selector" type="range" min="0" max="1" step="0.1" value="${config.bgmVolume}" data-id="${ids.bgmVolumeSelector}">
        <div class="${ROOT_CLASS}__configs__bgm-volume__value" data-id="${ids.bgmVolumeValue}">${soundVolumeLabel(config.bgmVolume)}</div>
      </div>
      <div class="${ROOT_CLASS}__configs__se-volume">
        <div class="${ROOT_CLASS}__configs__se-volume__caption">SE音量</div>
        <input class="${ROOT_CLASS}__configs__se-volume__selector" type="range" min="0" max="1" step="0.1" value="${config.seVolume}" data-id="${ids.seVolumeSelector}">
        <div class="${ROOT_CLASS}__configs__se-volume__value" data-id="${ids.seVolumeValue}">${soundVolumeLabel(config.seVolume)}</div>
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
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
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
  return {battleAnimationTimeScaleSelector, webGLPixelRatioSelector, prev, configChange, bgmVolumeSelector, bgmVolumeValue, seVolumeSelector, seVolumeValue};
}

/** 設定画面 */
export class Config implements DOMScene {
  _originConfig: GbraverBurstBrowserConfig;
  _root: HTMLElement;
  _battleAnimationTimeScaleSelector: HTMLSelectElement;
  _webGLPixelRatioSelector: HTMLSelectElement;
  _bgmVolumeSelector: HTMLInputElement;
  _bgmVolumeValue: HTMLElement;
  _seVolumeSelector: HTMLInputElement;
  _seVolumeValue: HTMLElement;
  _prevButton: HTMLElement;
  _configChangeButton: HTMLElement;
  _dialog: ConfigChangedDialog;
  _changeValue: typeof Howl;
  _pushButton: typeof Howl;
  _exclusive: Exclusive;
  _prev: StreamSource<void>;
  _configChange: StreamSource<GbraverBurstBrowserConfig>;
  _unsubscriber: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param config Gブレイバーバースト ブラウザ側設定項目
   */
  constructor(resources: Resources, config: GbraverBurstBrowserConfig) {
    this._originConfig = config;
    const ids = {battleAnimationTimeScaleSelector: domUuid(), webGLPixelRatioSelector: domUuid(),
      bgmVolumeSelector: domUuid(), bgmVolumeValue: domUuid(), seVolumeSelector: domUuid(), seVolumeValue: domUuid(),
      prev: domUuid(), configChange: domUuid()};
    this._root = document.createElement('div');
    this._root.innerHTML = rootInnerHTML(ids, config);
    this._root.className = ROOT_CLASS;
    const elements = extractElements(this._root, ids);
    this._battleAnimationTimeScaleSelector = elements.battleAnimationTimeScaleSelector;
    this._webGLPixelRatioSelector = elements.webGLPixelRatioSelector;
    this._bgmVolumeSelector = elements.bgmVolumeSelector;
    this._bgmVolumeValue = elements.bgmVolumeValue;
    this._seVolumeSelector = elements.seVolumeSelector;
    this._seVolumeValue = elements.seVolumeValue;
    this._prevButton = elements.prev;
    this._configChangeButton = elements.configChange;
    this._pushButton = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)?.sound ?? new Howl();
    this._changeValue = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)?.sound ?? new Howl();

    this._dialog = new ConfigChangedDialog(resources);
    this._root.appendChild(this._dialog.getRootHTMLElement());

    this._exclusive = new Exclusive();
    this._prev = createStreamSource();
    this._configChange = createStreamSource();
    this._unsubscriber = [
      inputDOMStream(this._bgmVolumeSelector).subscribe(action => {
        this._onBGMVolumeChange(action);
      }),
      inputDOMStream(this._seVolumeSelector).subscribe(action => {
        this._onSEVolumeChange(action);
      }),
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
    this._unsubscriber.forEach(v => {
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
   * BGM音量を変更した際の処理
   *
   * @param action アクション
   */
  _onBGMVolumeChange(action: InputDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this._exclusive.execute(async () => {
      const value = parseSoundVolume(this._bgmVolumeSelector.value) ?? 1;
      this._bgmVolumeValue.innerText = soundVolumeLabel(value);
    });
  }

  /**
   * SE音量を変更した際の処理
   *
   * @param action アクション
   */
  _onSEVolumeChange(action: InputDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this._exclusive.execute(async () => {
      const value = parseSoundVolume(this._seVolumeSelector.value) ?? 1;
      this._seVolumeValue.innerText = soundVolumeLabel(value);
    });
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
    this._battleAnimationTimeScaleSelector.disabled = isDisabled;
    this._bgmVolumeSelector.disabled = isDisabled;
    this._seVolumeSelector.disabled = isDisabled;
  }

  /**
   * 画面の入力値から設定オブジェクトをパースする
   *
   * @return パース結果
   */
  _parseConfig(): GbraverBurstBrowserConfig {
    const battleAnimationTimeScale = parseBattleAnimationTimeScale(this._battleAnimationTimeScaleSelector.value) ?? BattleAnimationTimeScales[0];
    const webGLPixelRatio = parseWebGLPixelRatio(this._webGLPixelRatioSelector.value) ?? WebGLPixelRatios[0];
    const bgmVolume = parseSoundVolume(this._bgmVolumeSelector.value) ?? SoundVolumes[0];
    const seVolume = parseSoundVolume(this._seVolumeSelector.value) ?? SoundVolumes[0];
    return {battleAnimationTimeScale, webGLPixelRatio, bgmVolume, seVolume};
  }
}