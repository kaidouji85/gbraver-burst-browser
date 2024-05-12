import { DOMDialog } from "../dialog";
import {
  BattleSimulatorPropsCreatorParams,
  createBattleSimulatorProps,
} from "./procedure/create-battle-simulator-props";
import { BattleSimulatorProps } from "./props";

/** コンストラクタのパラメータ */
type BattleSimulatorConstructParams = BattleSimulatorPropsCreatorParams;

/** 戦闘シミュレーター */
export class BattleSimulator implements DOMDialog {
  /** プロパティ */
  #props: BattleSimulatorProps;

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: BattleSimulatorConstructParams) {
    this.#props = createBattleSimulatorProps(params);
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
