import { Animate } from "../../animation/animate";
import {
  CustomBattleEvent,
  CustomStateAnimationProps,
  LastStateEventProps,
  StateUpdateStartedEventProps,
} from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";
import { afterLastState } from "./procedures/after-last-state";
import { afterStateAnimation } from "./procedures/after-state-animation";
import { beforeLastState } from "./procedures/before-last-state";
import { createConfrontationTwoBraverProps } from "./procedures/create-confrontation-two-braver-props";
import { onStateAnimation } from "./procedures/on-state-animation";
import { onStateUpdateStarted } from "./procedures/on-state-update-started";
import { ConfrontationTwoBraverProps } from "./props";

/** 「対決、二人のブレイバー！！」カスタムバトルイベント */
class ConfrontationTwoBraverEvent extends EmptyCustomBattleEvent {
  /** イベントプロパティ */
  #eventProps: ConfrontationTwoBraverProps;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.#eventProps = createConfrontationTwoBraverProps();
  }

  /** @override */
  onStateUpdateStarted(props: StateUpdateStartedEventProps): void {
    this.#eventProps.eventState = onStateUpdateStarted({
      ...props,
      ...this.#eventProps,
    });
  }

  /** @override */
  async beforeLastState(props: LastStateEventProps): Promise<void> {
    this.#eventProps.eventState = await beforeLastState({
      ...props,
      ...this.#eventProps,
    });
  }

  /** @override */
  async afterLastState(props: LastStateEventProps): Promise<void> {
    await afterLastState(props);
  }

  /** @override */
  onStateAnimation(props: CustomStateAnimationProps): Animate {
    return onStateAnimation({ ...props, ...this.#eventProps });
  }

  /** @override */
  afterStateAnimation(props: CustomStateAnimationProps): Animate {
    return afterStateAnimation({ ...props, ...this.#eventProps });
  }
}

/**
 * 「対決、二人のブレイバー！！」のカスタムバトルイベントを生成する
 * @returns 生成したカスタムバトルイベント
 */
export function createConfrontationTwoBraverEvent(): CustomBattleEvent {
  return new ConfrontationTwoBraverEvent();
}
