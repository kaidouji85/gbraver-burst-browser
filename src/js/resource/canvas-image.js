// @flow
import * as THREE from 'three';
import type {ResourceRoot} from "./resource-root";

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
  TURN_INDICATOR: 'TURN_INDICATOR',
  BURST_BUTTON: 'BURST_BUTTON',
  BURST_BUTTON_LABEL: 'BURST_BUTTON_LABEL',
  PILOT_BUTTON: 'PILOT_BUTTON',
  PILOT_BUTTON_LABEL: 'PILOT_BUTTON_LABEL',
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
    id: CANVAS_IMAGE_IDS.TURN_INDICATOR,
    path: 'turn/turn-indicator.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BURST_BUTTON,
    path: 'button/burst-button.png',
  },
  {
    id: CANVAS_IMAGE_IDS.BURST_BUTTON_LABEL,
    path: 'button/burst-button-label.png',
  },
  {
    id: CANVAS_IMAGE_IDS.PILOT_BUTTON,
    path: 'button/pilot-button.png',
  },
  {
    id: CANVAS_IMAGE_IDS.PILOT_BUTTON_LABEL,
    path: 'button/pilot-button-label.png',
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
 * @param resourceRoot リソースルート
 * @param config 読み込み設定
 * @return 読み込み結果
 */
export function loadCanvasImage(resourceRoot: ResourceRoot, config: CanvasImageConfig): Promise<CanvasImageResource> {
  return new Promise((resolve, reject) => {
    const loader = new THREE.ImageLoader();
    loader.load(
      `${resourceRoot.get()}/${config.path}`,
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
 * @param resourceRoot リソースルート
 * @return 読み込み結果
 */
export function loadingAllCanvasImages(resourceRoot: ResourceRoot): Array<Promise<CanvasImageResource>> {
  return CANVAS_IMAGE_CONFIGS.map(config => loadCanvasImage(resourceRoot, config))
}