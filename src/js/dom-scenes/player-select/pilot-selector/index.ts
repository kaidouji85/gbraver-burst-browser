import { PilotId } from "gbraver-burst-core";
import { Observable, Unsubscribable } from "rxjs";

import { Resources } from "../../../resource";
import { bindEventListeners } from "./procedure/bind-event-lienters";
import { createPilotSelectorProps } from "./procedure/create-pilot-selector-props";
import { hidden } from "./procedure/hidden";
import { show } from "./procedure/show";
import { waitUntilLoaded } from "./procedure/wait-until-loaded";
import { PilotSelectorProps } from "./props";

/**パイロットセレクタ */
export class PilotSelector {
  /** プロパティ */
  #props: PilotSelectorProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param pilotIds 選択可能なパイロットIDリスト
   * @param initialPilotId パイロットIDの初期値
   */
  constructor(
    resources: Resources,
    pilotIds: PilotId[],
    initialPilotId: PilotId,
  ) {
    this.#props = createPilotSelectorProps(resources, pilotIds, initialPilotId);
    this.#unsubscribers = bindEventListeners(this.#props);
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /**
   * 本コンポネントを表示する
   * @param pilotId 選択するパイロットID
   */
  show(pilotId: PilotId): void {
    show(this.#props, pilotId);
  }

  /**
   * 本コンポネントを非表示にする
   */
  hidden(): void {
    hidden(this.#props);
  }

  /**
   * リソース読み込みが完了するまで待つ
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await waitUntilLoaded(this.#props);
  }

  /**
   * ルートHTML要素を取得する
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * パイロット変更通知
   * @return 通知ストリーム
   */
  notifyChanges(): Observable<PilotId> {
    return this.#props.change;
  }

  /**
   * パイロット選択通知
   * @return 通知ストリーム
   */
  notifyDecision(): Observable<PilotId> {
    return this.#props.decide;
  }

  /**
   * 戻る 通知
   * @return 通知ストリーム
   */
  notifyPrev(): Observable<void> {
    return this.#props.prev;
  }
}
