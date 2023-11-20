import {
  CustomBattleEvent,
  LastState,
} from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";
import {ConfrontationTwoBraverProps} from "./props";
import { introduction } from "./stories/introduction";
import {createConfrontationTwoBraverProps} from "./procedures/create-confrontation-two-braver-props";

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
  async beforeLastState(props: LastState): Promise<void> {
    await introduction(props);
  }
}

/**
 * 「対決、二人のブレイバー！！」のカスタムバトルイベントを生成する
 * @return 生成したカスタムバトルイベント
 */
export function createConfrontationTwoBraverEvent(): CustomBattleEvent {
  return new ConfrontationTwoBraverEvent();
}
