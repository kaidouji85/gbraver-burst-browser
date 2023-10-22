import { ArmdozerId } from "gbraver-burst-core";
import { Observable, Unsubscribable } from "rxjs";

import { Resources } from "../../../resource";
import { createArmdozerSelectorProps } from "./procedure/create-armdozer-selector-props";
import { ArmdozerSelectorProps } from "./props";
import { show } from "./procedure/show";
import { hidden } from "./procedure/hidden";
import { waitUntilLoaded } from "./procedure/wait-until-loaded";
import {bindEventListener} from "./procedure/bind-event-listener";


/** アームドーザセレクタ */
export class ArmdozerSelector {
  /** プロパティ */
  #props: ArmdozerSelectorProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param armdozerIds アームドーザIDリスト
   * @param initialArmdozerId アームドーザID初期値
   */
  constructor(
    resources: Resources,
    armdozerIds: ArmdozerId[],
    initialArmdozerId: ArmdozerId,
  ) {
    this.#props = createArmdozerSelectorProps(resources, armdozerIds, initialArmdozerId);
    this.#unsubscribers = bindEventListener(this.#props);
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
   */
  show(): void {
    show(this.#props);
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
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * アームドーザ選択の通知
   * @return イベント通知ストリーム
   */
  notifyChanges(): Observable<ArmdozerId> {
    return this.#props.change;
  }

  /**
   * アームドーザ決定通知ストリームを取得する
   * @return アームドーザ決定通知ストリーム
   */
  notifyDecision(): Observable<ArmdozerId> {
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
