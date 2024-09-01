import { Animate } from "../../animation/animate";
import {
  CustomBattleEvent,
  CustomStateAnimation,
  LastState,
} from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";
import { afterLastState } from "./procedure/after-last-state";
import { beforeLastState } from "./procedure/before-last-state";
import { createPrinceOfFallenSunProps } from "./procedure/create-prince-of-fallen-sun-props";
import { onStateAnimation } from "./procedure/on-state-animation";
import { PrinceOfFallenSunProps } from "./props";

/** 落日の王子 イベント */
class PrinceOfFallenSun extends EmptyCustomBattleEvent {
  /** イベントプロパティ */
  #eventProps: PrinceOfFallenSunProps;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.#eventProps = createPrinceOfFallenSunProps();
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
    this.#eventProps.eventState = await beforeLastState({
      ...props,
      ...this.#eventProps,
    });
  }

  /** @override */
  async afterLastState(props: LastState): Promise<void> {
    await afterLastState({ ...props, ...this.#eventProps });
  }

  /** @override */
  onStateAnimation(props: CustomStateAnimation): Animate {
    return onStateAnimation({ ...props, ...this.#eventProps });
  }
}

/**
 * 落日の王子イベント用のカスタムバトルイベントを作成する
 * @returns 生成結果
 */
export function createPrinceOfFallenSun(): CustomBattleEvent {
  return new PrinceOfFallenSun();
}
