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
  GAUGE_BASE: 'GAUGE_BASE',
  HP_NUMBER: 'HP_NUMBER',
  BATTERY_NUMBER: 'BATTERY_NUMBER',
  HP_BAR_DOWN: 'HP_BAR_DOWN',
  HP_BAR_UP: 'HP_BAR_UP',
  HP_GAUGE_LABEL: 'HP_GAUGE_LABEL',
  BATTERY_GAUGE_LABEL: 'BATTERY_GAUGE_LABEL',
  BATTERY_BAR_UP: 'BATTERY_BAR_UP',
  BATTERY_BAR_DOWN: 'BATTERY_BAR_DOWN',
  BATTERY_SLIDER_BASE: 'BATTERY_SLIDER_BASE',
  BATTERY_SLIDER_GAUGE: 'BATTERY_SLIDER_GAUGE',
  BATTERY_SLIDER_BACK: 'BATTERY_SLIDER_BACK',
  BATTERY_SLIDER_SHADOW: 'BATTERY_SLIDER_SHADOW',
  BURST_GAUGE_ACTIVE: 'BURST_GAUGE_ACTIVE',
  BURST_GAUGE_DISACTIVE: 'BURST_GAUGE_DISACTIVE',
  ATTACK_BUTTON: 'ATTACK_BUTTON',
  DEFENSE_BUTTON: 'DEFENSE_BUTTON',
  BURST_BUTTON: 'BURST_BUTTON',
  OK_BUTTON: 'OK_BUTTON',
  BUTTON_SHADOW: 'BUTTON_SHADOW',
};

/** キャンバス用画像設定をあつめたもの */
export const CANVAS_IMAGE_CONFIGS: CanvasImageConfig[] = [
  {
    id: CANVAS_IMAGE_IDS.GAUGE_BASE,
    path: 'gauge/gauge-base.png',
  },
  {
    id: CANVAS_IMAGE_IDS.HP_NUMBER,
    path: 'gauge/number/hp-number.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_NUMBER,
    path: 'gauge/number/battery-number.png',
  },
  {
    id: CANVAS_IMAGE_IDS.HP_BAR_DOWN,
    path: 'gauge/hp-gauge/hp-bar-down.png'
  },
  {
    id: CANVAS_IMAGE_IDS.HP_BAR_UP,
    path: 'gauge/hp-gauge/hp-bar-up.png'
  },
  {
    id: CANVAS_IMAGE_IDS.HP_GAUGE_LABEL,
    path: 'gauge/hp-gauge/hp-gauge-label.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_GAUGE_LABEL,
    path: 'gauge/battery-gauge/battery-gauge-label.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_BAR_UP,
    path: 'gauge/battery-gauge/battery-bar-up.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_BAR_DOWN,
    path: 'gauge/battery-gauge/battery-bar-down.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_SLIDER_BASE,
    path: 'slider/depricated-battery-slider/battery-slider-base.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_SLIDER_GAUGE,
    path: 'slider/depricated-battery-slider/battery-slider-gauge.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_SLIDER_BACK,
    path: 'slider/depricated-battery-slider/battery-slider-back.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_SLIDER_SHADOW,
    path: 'slider/depricated-battery-slider/battery-slider-shadow.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BURST_GAUGE_ACTIVE,
    path: 'gauge/burst-gauge/burst-active.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BURST_GAUGE_DISACTIVE,
    path: 'gauge/burst-gauge/burst-disactive.png',
  },
  {
    id: CANVAS_IMAGE_IDS.ATTACK_BUTTON,
    path: 'button/attack-button.png'
  },
  {
    id: CANVAS_IMAGE_IDS.DEFENSE_BUTTON,
    path: 'button/defense-button.png'
  },
  {
    id: CANVAS_IMAGE_IDS.BURST_BUTTON,
    path: 'button/burst-button.png'
  },
  {
    id: CANVAS_IMAGE_IDS.OK_BUTTON,
    path: 'button/ok-button.png'
  },
  {
    id: CANVAS_IMAGE_IDS.BUTTON_SHADOW,
    path: 'button/button-shadow.png'
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