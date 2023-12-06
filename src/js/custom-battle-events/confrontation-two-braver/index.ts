import { Animate } from "../../animation/animate";
import {
  CustomBattleEvent,
  CustomStateAnimation,
  LastState,
  StateUpdateStarted,
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
  /** プロパティ */
  #props: ConfrontationTwoBraverProps;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.#props = createConfrontationTwoBraverProps();
  }

  /** @override */
  onStateUpdateStarted(props: StateUpdateStarted): void {
    this.#props.state = onStateUpdateStarted({ ...props, ...this.#props });
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
    this.#props.state = await beforeLastState({ ...props, ...this.#props });
  }

  /** @override */
  async afterLastState(props: LastState): Promise<void> {
    await afterLastState(props);
  }

  /** @override */
  onStateAnimation(props: CustomStateAnimation): Animate {
    return onStateAnimation({ ...props, ...this.#props });
  }

  /** @override */
  afterStateAnimation(props: CustomStateAnimation): Animate {
    return afterStateAnimation({ ...props, ...this.#props });
  }
}

/**
 * 「対決、二人のブレイバー！！」のカスタムバトルイベントを生成する
 * @return 生成したカスタムバトルイベント
 */
export function createConfrontationTwoBraverEvent(): CustomBattleEvent {
  return new ConfrontationTwoBraverEvent();
}
