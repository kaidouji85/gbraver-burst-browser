import { DOMDialog } from "../dialog";
import { createBattleSimulatorProps } from "./procedure/create-battle-simulator-props";
import { BattleSimulatorProps } from "./props";

/** 戦闘シミュレーター */
export class BattleSimulator implements DOMDialog {
  /** プロパティ */
  #props: BattleSimulatorProps;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createBattleSimulatorProps();
  }

  /** @override */
  destructor(): void {
    // NOP
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}
