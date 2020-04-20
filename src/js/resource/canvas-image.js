// @flow
import * as THREE from 'three';

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
  BATTERY_BUTTON: 'BATTERY_BUTTON',
  BATTERY_PLUS: 'BATTERY_PLUS',
  BATTERY_MINUS: 'BATTERY_MINUS',
  BATTERY_METER: 'BATTERY_METER',
  BATTERY_NEEDLE: 'BATTERY_NEEDLE',
  BATTERY_LABEL_ATTACK: 'BATTERY_LABEL_ATTACK',
  BATTERY_LABEL_DEFENSE: 'BATTERY_LABEL_DEFENSE',
  BATTERY_CUREENT_VALUE: 'BATTERY_CUREENT_VALUE',
  BATTERY_SELECTOR_NUMBER: 'BATTERY_SELECTOR_NUMBER',
  DIS_ACTIVE_BATTERY_SELECTOR_NUMBER: 'DIS_ACTIVE_BATTERY_SELECTOR_NUMBER',
  TURN_INDICATOR: 'TURN_INDICATOR',
  BURST_BUTTON: 'BURST_BUTTON',
  BIG_BUTTON_DISABLED: 'BIG_BUTTON_DISABLED',
  SMALL_BUTTON_DISABLED: 'SMALL_BUTTON_DISABLED',
  PLAYER_GAUGE_BASE: 'PLAYER_GAUGE_BASE',
  ENEMY_GAUGE_BASE: 'ENEMY_GAUGE_BASE',
  HP_BAR: 'HP_BAR',
  HP_BAR_BACK: 'HP_BAR_BACK',
  BATTERY_GAUGE: 'BATTERY_GAUGE',
  BATTERY_GAUGE_BACK: 'BATTERY_GAUGE_BACK',
};

/** キャンバス用画像設定をあつめたもの */
export const CANVAS_IMAGE_CONFIGS: CanvasImageConfig[] = [
  {
    id: CANVAS_IMAGE_IDS.BATTERY_BUTTON,
    path: 'battery-selector/battery-button.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_PLUS,
    path: 'battery-selector/plus-button.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_MINUS,
    path: 'battery-selector/minus-button.png',
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
    id: CANVAS_IMAGE_IDS.BATTERY_CUREENT_VALUE,
    path: 'battery-selector/current-battery.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_SELECTOR_NUMBER,
    path: 'battery-selector/active-number.png',
  },
  {
    id: CANVAS_IMAGE_IDS.DIS_ACTIVE_BATTERY_SELECTOR_NUMBER,
    path: 'battery-selector/dis-active-number.png',
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
    id: CANVAS_IMAGE_IDS.BIG_BUTTON_DISABLED,
    path: 'button/big-button-disabled.png',
  },
  {
    id: CANVAS_IMAGE_IDS.SMALL_BUTTON_DISABLED,
    path: 'button/small-button-disabled.png',
  },
  {
    id: CANVAS_IMAGE_IDS.PLAYER_GAUGE_BASE,
    path: 'gauge/player-gauge-base.png',
  },
  {
    id: CANVAS_IMAGE_IDS.ENEMY_GAUGE_BASE,
    path: 'gauge/enemy-gauge-base.png',
  },
  {
    id: CANVAS_IMAGE_IDS.HP_BAR,
    path: 'gauge/hp-bar.png',
  },
  {
    id: CANVAS_IMAGE_IDS.HP_BAR_BACK,
    path: 'gauge/hp-bar-back.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_GAUGE,
    path: 'gauge/battery-gauge.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BATTERY_GAUGE_BACK,
    path: 'gauge/battery-gauge-back.png',
  },
];

/**
 * キャンバス用画像を読み込む
 *
 * @param basePath ベースとなるパス
 * @param config 読み込み設定
 * @return 読み込み結果
 */
export function loadCanvasImage(basePath: string, config: CanvasImageConfig): Promise<CanvasImageResource> {
  return new Promise((resolve, reject) => {
    const loader = new THREE.ImageLoader();
    loader.load(
      `${basePath}${config.path}`,
      (image: Image) => {
        resolve({
          id: config.id,
          image: image
        });
      },
      undefined,
      (error) => {
        reject(error);
      }
    )
  });
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