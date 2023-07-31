import type {
  BatteryCommandSelected,
  BurstCommandSelected,
  CommandCanceled,
  CustomBattleEvent,
  LastState,
  PilotSkillCommandSelected,
} from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";
import { afterLastState } from "./listeners/after-last-state";
import { beforeLastState } from "./listeners/before-last-state";
import { onBatteryCommandSelected } from "./listeners/on-battery-command-selected";
import { onBurstCommandSelected } from "./listeners/on-burst-command-selected";
import { onPilotSkillCommandSelected } from "./listeners/on-pilot-skill-command-selected";
import {
  createZeroDefenseTutorialProps,
  ZeroDefenseTutorialProps,
} from "./props";

/** ゼロ防御チュートリアル */
class ZeroDefenseTutorialEvent extends EmptyCustomBattleEvent {
  /** プロパティ */
  props: ZeroDefenseTutorialProps;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.props = createZeroDefenseTutorialProps();
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
    this.props.state = await beforeLastState({ ...props, ...this.props });
  }

  /** @override */
  async afterLastState(props: LastState): Promise<void> {
    this.props.state = await afterLastState({ ...props, ...this.props });
  }

  /** @override */
  async onBatteryCommandSelected(
    props: BatteryCommandSelected,
  ): Promise<CommandCanceled> {
    const { state, cancel } = await onBatteryCommandSelected({
      ...props,
      ...this.props,
    });
    this.props.state = state;
    return cancel;
  }

  /** @override */
  async onBurstCommandSelected(
    props: BurstCommandSelected,
  ): Promise<CommandCanceled> {
    const { state, cancel } = await onBurstCommandSelected({
      ...props,
      ...this.props,
    });
    this.props.state = state;
    return cancel;
  }

  /** @override */
  async onPilotSkillCommandSelected(
    props: PilotSkillCommandSelected,
  ): Promise<CommandCanceled> {
    const { state, cancel } = await onPilotSkillCommandSelected({
      ...props,
      ...this.props,
    });
    this.props.state = state;
    return cancel;
  }
}

/**
 * ゼロ防御チュートリアル用のカスタムバトルイベントを生成する
 * @return 生成したカスタムバトルイベント
 */
export function createZeroDefenseTutorialEvent(): CustomBattleEvent {
  return new ZeroDefenseTutorialEvent();
}
