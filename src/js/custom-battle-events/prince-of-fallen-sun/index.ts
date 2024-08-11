import {
  CustomBattleEvent,
  LastState,
} from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";
import { beforeLastState } from "./procedure/before-last-state/before-last-state";
import { createPrinceOfFallenSunProps } from "./procedure/create-prince-of-fallen-sun-props";
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
}

/**
 * 落日の王子イベント用のカスタムバトルイベントを作成する
 * @returns 生成結果
 */
export function createPrinceOfFallenSun(): CustomBattleEvent {
  return new PrinceOfFallenSun();
}
