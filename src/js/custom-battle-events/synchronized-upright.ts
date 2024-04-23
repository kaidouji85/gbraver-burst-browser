import { all } from "../animation/all";
import { Animate } from "../animation/animate";
import { CustomBattleEventProps } from "../td-scenes/battle/custom-battle-event";

/**
 * 互いに気をつけする
 * @param props カスタムイベントプロパティ
 * @return アニメーション
 */
export function synchronizedUpright(props: CustomBattleEventProps): Animate {
  return all(...props.view.td.armdozers.map((v) => v.sprite().upright()));
}
