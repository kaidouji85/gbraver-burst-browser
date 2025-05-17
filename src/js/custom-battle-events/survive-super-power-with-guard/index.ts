import {
  CustomBattleEvent,
  CustomStateAnimation,
  LastState,
} from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";
import { beforeLastState } from "./procedures/before-last-state";
import { createSurviveSuperPowerWithGuardProps } from "./procedures/create-survive-super-power-with-guard-props";
import { SurviveSuperPowerWithGuardProps } from "./props";
import { Animate } from "../../animation/animate";
import { createStateAnimationConditions } from "./procedures/create-state-animation-conditions";
import { empty } from "../../animation/delay";
import { onStateAnimation } from "./procedures/on-state-animation";

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
    const stateAnimationCondition = createStateAnimationConditions(props);
    this.#props.stateAnimationCondition = stateAnimationCondition;
    return onStateAnimation({ ...props, stateAnimationCondition });
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
    this.#props.state = await beforeLastState({ ...props, ...this.#props });
  }
}

/**
 * 「超火力はガードで凌げ」用のカスタムバトルイベントを生成する
 * @returns カスタムバトルイベント
 */
export function createSurviveSuperPowerWithGuardEvent(): CustomBattleEvent {
  return new SurviveSuperPowerWithGuard();
}
