// @flow

/** バッテリーセレクタのバッテリーゲージが変更された */
export type ChangeBattery = {
  type: 'changeBattery',
  battery: number
};