import { all } from "../animation/all";
import { Animate } from "../animation/animate";
import { delay } from "../animation/delay";
import { CustomBattleEventProps } from "../td-scenes/battle/custom-battle-event";

/**
 * 互いに礼をする
 * @param props カスタムイベントプロパティ
 * @return アニメーション
 */
export function synchronizedBow(props: CustomBattleEventProps): Animate {
  return all(
    ...props.view.td.armdozers.map((v) =>
      v
        .sprite()
        .bowDown()
        .chain(delay(200))
        .chain(v.sprite().bowUp())
        .chain(delay(500))
        .chain(v.sprite().uprightToStand()),
    ),
  );
}
