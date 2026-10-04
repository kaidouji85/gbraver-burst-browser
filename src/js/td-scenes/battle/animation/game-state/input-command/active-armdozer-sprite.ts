import { PlayerId } from "gbraver-burst-core";

import { Animate } from "../../../../../animation/object-animation/animate";
import { empty } from "../../../../../animation/object-animation/delay";
import { TDArmdozerObjects } from "../../../view/td/armdozer-objects/armdozer-objects";

/**
 * アクティブなアームドーザスプライトを発光させる
 * @param tdArmdozers 3Dアームドーザオブジェクトをあつめたもの
 * @param activePlayerId 現在アクティブなプレイヤーID
 * @returns アニメーション
 */
export function activeArmdozerSprite(
  tdArmdozers: TDArmdozerObjects[],
  activePlayerId: PlayerId,
): Animate {
  const activeTDArmdozer = tdArmdozers.find(
    (v) => v.playerId === activePlayerId,
  );
  return activeTDArmdozer ? activeTDArmdozer.sprite().startActive() : empty();
}
