import { Animate } from "../../animation/animate";
import {
  CustomBattleEvent,
  CustomStateAnimationProps,
} from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";
import { afterStateAnimation } from "./procedures/after-state-animation";
import { onStateAnimation } from "./procedures/on-state-animation";

/** ネット対戦、アーケードなど真剣勝負のカスタムバトルイベント */
class SeriousMatchEvent extends EmptyCustomBattleEvent {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
  }

  /** @override */
  onStateAnimation(props: CustomStateAnimationProps): Animate {
    return onStateAnimation(props);
  }

  /** @override */
  afterStateAnimation(props: CustomStateAnimationProps): Animate {
    return afterStateAnimation(props);
  }
}

/**
 * 真剣勝負のカスタムバトルイベントを生成する
 * @returns 生成結果
 */
export function createSeriousMatchEvent(): CustomBattleEvent {
  return new SeriousMatchEvent();
}
