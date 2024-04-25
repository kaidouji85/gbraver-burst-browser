import { Observable, Unsubscribable } from "rxjs";

import type { NPCBattleCourseDifficulty } from "../../game/npc-battle-courses";
import type { DOMDialog } from "../dialog";
import { bindEventListeners } from "./listeners";
import { DifficultyDialogProps, PropsCreatorParams } from "./props";
import { createDifficultyDialogProps } from "./props";

/** コンストラクタのパラメータ */
export type DifficultyDialogParams = PropsCreatorParams;

/** 難易度選択ダイアログ */
export class DifficultyDialog implements DOMDialog {
  /** プロパティ */
  #props: DifficultyDialogProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: DifficultyDialogParams) {
    this.#props = createDifficultyDialogProps(params);
    this.#unsubscribers = bindEventListeners(this.#props);
  }

  /** @override */
  destructor(): void {
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * 難易度選択完了通知
   *
   * @returns 通知ストリーム
   */
  notifySelectionComplete(): Observable<NPCBattleCourseDifficulty> {
    return this.#props.selectionComplete;
  }

  /**
   * ダイアログを閉じる通知
   *
   * @returns 通知ストリーム
   */
  notifyClosed(): Observable<void> {
    return this.#props.closeDialog;
  }
}
