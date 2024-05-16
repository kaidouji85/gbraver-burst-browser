import { Unsubscribable } from "rxjs";

import { DOMDialog } from "../dialog";
import { bindEventListeners } from "./procedure/bind-event-listeners";
import {
  BattleSimulatorPropsCreatorParams,
  createBattleSimulatorProps,
} from "./procedure/create-battle-simulator-props";
import { initialize } from "./procedure/initialize";
import { BattleSimulatorProps } from "./props";

/** コンストラクタのパラメータ */
type BattleSimulatorConstructParams = BattleSimulatorPropsCreatorParams;

/** 戦闘シミュレーター */
export class BattleSimulator implements DOMDialog {
  /** プロパティ */
  #props: BattleSimulatorProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: BattleSimulatorConstructParams) {
    this.#props = createBattleSimulatorProps(params);
    initialize(this.#props);
    this.#unsubscribers = bindEventListeners(this.#props);
  }

  /** @override */
  destructor(): void {
    this.#unsubscribers.forEach((u) => {
      u.unsubscribe();
    });
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}
