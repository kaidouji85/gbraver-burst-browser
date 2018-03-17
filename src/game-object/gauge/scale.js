// @flow

import {isIPhone, isIPhonePlus, isIPhoneX} from "../../media-query/iphone";

/** デバイスに応じたゲージ系ゲームオブジェクトの倍率を返す */
export function getGaugeScale(): number {
  if (isIPhone() || isIPhonePlus() || isIPhoneX()) {
    return 0.6;
  }

  return 1;
}