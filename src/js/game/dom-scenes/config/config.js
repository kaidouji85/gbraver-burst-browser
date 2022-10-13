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
import type {GbraverBurstBrowserConfig} from "../../config/browser-config";
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
import {extractElements, ROOT_CLASS, rootInnerHTML, soundVolumeLabel} from "./doms";

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