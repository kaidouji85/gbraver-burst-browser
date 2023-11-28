import { Howl } from "howler";
import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import type { GBraverBurstBrowserConfig } from "../../game/config/browser-config";
import type { Resources } from "../../resource";
import { SOUND_IDS } from "../../resource/sound";
import { domUuid } from "../../uuid/dom-uuid";
import { ConfigChangedDialog } from "./config-changed-dialog";
import { ROOT_CLASS } from "./dom/class-name";
import { extractElements } from "./dom/elements";
import { rootInnerHTML } from "./dom/root-inner-html";

/** 設定画面プロパティ */
export type ConfigProps = {
  /** 画面を開く前のブラウザ設定 */
  originConfig: GBraverBurstBrowserConfig;
  /** ルートHTML要素 */
  root: HTMLElement;
  /** 戦闘アニメ速度セレクタ */
  battleAnimationTimeScaleSelector: HTMLElement;
  /** webglピクセルレートセレクタ */
  webGLPixelRatioSelector: HTMLElement;
  /** 戦闘画面コントローラセレクタ */
  battleControllerTypeSelector: HTMLElement;
  /** bgm音量セレクタ */
  bgmVolumeSelector: HTMLInputElement;
  /** bgm音量値 */
  bgmVolumeValue: HTMLElement;
  /** se音量セレクタ */
  seVolumeSelector: HTMLInputElement;
  /** se音量値 */
  seVolumeValue: HTMLElement;
  /** パフォーマンス統計表示設定セレクタ */
  performanceStatsVisibilitySelector: HTMLElement;
  /** 戻るボタン */
  prevButton: HTMLElement;
  /** 設定変更ボタン */
  configChangeButton: HTMLElement;
  /** 設定変更通知ダイアログ */
  dialog: ConfigChangedDialog;
  /** SE 値変更 */
  changeValue: Howl;
  /** SE ボタン押下 */
  pushButton: Howl;
  /** 排他制御 */
  exclusive: Exclusive;
  /** 戻るストリーム */
  prev: Subject<void>;
  /** 設定変更ストリーム */
  configChange: Subject<GBraverBurstBrowserConfig>;
};

/**
 * 設定画面プロパティを生成する
 * @param resources リソース管理オブジェクト
 * @param config ブラウザ設定
 * @return 生成した設定画面プロパティ
 */
export function createConfigProps(
  resources: Resources,
  config: GBraverBurstBrowserConfig,
): ConfigProps {
  const ids = {
    battleAnimationTimeScaleSelector: domUuid(),
    webGLPixelRatioSelector: domUuid(),
    battleControllerTypeSelector: domUuid(),
    bgmVolumeSelector: domUuid(),
    bgmVolumeValue: domUuid(),
    seVolumeSelector: domUuid(),
    seVolumeValue: domUuid(),
    performanceStatsVisibilitySelector: domUuid(),
    prev: domUuid(),
    configChange: domUuid(),
  };
  const root = document.createElement("div");
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
    battleControllerTypeSelector: elements.battleControllerTypeSelector,
    bgmVolumeValue: elements.bgmVolumeValue,
    seVolumeSelector: elements.seVolumeSelector,
    seVolumeValue: elements.seVolumeValue,
    prevButton: elements.prev,
    performanceStatsVisibilitySelector:
      elements.performanceStatsVisibilitySelector,
    configChangeButton: elements.configChange,
    dialog,
    pushButton:
      resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON)?.sound ??
      new Howl({ src: "" }),
    changeValue:
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE)?.sound ??
      new Howl({ src: "" }),
    exclusive: new Exclusive(),
    prev: new Subject<void>(),
    configChange: new Subject<GBraverBurstBrowserConfig>(),
  };
}
