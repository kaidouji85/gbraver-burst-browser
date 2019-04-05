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
  GAUGE_WINDOW: 'GAUGE_WINDOW',
  ACTIVE_HP_BAR: 'ACTIVE_HP_BAR',
  DIS_ACTIVE_HP_BAR: 'DIS_ACTIVE_HP_BAR',
  ACTIVE_BATTERY_BAR: 'ACTIVE_BATTERY_BAR',
  DIS_ACTIVE_BATTERY_BAR: 'DIS_ACTIVE_BATTERY_BAR',
  GAUGE_BAR_BASE: 'GAUGE_BAR_BASE',
  BATTERY_BUTTON: 'BATTERY_BUTTON',
  BATTERY_PLUS: 'BATTERY_PLUS',
  DIS_ACTIVE_BATTERY_PLUS: 'DIS_ACTIVE_BATTERY_PLUS',
  DIS_ACTIVE_BATTERY_MINUS: 'DIS_ACTIVE_BATTERY_MINUS',
  BATTERY_MINUS: 'BATTERY_MINUS',
  BATTERY_METER: 'BATTERY_METER',
  BATTERY_NEEDLE: 'BATTERY_NEEDLE',
  BATTERY_LABEL_ATTACK: 'BATTERY_LABEL_ATTACK',
  BATTERY_LABEL_DEFENSE: 'BATTERY_LABEL_DEFENSE',
  TURN_INDICATOR: 'TURN_INDICATOR',
  BURST_BUTTON: 'BURST_BUTTON',
  BATTERY_NUMBER: 'BATTERY_NUMBER',
  DAMAGE_NUMBER: 'DAMAGE_NUMBER',
};

/** キャンバス用画像設定をあつめたもの */
export const CANVAS_IMAGE_CONFIGS: CanvasImageConfig[] = [
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
    id: CANVAS_IMAGE_IDS.BATTERY_BUTTON,
    path: 'battery-selector/battery-button.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_PLUS,
    path: 'battery-selector/plus-button.png',
  },
  {
    id: CANVAS_IMAGE_IDS.DIS_ACTIVE_BATTERY_PLUS,
    path: 'battery-selector/dis-active-plus-button.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_MINUS,
    path: 'battery-selector/minus-button.png',
  },
  {
    id: CANVAS_IMAGE_IDS.DIS_ACTIVE_BATTERY_MINUS,
    path: 'battery-selector/dis-active-minus-button.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_METER,
    path: 'battery-selector/meter.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_NEEDLE,
    path: 'battery-selector/needle.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_LABEL_ATTACK,
    path: 'battery-selector/attack-label.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_LABEL_DEFENSE,
    path: 'battery-selector/defense-label.png',
  },
  {
    id: CANVAS_IMAGE_IDS.TURN_INDICATOR,
    path: 'turn/turn-indicator.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BURST_BUTTON,
    path: 'burst-button/burst-button.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_NUMBER,
    path: 'battery-number/battery-number.png',
  },
  {
    id: CANVAS_IMAGE_IDS.DAMAGE_NUMBER,
    path: 'damage-indicator/damage-number.png',
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