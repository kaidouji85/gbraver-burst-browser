import { Subject } from "rxjs";

import { BGMManager } from "../../bgm/bgm-manager";
import { Exclusive } from "../../exclusive/exclusive";
import { GBraverBurstBrowserConfig } from "../../game/config/browser-config";
import { Resources } from "../../resource";
import { createEmptySoundResource } from "../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../resource/sound/ids";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayer } from "../../se/se-player";
import { ConfigChangedDialog } from "./config-changed-dialog";
import { ROOT_CLASS } from "./dom/class-name";
import {
  extractBattleAnimationTimeScaleSelector,
  extractBattleControllerTypeSelector,
  extractBgmVolumeSelector,
  extractBgmVolumeValue,
  extractConfigChange,
  extractPerformanceStatsVisibilitySelector,
  extractPlayerSelectorTypeSelector,
  extractPrev,
  extractSeVolumeSelector,
  extractSeVolumeValue,
  extractWebGLPixelRatioSelector,
} from "./dom/elements";
import { rootInnerHTML } from "./dom/root-inner-html";

/** 設定画面プロパティ */
export type ConfigProps = {
  /** 画面を開く前のブラウザ設定 */
  originConfig: GBraverBurstBrowserConfig;

  /** ルートHTML要素 */
  root: HTMLElement;
  /** ロボ、パイロット選択タイプセレクタ */
  playerSelectorType: HTMLElement;
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
  resources: Resources;
  /** ブラウザ設定 */
  config: GBraverBurstBrowserConfig;
  /** BGM管理オブジェクト */
  bgm: BGMManager;
  /** SE再生オブジェクト */
  se: SEPlayer;
};

/**
 * 設定画面プロパティを生成する
 * @param params パラメータ
 * @return 生成した設定画面プロパティ
 */
export function createConfigProps(params: PropsCreatorParams): ConfigProps {
  const { resources, config, bgm, se } = params;
  const root = document.createElement("div");
  root.innerHTML = rootInnerHTML(config);
  root.className = ROOT_CLASS;
  const dialog = new ConfigChangedDialog(params);
  root.appendChild(dialog.getRootHTMLElement());
  return {
    originConfig: config,

    root,
    playerSelectorType: extractPlayerSelectorTypeSelector(root),
    battleAnimationTimeScaleSelector:
      extractBattleAnimationTimeScaleSelector(root),
    webGLPixelRatioSelector: extractWebGLPixelRatioSelector(root),
    bgmVolumeSelector: extractBgmVolumeSelector(root),
    battleControllerTypeSelector: extractBattleControllerTypeSelector(root),
    bgmVolumeValue: extractBgmVolumeValue(root),
    seVolumeSelector: extractSeVolumeSelector(root),
    seVolumeValue: extractSeVolumeValue(root),
    prevButton: extractPrev(root),
    performanceStatsVisibilitySelector:
      extractPerformanceStatsVisibilitySelector(root),
    configChangeButton: extractConfigChange(root),

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
