import { Animate } from "../../animation/animate";
import {
  CustomBattleEvent,
  CustomStateAnimation,
  LastState,
} from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";
import { afterLastState } from "./procedures/after-last-state";
import { beforeLastState } from "./procedures/before-last-state";
import { createStateAnimationTypeCondition } from "./procedures/create-state-animation-type-condition";
import { createSurviveSuperPowerWithGuardProps } from "./procedures/create-survive-super-power-with-guard-props";
import { getStateAnimationType } from "./procedures/get-state-animation-type";
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
  onStateAnimation(props: CustomStateAnimation): Animate {
    const stateAnimationCondition = createStateAnimationTypeCondition(props);
    const stateAnimationType = getStateAnimationType(
      props,
      stateAnimationCondition,
    );
    this.#props.stateAnimationType = stateAnimationType;
    return onStateAnimation({ ...props, stateAnimationType });
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
    this.#props.state = await beforeLastState({ ...props, ...this.#props });
  }

  /** @override */
  async afterLastState(props: LastState): Promise<void> {
    await afterLastState(props);
  }
}

/**
 * 「超火力はガードで凌げ」用のカスタムバトルイベントを生成する
 * @returns カスタムバトルイベント
 */
export function createSurviveSuperPowerWithGuardEvent(): CustomBattleEvent {
  return new SurviveSuperPowerWithGuard();
}
