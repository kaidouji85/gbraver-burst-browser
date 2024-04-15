import { Subject } from "rxjs";

import { BGMManager } from "../../bgm/bgm-manager";
import { Exclusive } from "../../exclusive/exclusive";
import type { GBraverBurstBrowserConfig } from "../../game/config/browser-config";
import type { Resources } from "../../resource";
import { createEmptySoundResource } from "../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../resource/sound/ids";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayer } from "../../se/se-player";
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
  changeValue: SoundResource;
  /** SE ボタン押下 */
  pushButton: SoundResource;

  /** BGM管理オブジェクト */
  bgm: BGMManager;
  /** SE再生オブジェクト */
  se: SEPlayer;

  /** 排他制御 */
  exclusive: Exclusive;

  /** 戻るストリーム */
  prev: Subject<void>;
  /** 設定変更ストリーム */
  configChange: Subject<GBraverBurstBrowserConfig>;
};

/** プロパティ生成関数のパラメータ */
export type PropsCreatorParams = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** ブラウザ設定 */
  config: GBraverBurstBrowserConfig,
  /** BGM管理オブジェクト */
  bgm: BGMManager,
  /** SE再生オブジェクト */
  se: SEPlayer,
}

/**
 * 設定画面プロパティを生成する
 * @param params パラメータ
 * @return 生成した設定画面プロパティ
 */
export function createConfigProps(params: PropsCreatorParams): ConfigProps {
  const { resources, config, bgm, se } = params;
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
  const dialog = new ConfigChangedDialog(params);
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
      resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
      createEmptySoundResource(),
    changeValue:
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
      createEmptySoundResource(),

    bgm,
    se,

    exclusive: new Exclusive(),

    prev: new Subject<void>(),
    configChange: new Subject<GBraverBurstBrowserConfig>(),
  };
}
