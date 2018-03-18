// @flow

import type {Resources} from "../../../../resource";
import {Button} from "../../../../game-object/button/button";
import {AttackButton} from "../../../../game-object/button";

/** コウゲキボタンを生成する */
export function createAttackButton(resources: Resources): Button {
  return new AttackButton({
    resources,
    // TODO オブザーバになんからのイベントを通知する
    onPush: () => console.log('on attack button push!')
  })
}