import type { NPCBattleCourseDifficulty } from "../../game/npc-battle-courses";
import type { Resources } from "../../resource";
import type { Stream, Unsubscriber } from "../../stream/stream";
import type { DOMDialog } from "../dialog";
import { bindEventListeners } from "./listeners";
import type { DifficultyDialogProps } from "./props";
import { createDifficultyDialogProps } from "./props";

/** 難易度選択ダイアログ */
export class DifficultyDialog implements DOMDialog {
  /** プロパティ */
  #props: DifficultyDialogProps;

  /** アンサブスクライバ */
  #unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#props = createDifficultyDialogProps(resources);
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
   * @return 通知ストリーム
   */
  selectionCompleteNotifier(): Stream<NPCBattleCourseDifficulty> {
    return this.#props.selectionComplete;
  }

  /**
   * ダイアログを閉じる通知
   *
   * @return 通知ストリーム
   */
  closeDialogNotifier(): Stream<void> {
    return this.#props.closeDialog;
  }
}
