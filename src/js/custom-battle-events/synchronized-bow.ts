import {CustomBattleEventProps} from "../td-scenes/battle/custom-battle-event";
import {all} from "../animation/all";
import {Animate} from "../animation/animate";

/**
 * 違いに気をつけする
 * @param props カスタムイベントプロパティ
 * @return アニメーション
 */
export function synchronizedBow(props: CustomBattleEventProps): Animate {
  return all(
    ...props.view.td.armdozerObjects.map(v =>
      v.sprite().upright()
    )
  );
}