import { PilotId } from "gbraver-burst-core";
import { Observable, Unsubscribable } from "rxjs";

import { bindEventListeners } from "./procedure/bind-event-lienters";
import {
  createPilotSelectorProps,
  PropsCreatorParams,
} from "./procedure/create-pilot-selector-props";
import { hidden } from "./procedure/hidden";
import { show } from "./procedure/show";
import { waitUntilLoaded } from "./procedure/wait-until-loaded";
import { PilotSelectorProps } from "./props";

/** コンストラクタのパラメータ */
export type PilotSelectorParams = PropsCreatorParams;

/**パイロットセレクタ */
export class PilotSelector {
  /** プロパティ */
  #props: PilotSelectorProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: PilotSelectorParams) {
    this.#props = createPilotSelectorProps(params);
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
   * @returns 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await waitUntilLoaded(this.#props);
  }

  /**
   * ルートHTML要素を取得する
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * パイロット変更通知
   * @returns 通知ストリーム
   */
  notifyChanges(): Observable<PilotId> {
    return this.#props.change;
  }

  /**
   * パイロット選択通知
   * @returns 通知ストリーム
   */
  notifyDecision(): Observable<PilotId> {
    return this.#props.decide;
  }

  /**
   * 戻る 通知
   * @returns 通知ストリーム
   */
  notifyPrev(): Observable<void> {
    return this.#props.prev;
  }
}
