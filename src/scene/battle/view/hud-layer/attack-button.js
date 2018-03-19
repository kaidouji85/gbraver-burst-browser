// @flow

import type {Resources} from "../../../../resource";
import {AttackButton} from "../../../../game-object/button/attack-button/index";

/** コウゲキボタンを生成する */
export function createAttackButton(resources: Resources): AttackButton {
  return new AttackButton({
    resources,
    // TODO オブザーバになんからのイベントを通知する
    onPush: () => {
      console.log('on attack button push!');
    }
  })
}