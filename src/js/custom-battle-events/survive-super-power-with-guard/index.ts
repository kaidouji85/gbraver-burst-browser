import { Animate } from "../../animation/animate";
import {
  CustomBattleEvent,
  CustomStateAnimationProps,
  LastStateEventProps,
} from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";
import { afterLastState } from "./procedures/after-last-state";
import { beforeLastState } from "./procedures/before-last-state";
import { createLastStateCondition } from "./procedures/create-last-state-condition";
import { createStateAnimationCondition } from "./procedures/create-state-animation-condition";
import { createSurviveSuperPowerWithGuardProps } from "./procedures/create-survive-super-power-with-guard-props";
import { onStateAnimation } from "./procedures/on-state-animation";
import { SurviveSuperPowerWithGuardProps } from "./props";

/** 「超火力はガードで凌げ」用のカスタムバトルイベント*/
class SurviveSuperPowerWithGuard extends EmptyCustomBattleEvent {
  /** イベントプロパティ */
  #props: SurviveSuperPowerWithGuardProps;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.#props = createSurviveSuperPowerWithGuardProps();
  }

  /** @override */
  onStateAnimation(props: CustomStateAnimationProps): Animate {
    const stateAnimationCondition = createStateAnimationCondition(props);
    this.#props.stateAnimationCondition = stateAnimationCondition;
    return onStateAnimation({
      ...props,
      ...this.#props,
      stateAnimationCondition,
    });
  }

  /** @override */
  async beforeLastState(props: LastStateEventProps): Promise<void> {
    const lastStateCondition = createLastStateCondition(props);
    this.#props.lastStateCondition = lastStateCondition;
    this.#props.state = await beforeLastState({
      ...props,
      ...this.#props,
      lastStateCondition,
    });
  }

  /** @override */
  async afterLastState(props: LastStateEventProps): Promise<void> {
    const lastStateCondition =
      this.#props.lastStateCondition ?? createLastStateCondition(props);
    await afterLastState({ ...props, ...this.#props, lastStateCondition });
  }
}

/**
 * 「超火力はガードで凌げ」用のカスタムバトルイベントを生成する
 * @returns カスタムバトルイベント
 */
export function createSurviveSuperPowerWithGuardEvent(): CustomBattleEvent {
  return new SurviveSuperPowerWithGuard();
}
