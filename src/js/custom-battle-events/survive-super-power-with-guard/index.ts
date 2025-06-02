import { Animate } from "../../animation/animate";
import {
  CustomBattleEvent,
  CustomStateAnimationProps,
  LastStateEventProps,
} from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";
import { afterLastState } from "./procedures/after-last-state";
import { beforeLastState } from "./procedures/before-last-state";
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
    return onStateAnimation({ ...props, ...this.#props });
  }

  /** @override */
  async beforeLastState(props: LastStateEventProps): Promise<void> {
    this.#props.state = await beforeLastState({ ...props, ...this.#props });
  }

  /** @override */
  async afterLastState(props: LastStateEventProps): Promise<void> {
    await afterLastState({ ...props, ...this.#props });
  }
}

/**
 * 「超火力はガードで凌げ」用のカスタムバトルイベントを生成する
 * @returns カスタムバトルイベント
 */
export function createSurviveSuperPowerWithGuardEvent(): CustomBattleEvent {
  return new SurviveSuperPowerWithGuard();
}
