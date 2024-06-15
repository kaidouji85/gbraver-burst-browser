import { Animate } from "../../animation/animate";
import {
  CustomBattleEvent,
  CustomStateAnimation,
  LastState,
  StateUpdateStarted,
} from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";
import { beforeLastState } from "./procedure/before-last-state";
import { createQueenOfTragedyProps } from "./procedure/create-queen-of-tragedy-props";
import { onStateAnimation } from "./procedure/on-state-animation";
import { onStateUpdateStarted } from "./procedure/on-state-update-started";
import { QueenOfTragedyProps } from "./props";

/** 悲劇の女王 イベント */
class QueenOfTragedy extends EmptyCustomBattleEvent {
  /** イベントプロパティ */
  #eventProps: QueenOfTragedyProps;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.#eventProps = createQueenOfTragedyProps();
  }

  /** @override */
  onStateUpdateStarted(props: StateUpdateStarted) {
    this.#eventProps.eventState = onStateUpdateStarted({
      ...props,
      ...this.#eventProps,
    });
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
    this.#eventProps.eventState = await beforeLastState({
      ...props,
      ...this.#eventProps,
    });
  }

  /** @override */
  onStateAnimation(props: CustomStateAnimation): Animate {
    return onStateAnimation({ ...props, ...this.#eventProps });
  }
}

/**
 * 悲劇の女王イベント用のカスタムバトルイベントを作成する
 * @returns 生成結果
 */
export function createQueenOfTragedy(): CustomBattleEvent {
  return new QueenOfTragedy();
}
