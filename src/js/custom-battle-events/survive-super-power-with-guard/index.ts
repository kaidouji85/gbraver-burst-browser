import { Animate } from "../../animation/animate";
import {
  BatteryCommandSelectedEventProps,
  BattleSimulatorEventProps,
  CommandCanceled,
  CustomBattleEvent,
  CustomBattleEventProps,
  CustomStateAnimationProps,
  LastStateEventProps,
} from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";
import { afterBattleSimulatorEnd } from "./procedures/after-battle-simulator-end";
import { afterLastState } from "./procedures/after-last-state";
import { beforeLastState } from "./procedures/before-last-state";
import { createSurviveSuperPowerWithGuardProps } from "./procedures/create-survive-super-power-with-guard-props";
import { onBatteryCommandSelected } from "./procedures/on-battery-command-selected";
import { onBattleSimulatorSelected } from "./procedures/on-battle-simulator-selected";
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

  /** @override */
  async onBatteryCommandSelected(
    props: BatteryCommandSelectedEventProps,
  ): Promise<CommandCanceled> {
    const { state, commandCanceled } = await onBatteryCommandSelected({
      ...props,
      ...this.#props,
    });
    this.#props.state = state;
    return commandCanceled;
  }

  /** @override */
  async onBattleSimulatorSelected(
    props: CustomBattleEventProps,
  ): Promise<void> {
    await onBattleSimulatorSelected(props);
  }

  /** @override */
  async afterBattleSimulatorClosed(
    props: BattleSimulatorEventProps,
  ): Promise<void> {
    await afterBattleSimulatorEnd({ ...props, ...this.#props });
  }
}

/**
 * 「超火力はガードで凌げ」用のカスタムバトルイベントを生成する
 * @returns カスタムバトルイベント
 */
export function createSurviveSuperPowerWithGuardEvent(): CustomBattleEvent {
  return new SurviveSuperPowerWithGuard();
}
