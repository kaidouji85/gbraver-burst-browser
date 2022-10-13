// @flow
import {pop} from "../../../dom/animation";
import type {PushDOM} from "../../../dom/event-stream";
import {inputDOMStream, pushDOMStream} from "../../../dom/event-stream";
import type {Resources} from "../../../resource";
import type {Stream, Unsubscriber} from "../../../stream/stream";
import type {GbraverBurstBrowserConfig} from "../../config/browser-config";
import {
  BattleAnimationTimeScales,
  parseBattleAnimationTimeScale,
  parseSoundVolume,
  parseWebGLPixelRatio,
  SoundVolumes,
  WebGLPixelRatios
} from "../../config/browser-config";
import type {DOMScene} from "../dom-scene";
import {onBGMVolumeChange} from "./listeners/on-bgm-volume-change";
import {onPrevButtonPush} from "./listeners/on-prev-button-push";
import {onSEVolumeChange} from "./listeners/on-se-volume-change";
import type {ConfigProps} from "./props";
import {createConfigProps} from "./props";

/** 設定画面 */
export class Config implements DOMScene {
  #props: ConfigProps;
  #unsubscriber: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param config Gブレイバーバースト ブラウザ側設定項目
   */
  constructor(resources: Resources, config: GbraverBurstBrowserConfig) {
    this.#props = createConfigProps(resources, config);
    this.#unsubscriber = [
      inputDOMStream(this.#props.bgmVolumeSelector).subscribe(action => {
        onBGMVolumeChange(this.#props, action);
      }),
      inputDOMStream(this.#props.seVolumeSelector).subscribe(action => {
        onSEVolumeChange(this.#props, action);
      }),
      pushDOMStream(this.#props.prevButton).subscribe(action => {
        onPrevButtonPush(this.#props, action);
      }),
      pushDOMStream(this.#props.configChangeButton).subscribe(action => {
        this.#onConfigChangeButtonPush(action);
      }),
      this.#props.dialog.closeNotifier().subscribe(() => {
        this.#onDialogClose();
      }),
      this.#props.dialog.discardNotifier().subscribe(() => {
        this.#onDiscardConfigChange();
      }),
      this.#props.dialog.acceptNotifier().subscribe(() => {
        this.#onAcceptConfigChange();
      }),
    ];
  }

  /** @override */
  destructor(): void {
    this.#unsubscriber.forEach(v => {
      v.unsubscribe();
    });
    this.#props.dialog.destructor();
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * 戻る通知
   *
   * @return 通知ストリーム
   */
  prevNotifier(): Stream<void> {
    return this.#props.prev;
  }

  /**
   * 設定変更通知
   *
   * @return 通知ストリーム
   */
  configChangeNotifier(): Stream<GbraverBurstBrowserConfig> {
    return this.#props.configChange;
  }

  /**
   * 設定変更するボタンを押した際の処理
   *
   * @param action アクション
   */
  #onConfigChangeButtonPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#props.exclusive.execute(async () => {
      this.#isInputDisabled(true);
      await Promise.all([
        pop(this.#props.configChangeButton),
        this.#props.pushButton.play()
      ]);
      const config = this.#parseConfig();
      this.#props.configChange.next(config);
    });
  }

  /**
   * 設定変更通知ダイアログを閉じた時の処理
   */
  #onDialogClose() {
    this.#props.exclusive.execute(async () => {
      this.#props.dialog.hidden();
    });
  }

  /**
   * 設定変更ダイアログで「設定変更を破棄」を選択した時の処理
   */
  #onDiscardConfigChange() {
    this.#props.exclusive.execute(async () => {
      this.#props.prev.next();
    });
  }

  /**
   * 設定変更ダイアログで「この設定にする」を選択した時の処理
   */
  #onAcceptConfigChange() {
    this.#props.exclusive.execute(async () => {
      const config = this.#parseConfig();
      this.#props.configChange.next(config);
    });
  }

  /**
   * 本シーンの入力要素が操作可能であるか否かの設定をする
   *
   * @param isDisabled trueで操作可能である
   */
  #isInputDisabled(isDisabled: boolean): void {
    this.#props.webGLPixelRatioSelector.disabled = isDisabled;
    this.#props.battleAnimationTimeScaleSelector.disabled = isDisabled;
    this.#props.bgmVolumeSelector.disabled = isDisabled;
    this.#props.seVolumeSelector.disabled = isDisabled;
  }

  /**
   * 画面の入力値から設定オブジェクトをパースする
   *
   * @return パース結果
   */
  #parseConfig(): GbraverBurstBrowserConfig {
    const battleAnimationTimeScale = parseBattleAnimationTimeScale(this.#props.battleAnimationTimeScaleSelector.value) ?? BattleAnimationTimeScales[0];
    const webGLPixelRatio = parseWebGLPixelRatio(this.#props.webGLPixelRatioSelector.value) ?? WebGLPixelRatios[0];
    const bgmVolume = parseSoundVolume(this.#props.bgmVolumeSelector.value) ?? SoundVolumes[0];
    const seVolume = parseSoundVolume(this.#props.seVolumeSelector.value) ?? SoundVolumes[0];
    return {battleAnimationTimeScale, webGLPixelRatio, bgmVolume, seVolume};
  }
}