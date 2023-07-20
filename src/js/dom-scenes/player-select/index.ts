import { ArmDozerId } from "gbraver-burst-core";
import { Observable, Unsubscribable } from "rxjs";

import { Resources } from "../../resource";
import { DOMScene } from "../dom-scene";
import { PlayerDecide } from "./player-decide";
import { bindEventListeners } from "./procedures/bind-event-listeners";
import { createPlayerSelectProps } from "./procedures/create-player-select-props";
import { waitUntilLoaded } from "./procedures/wait-until-loaded";
import { PlayerSelectProps } from "./props";

/** プレイヤーセレクト */
export class PlayerSelect implements DOMScene {
  /** プロパティ */
  #props: PlayerSelectProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param armDozerIds プレイアブルアームドーザ
   */
  constructor(resources: Resources, armDozerIds: ArmDozerId[]) {
    this.#props = createPlayerSelectProps({resources, armDozerIds});
    this.#unsubscribers = bindEventListeners(this.#props);
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#props.armdozerSelector.destructor();
    this.#props.pilotSelector.destructor();
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /**
   * ルートHTML要素を取得する
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * リソース読み込みが完了するまで待つ
   * @return 読み込み完了したら発火するPromise
   */
  async waitUntilLoaded(): Promise<void> {
    await waitUntilLoaded(this.#props);
  }

  /**
   * 選択完了通知
   * @return 通知ストリーム
   */
  notifySelectCompletion(): Observable<PlayerDecide> {
    return this.#props.playerDecide;
  }

  /**
   * 戻る通知
   * @return 通知ストリーム
   */
  notifyPrev(): Observable<void> {
    return this.#props.prev;
  }
}
