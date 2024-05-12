import { createBattleSimulatorProps } from "./procedure/create-battle-simulator-props";
import { BattleSimulatorProps } from "./props";

/** 戦闘シミュレーター */
export class BattleSimulator {
  /** プロパティ */
  #props: BattleSimulatorProps;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createBattleSimulatorProps();
  }

  /**
   * ルートのHTML要素を取得する
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}
