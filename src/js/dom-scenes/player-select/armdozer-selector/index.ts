import { ArmdozerId } from "gbraver-burst-core";
import { Observable, Unsubscribable } from "rxjs";

import { pop } from "../../../dom/pop";
import { domPushStream, PushDOM } from "../../../dom/push-dom";
import { Resources } from "../../../resource";
import { createArmdozerSelectorProps } from "./procedure/create-armdozer-selector-props";
import { ArmdozerSelectorProps } from "./props";
import { show } from "./procedure/show";
import { hidden } from "./procedure/hidden";
import { waitUntilLoaded } from "./procedure/wait-until-loaded";
import { onArmdozerSelect } from "./procedure/on-armdozer-select";


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
    this.#unsubscribers = [
      ...this.#props.armdozerIcons.map((v) =>
        v.icon.notifySelection().subscribe(() => {
          onArmdozerSelect(this.#props, v.armdozerId);
        }),
      ),
      domPushStream(this.#props.okButton).subscribe((action) => {
        this.#onOkButtonPush(action);
      }),
      domPushStream(this.#props.prevButton).subscribe((action) => {
        this.#onPrevButtonPush(action);
      }),
    ];
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

  /**
   * 決定ボタンが押された時の処理
   * @param action アクション
   */
  #onOkButtonPush(action: PushDOM): void {
    this.#props.exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this.#props.decideSound.play();
      await pop(this.#props.okButton);
      this.#props.decide.next(this.#props.armdozerId);
    });
  }

  /**
   * 戻るボタンが押された時の処理
   *
   * @param action アクション
   */
  #onPrevButtonPush(action: PushDOM): void {
    this.#props.exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this.#props.changeValueSound.play();
      await pop(this.#props.prevButton);
      this.#props.prev.next();
    });
  }
}
