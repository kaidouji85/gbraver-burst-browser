// @flow

/** キャンバス用画像ID */
export type CanvasImageId = string;

/** キャンバス用画像設定 */
export type CanvasImageConfig = {
  id: CanvasImageId,
  path: string
};

/** キャンバス用画像リソース */
export type CanvasImageResource = {
  id: CanvasImageId,
  image: Image
};

/** キャンバス用画像IDリストをあつめたもの */
export const CANVAS_IMAGE_IDS = {
  // TODO 旧ゲージ系は削除する
  DEPRECATED_GAUGE_BASE: 'DEPRECATED_GAUGE_BASE',
  DEPRECATED_HP_NUMBER: 'DEPRECATED_HP_NUMBER',
  DEPRECATED_BATTERY_NUMBER: 'DEPRECATED_BATTERY_NUMBER',
  DEPRECATED_HP_BAR_DOWN: 'DEPRECATED_HP_BAR_DOWN',
  DEPRECATED_HP_BAR_UP: 'DEPRECATED_HP_BAR_UP',
  DEPRECATED_HP_GAUGE_LABEL: 'DEPRECATED_HP_GAUGE_LABEL',
  DEPRECATED_BATTERY_GAUGE_LABEL: 'DEPRECATED_BATTERY_GAUGE_LABEL',
  DEPRECATED_BURST_GAUGE_ACTIVE: 'DEPRECATED_BURST_GAUGE_ACTIVE',
  DEPRECATED_BURST_GAUGE_DISACTIVE: 'DEPRECATED_BURST_GAUGE_DISACTIVE',

  GAUGE_WINDOW: 'GAUGE_WINDOW',
  ACTIVE_HP_BAR: 'ACTIVE_HP_BAR',
  DIS_ACTIVE_HP_BAR: 'DIS_ACTIVE_HP_BAR',
  ACTIVE_BATTERY_BAR: 'ACTIVE_BATTERY_BAR',
  DIS_ACTIVE_BATTERY_BAR: 'DIS_ACTIVE_BATTERY_BAR',
  GAUGE_BAR_BASE: 'GAUGE_BAR_BASE',
  BATTERY_BAR_UP: 'BATTERY_BAR_UP',
  BATTERY_BAR_DOWN: 'BATTERY_BAR_DOWN',
  BATTERY_SELECTOR_ACTIVE_BAR: 'BATTERY_SELECTOR_ACTIVE_BAR',
  BATTERY_SELECTOR_DIS_ACTIVE_BAR: 'BATTERY_SELECTOR_DIS_ACTIVE_BAR',
  BATTERY_SELECTOR_BASE: 'BATTERY_SELECTOR_BASE',
  BATTERY_SELECTOR_POINTER: 'BATTERY_SELECTOR_POINTER',
  BATTERY_SELECTOR_WINDOW: 'BATTERY_SELECTOR_WINDOW',
  BATTERY_SELECTOR_ATTACK_BUTTON: 'BATTERY_SELECTOR_ATTACK_BUTTON'
};

/** キャンバス用画像設定をあつめたもの */
export const CANVAS_IMAGE_CONFIGS: CanvasImageConfig[] = [
  // TODO 旧ゲージ系は削除する
  {
    id: CANVAS_IMAGE_IDS.DEPRECATED_GAUGE_BASE,
    path: 'deprecated-gauge/gauge-base.png',
  },
  {
    id: CANVAS_IMAGE_IDS.DEPRECATED_HP_NUMBER,
    path: 'deprecated-gauge/number/hp-number.png',
  },
  {
    id: CANVAS_IMAGE_IDS.DEPRECATED_BATTERY_NUMBER,
    path: 'deprecated-gauge/number/battery-number.png',
  },
  {
    id: CANVAS_IMAGE_IDS.DEPRECATED_HP_BAR_DOWN,
    path: 'deprecated-gauge/hp-gauge/hp-bar-down.png'
  },
  {
    id: CANVAS_IMAGE_IDS.DEPRECATED_HP_BAR_UP,
    path: 'deprecated-gauge/hp-gauge/hp-bar-up.png'
  },
  {
    id: CANVAS_IMAGE_IDS.DEPRECATED_HP_GAUGE_LABEL,
    path: 'deprecated-gauge/hp-gauge/hp-gauge-label.png',
  },
  {
    id: CANVAS_IMAGE_IDS.DEPRECATED_BATTERY_GAUGE_LABEL,
    path: 'deprecated-gauge/battery-gauge/battery-gauge-label.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_BAR_UP,
    path: 'deprecated-gauge/battery-gauge/battery-bar-up.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_BAR_DOWN,
    path: 'deprecated-gauge/battery-gauge/battery-bar-down.png',
  },
  {
    id: CANVAS_IMAGE_IDS.DEPRECATED_BURST_GAUGE_ACTIVE,
    path: 'deprecated-gauge/burst-gauge/burst-active.png',
  },
  {
    id: CANVAS_IMAGE_IDS.DEPRECATED_BURST_GAUGE_DISACTIVE,
    path: 'deprecated-gauge/burst-gauge/burst-disactive.png',
  },


  {
    id: CANVAS_IMAGE_IDS.GAUGE_WINDOW,
    path: 'gauge/window.png',
  },
  {
    id: CANVAS_IMAGE_IDS.ACTIVE_HP_BAR,
    path: 'gauge/active-hp-bar.png',
  },
  {
    id: CANVAS_IMAGE_IDS.DIS_ACTIVE_HP_BAR,
    path: 'gauge/disactive-hp-bar.png',
  },
  {
    id: CANVAS_IMAGE_IDS.ACTIVE_BATTERY_BAR,
    path: 'gauge/active-battery-bar.png',
  },
  {
    id: CANVAS_IMAGE_IDS.DIS_ACTIVE_BATTERY_BAR,
    path: 'gauge/disactive-battery-bar.png',
  },
  {
    id: CANVAS_IMAGE_IDS.GAUGE_BAR_BASE,
    path: 'gauge/bar-base.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_SELECTOR_ACTIVE_BAR,
    path: 'battery-selector/active-bar.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_SELECTOR_DIS_ACTIVE_BAR,
    path: 'battery-selector/dis-active-bar.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_SELECTOR_BASE,
    path: 'battery-selector/base.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_SELECTOR_POINTER,
    path: 'battery-selector/pointer.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_SELECTOR_WINDOW,
    path: 'battery-selector/window.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_SELECTOR_ATTACK_BUTTON,
    path: 'battery-selector/attack-button.png',
  }
];

/**
 * キャンバス用画像を読み込む
 *
 * @param basePath ベースとなるパス
 * @param config 読み込み設定
 * @return 読み込み結果
 */
export function loadCanvasImage(basePath: string, config: CanvasImageConfig): Promise<CanvasImageResource> {
  const image = new Image();
  image.src = `${basePath}${config.path}`;
  return new Promise(resolve => image.onload = () => resolve({
    id: config.id,
    image
  }));
}

/**
 * ゲームで必要なキャンバス用画像を全て読み込む
 *
 * @param basePath ベースとなるパス
 * @return 読み込み結果
 */
export function loadAllCanvasImage(basePath: string): Promise<CanvasImageResource[]> {
  return Promise.all(CANVAS_IMAGE_CONFIGS.map(config => loadCanvasImage(basePath, config)));
}