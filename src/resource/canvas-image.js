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