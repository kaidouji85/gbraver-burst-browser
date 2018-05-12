/** アニメーションタイプ　立ち */
export const ANIMATION_STAND = 'STAND';

/** アニメーションタイプ */
export type AnimationType = ANIMATION_STAND;

/** ネオランドーザのモデル */
export interface NeoLandozerModel {
  position: {
    x: number,
    y: number,
    z: number
  },
  animation: {
    type: AnimationType,
    frame: number,
  }
}