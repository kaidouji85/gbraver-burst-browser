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
    <option class="${ROOT_CLASS}__battle-animation-time-scale-option"
      value="${value}" ${value===config.battleAnimationTimeScale ? 'selected' : ""}>
      ${Math.floor(1/value)}倍
    </option>`;
  const battleAnimationTimeScaleOptions = BattleAnimationTimeScales.map(v => battleAnimationTimeScaleOption(v))
    .reduce((a, b) => a + b);
  const webGLPixelRatioOption  = (value: WebGLPixelRatio) => `
    <option class="${ROOT_CLASS}__webgl-pixel-ratio-selector-option" 
      value="${value}" ${value===config.webGLPixelRatio ? 'selected' : ""}>
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
  #originConfig: GbraverBurstBrowserConfig;
  #root: HTMLElement;
  #battleAnimationTimeScaleSelector: HTMLSelectElement;
  #webGLPixelRatioSelector: HTMLSelectElement;
  #bgmVolumeSelector: HTMLInputElement;
  #bgmVolumeValue: HTMLElement;
  #seVolumeSelector: HTMLInputElement;
  #seVolumeValue: HTMLElement;
  #prevButton: HTMLElement;
  #configChangeButton: HTMLElement;
  #dialog: ConfigChangedDialog;
  #changeValue: typeof Howl;
  #pushButton: typeof Howl;
  #exclusive: Exclusive;
  #prev: StreamSource<void>;
  #configChange: StreamSource<GbraverBurstBrowserConfig>;
  #unsubscriber: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param config Gブレイバーバースト ブラウザ側設定項目
   */
  constructor(resources: Resources, config: GbraverBurstBrowserConfig) {
    this.#originConfig = config;
    const ids = {battleAnimationTimeScaleSelector: domUuid(), webGLPixelRatioSelector: domUuid(),
      bgmVolumeSelector: domUuid(), bgmVolumeValue: domUuid(), seVolumeSelector: domUuid(), seVolumeValue: domUuid(),
      prev: domUuid(), configChange: domUuid()};
    this.#root = document.createElement('div');
    this.#root.innerHTML = rootInnerHTML(ids, config);
    this.#root.className = ROOT_CLASS;
    const elements = extractElements(this.#root, ids);
    this.#battleAnimationTimeScaleSelector = elements.battleAnimationTimeScaleSelector;
    this.#webGLPixelRatioSelector = elements.webGLPixelRatioSelector;
    this.#bgmVolumeSelector = elements.bgmVolumeSelector;
    this.#bgmVolumeValue = elements.bgmVolumeValue;
    this.#seVolumeSelector = elements.seVolumeSelector;
    this.#seVolumeValue = elements.seVolumeValue;
    this.#prevButton = elements.prev;
    this.#configChangeButton = elements.configChange;
    this.#pushButton = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)?.sound ?? new Howl();
    this.#changeValue = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)?.sound ?? new Howl();

    this.#dialog = new ConfigChangedDialog(resources);
    this.#root.appendChild(this.#dialog.getRootHTMLElement());

    this.#exclusive = new Exclusive();
    this.#prev = createStreamSource();
    this.#configChange = createStreamSource();
    this.#unsubscriber = [
      inputDOMStream(this.#bgmVolumeSelector).subscribe(action => {
        this.#onBGMVolumeChange(action);
      }),
      inputDOMStream(this.#seVolumeSelector).subscribe(action => {
        this.#onSEVolumeChange(action);
      }),
      pushDOMStream(this.#prevButton).subscribe(action => {
        this.#onPrevButtonPush(action);
      }),
      pushDOMStream(this.#configChangeButton).subscribe(action => {
        this.#onConfigChangeButtonPush(action);
      }),
      this.#dialog.closeNotifier().subscribe(() => {
        this.#onDialogClose();
      }),
      this.#dialog.discardNotifier().subscribe(() => {
        this.#onDiscardConfigChange();
      }),
      this.#dialog.acceptNotifier().subscribe(() => {
        this.#onAcceptConfigChange();
      }),
    ];
  }

  /** @override */
  destructor(): void {
    this.#unsubscriber.forEach(v => {
      v.unsubscribe();
    });
    this.#dialog.destructor();
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * 戻る通知
   *
   * @return 通知ストリーム
   */
  prevNotifier(): Stream<void> {
    return this.#prev;
  }

  /**
   * 設定変更通知
   *
   * @return 通知ストリーム
   */
  configChangeNotifier(): Stream<GbraverBurstBrowserConfig> {
    return this.#configChange;
  }

  /**
   * BGM音量を変更した際の処理
   *
   * @param action アクション
   */
  #onBGMVolumeChange(action: InputDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#exclusive.execute(async () => {
      const value = parseSoundVolume(this.#bgmVolumeSelector.value) ?? 1;
      this.#bgmVolumeValue.innerText = soundVolumeLabel(value);
    });
  }

  /**
   * SE音量を変更した際の処理
   *
   * @param action アクション
   */
  #onSEVolumeChange(action: InputDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#exclusive.execute(async () => {
      const value = parseSoundVolume(this.#seVolumeSelector.value) ?? 1;
      this.#seVolumeValue.innerText = soundVolumeLabel(value);
    });
  }

  /**
   * 戻るボタンを押した際の処理
   *
   * @param action アクション
   */
  #onPrevButtonPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#exclusive.execute(async () => {
      await Promise.all([
        pop(this.#prevButton),
        this.#changeValue.play()
      ]);
      const updatedConfig = this.#parseConfig();
      if (isConfigChanged(this.#originConfig, updatedConfig)) {
        this.#dialog.show();
        return;
      }
      this.#prev.next();
    });
  }

  /**
   * 設定変更するボタンを押した際の処理
   *
   * @param action アクション
   */
  #onConfigChangeButtonPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#exclusive.execute(async () => {
      this.#isInputDisabled(true);
      await Promise.all([
        pop(this.#configChangeButton),
        this.#pushButton.play()
      ]);
      const config = this.#parseConfig();
      this.#configChange.next(config);
    });
  }

  /**
   * 設定変更通知ダイアログを閉じた時の処理
   */
  #onDialogClose() {
    this.#exclusive.execute(async () => {
      this.#dialog.hidden();
    });
  }

  /**
   * 設定変更ダイアログで「設定変更を破棄」を選択した時の処理
   */
  #onDiscardConfigChange() {
    this.#exclusive.execute(async () => {
      this.#prev.next();
    });
  }

  /**
   * 設定変更ダイアログで「この設定にする」を選択した時の処理
   */
  #onAcceptConfigChange() {
    this.#exclusive.execute(async () => {
      const config = this.#parseConfig();
      this.#configChange.next(config);
    });
  }

  /**
   * 本シーンの入力要素が操作可能であるか否かの設定をする
   *
   * @param isDisabled trueで操作可能である
   */
  #isInputDisabled(isDisabled: boolean): void {
    this.#webGLPixelRatioSelector.disabled = isDisabled;
    this.#battleAnimationTimeScaleSelector.disabled = isDisabled;
    this.#bgmVolumeSelector.disabled = isDisabled;
    this.#seVolumeSelector.disabled = isDisabled;
  }

  /**
   * 画面の入力値から設定オブジェクトをパースする
   *
   * @return パース結果
   */
  #parseConfig(): GbraverBurstBrowserConfig {
    const battleAnimationTimeScale = parseBattleAnimationTimeScale(this.#battleAnimationTimeScaleSelector.value) ?? BattleAnimationTimeScales[0];
    const webGLPixelRatio = parseWebGLPixelRatio(this.#webGLPixelRatioSelector.value) ?? WebGLPixelRatios[0];
    const bgmVolume = parseSoundVolume(this.#bgmVolumeSelector.value) ?? SoundVolumes[0];
    const seVolume = parseSoundVolume(this.#seVolumeSelector.value) ?? SoundVolumes[0];
    return {battleAnimationTimeScale, webGLPixelRatio, bgmVolume, seVolume};
  }
}