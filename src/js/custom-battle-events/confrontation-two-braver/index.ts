import {CustomBattleEvent, LastState} from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";
import {introduction} from "./stories/introduction";

/** 「対決、二人のブレイバー！！」カスタムバトルイベント */
class ConfrontationTwoBraverEvent extends EmptyCustomBattleEvent {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
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
