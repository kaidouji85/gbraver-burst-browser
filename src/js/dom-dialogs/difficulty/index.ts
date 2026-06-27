import { Observable, Unsubscribable } from "rxjs";

import { NPCBattleCourseDifficulty } from "../../game/npc-battle/courses/npc-battle-course";
import { PathIds } from "../../resource/path/ids";
import { DOMDialog } from "../dialog";
import { bindEventListeners } from "./listeners";
import { DifficultyDialogProps, PropsCreatorParams } from "./props";
import { createDifficultyDialogProps } from "./props";

/** 難易度ダイアログでプリロードする画像パスのID */
export const DifficultyDialogPreLoadImagePathIds = [
  PathIds.NPC_COURSE_EASY_ICON,
  PathIds.NPC_COURSE_NORMAL_ICON,
  PathIds.NPC_COURSE_HARD_ICON,
  PathIds.NPC_COURSE_VERY_HARD_ICON,
  PathIds.CLOSER,
];

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
