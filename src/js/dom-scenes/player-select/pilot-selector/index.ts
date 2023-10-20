import { PilotId } from "gbraver-burst-core";
import { Observable, Subject, Unsubscribable } from "rxjs";

import { pop } from "../../../dom/pop";
import { domPushStream, PushDOM } from "../../../dom/push-dom";
import { Resources } from "../../../resource";
import { BLOCK } from "./dom/class-name";
import { createPilotSelectorProps } from "./procedure/create-pilot-selector-props";
import { PilotSelectorProps } from "./props";

/**パイロットセレクタ */
export class PilotSelector {
  /** プロパティ */
  #props: PilotSelectorProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   *
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
    this.#unsubscribers = [
      ...this.#props.pilotIcons.map((v) =>
        v.icon.notifySelection().subscribe(() => {
          this.#onPilotChange(v.pilotId);
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
   * @param pilotId 選択するパイロットID
   */
  show(pilotId: PilotId): void {
    const selected = this.#props.pilotIcons.find((v) => v.pilotId === pilotId);
    if (!selected) {
      return;
    }

    this.#props.root.className = BLOCK;
    this.#props.pilotId = pilotId;
    selected.icon.selected(true);
    this.#props.pilotStatus.switch(pilotId);
    this.#props.pilotIcons
      .filter((v) => v.pilotId !== pilotId)
      .forEach((v) => {
        v.icon.selected(false);
      });
  }

  /**
   * 本コンポネントを非表示にする
   */
  hidden(): void {
    this.#props.root.className = `${BLOCK}--hidden`;
  }

  /**
   * リソース読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all(this.#props.pilotIcons.map((v) => v.icon.waitUntilLoaded()));
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * パイロット変更通知
   *
   * @return 通知ストリーム
   */
  notifyChanges(): Observable<PilotId> {
    return this.#props.change;
  }

  /**
   * パイロット選択通知
   *
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

  /**
   * パイロットが変更された時の処理
   *
   * @param pilotId 変更したパイロットのID
   */
  #onPilotChange(pilotId: PilotId): void {
    this.#props.exclusive.execute(async (): Promise<void> => {
      const selected = this.#props.pilotIcons.find((v) => v.pilotId === pilotId);

      if (!selected) {
        return;
      }

      if (this.#props.pilotId !== pilotId) {
        this.#props.change.next(pilotId);
      }

      this.#props.pilotId = pilotId;
      this.#props.pilotStatus.switch(pilotId);
      selected.icon.pop();
      this.#props.changeValueSound.play();
      selected.icon.selected(true);
      this.#props.pilotIcons
        .filter((v) => v.pilotId !== pilotId)
        .forEach((v) => {
          v.icon.selected(false);
        });
    });
  }

  /**
   * OKボタンを押した時の処理
   *
   * @param action アクション
   */
  #onOkButtonPush(action: PushDOM): void {
    this.#props.exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this.#props.decideSound.play();
      await pop(this.#props.okButton);
      this.#props.decide.next(this.#props.pilotId);
    });
  }

  /**
   * 戻るボタンを押した時の処理
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
