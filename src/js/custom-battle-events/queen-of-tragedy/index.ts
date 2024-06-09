import { Animate } from "../../animation/animate";
import {
  CustomBattleEvent,
  CustomStateAnimation,
  LastState,
} from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";
import { beforeLastState } from "./procedure/before-last-state";
import { createQueenOfTragedyProps } from "./procedure/create-queen-of-tragedy-props";
import { onStateAnimation } from "./procedure/on-state-animation";
import { QueenOfTragedyProps } from "./props";

/** 悲劇の女王 イベント */
class QueenOfTragedy extends EmptyCustomBattleEvent {
  /** プロパティ */
  #props: QueenOfTragedyProps;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.#props = createQueenOfTragedyProps();
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
    this.#props.state = await beforeLastState({ ...props, ...this.#props });
  }

  /** @override */
  onStateAnimation(props: CustomStateAnimation): Animate {
    return onStateAnimation({ ...props, ...this.#props });
  }
}

/**
 * 悲劇の女王イベント用のカスタムバトルイベントを作成する
 * @returns 生成結果
 */
export function createQueenOfTragedy(): CustomBattleEvent {
  return new QueenOfTragedy();
}
