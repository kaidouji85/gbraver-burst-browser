import { CustomBattleEvent } from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";
import { SurviveSuperPowerWithGuardProps } from "./props";
import { createSurviveSuperPowerWithGuardProps } from "./procedures/create-survive-super-power-with-guard-props";

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
}

/**
 * 「超火力はガードで凌げ」用のカスタムバトルイベントを生成する
 * @returns カスタムバトルイベント
 */
export function createSurviveSuperPowerWithGuardEvent(): CustomBattleEvent {
  return new SurviveSuperPowerWithGuard();
}
