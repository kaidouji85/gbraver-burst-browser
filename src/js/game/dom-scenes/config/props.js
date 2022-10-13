// @flow
import {Howl} from "howler";
import {Exclusive} from "../../../exclusive/exclusive";
import type {Resources} from "../../../resource";
import {SOUND_IDS} from "../../../resource/sound";
import type {StreamSource} from "../../../stream/stream";
import {createStreamSource} from "../../../stream/stream";
import {domUuid} from "../../../uuid/dom-uuid";
import type {GbraverBurstBrowserConfig} from "../../config/browser-config";
import {ConfigChangedDialog} from "./config-changed-dialog";
import {extractElements, ROOT_CLASS, rootInnerHTML} from "./doms";

/** 設定画面プロパティ */
export type ConfigProps = {
  /** 画面を開く前のブラウザ設定 */
  originConfig: GbraverBurstBrowserConfig,
  /** ルートHTML要素 */
  root: HTMLElement,
  /** 戦闘アニメ速度セレクタ */
  battleAnimationTimeScaleSelector: HTMLSelectElement,
  /** webglピクセルレートセレクタ */
  webGLPixelRatioSelector: HTMLSelectElement,
  /** bgm音量セレクタ */
  bgmVolumeSelector: HTMLInputElement,
  /** bgm音量値 */
  bgmVolumeValue: HTMLElement,
  /** se音量セレクタ */
  seVolumeSelector: HTMLInputElement,
  /** se音量値 */
  seVolumeValue: HTMLElement,
  /** 戻るボタン */
  prevButton: HTMLElement,
  /** 設定変更ボタン */
  configChangeButton: HTMLElement,
  /** 設定変更通知ダイアログ */
  dialog: ConfigChangedDialog,
  /** SE 値変更 */
  changeValue: typeof Howl,
  /** SE ボタン押下 */
  pushButton: typeof Howl,
  /** 排他制御 */
  exclusive: Exclusive,
  /** 戻るストリーム */
  prev: StreamSource<void>,
  /** 設定変更ストリーム */
  configChange: StreamSource<GbraverBurstBrowserConfig>,
};

/**
 * 設定画面プロパティを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param config ブラウザ設定
 * @return 生成した設定画面プロパティ
 */
export function createConfigProps(resources: Resources, config: GbraverBurstBrowserConfig): ConfigProps {
  const ids = {battleAnimationTimeScaleSelector: domUuid(), webGLPixelRatioSelector: domUuid(),
    bgmVolumeSelector: domUuid(), bgmVolumeValue: domUuid(), seVolumeSelector: domUuid(), seVolumeValue: domUuid(),
    prev: domUuid(), configChange: domUuid()};
  const root = document.createElement('div');
  root.innerHTML = rootInnerHTML(ids, config);
  root.className = ROOT_CLASS;
  const elements = extractElements(root, ids);
  const dialog = new ConfigChangedDialog(resources);
  root.appendChild(dialog.getRootHTMLElement());
  return {
    originConfig: config,
    root,
    battleAnimationTimeScaleSelector: elements.battleAnimationTimeScaleSelector,
    webGLPixelRatioSelector: elements.webGLPixelRatioSelector,
    bgmVolumeSelector: elements.bgmVolumeSelector,
    bgmVolumeValue: elements.bgmVolumeValue,
    seVolumeSelector: elements.seVolumeSelector,
    seVolumeValue: elements.seVolumeValue,
    prevButton: elements.prev,
    configChangeButton: elements.configChange,
    dialog,
    pushButton: resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)?.sound ?? new Howl(),
    changeValue: resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)?.sound ?? new Howl(),
    exclusive: new Exclusive(),
    prev: createStreamSource(),
    configChange: createStreamSource(),

  };
}