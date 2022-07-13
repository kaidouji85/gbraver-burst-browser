// @flow
import type {BattleSceneProps} from "../game/td-scenes/battle/custom-battle-event";
import {first} from "../stream/operator";

/**
 * 画面を押下するまで待機する
 *
 * @param props カスタムイベントで利用可能な戦闘シーンプロパティ
 * @return 処理が完了したら発火するPromise
 */
export function waitUntilWindowPush(props: BattleSceneProps): Promise<void> {
  return new Promise(resolve => {
    const unsubscriber = props.pushWindow.chain(first()).subscribe(() => {
      unsubscriber.unsubscribe();
      resolve();
    })
  });
}