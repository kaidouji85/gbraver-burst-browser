import { all } from "../../animation/object-animation/all";
import { Animate } from "../../animation/object-animation/animate";
import { CustomBattleEventProps } from "../../td-scenes/battle/custom-battle-event";

/**
 * 互いに気をつけする
 * @param props カスタムイベントプロパティ
 * @returns アニメーション
 */
export function synchronizedUpright(props: CustomBattleEventProps): Animate {
  return all(...props.view.td.armdozers.map((v) => v.sprite().upright()));
}
