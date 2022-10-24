// @flow

import type { PushDOM } from "../../dom/event-stream";
import { pushDOMStream } from "../../dom/event-stream";
import type { NPCBattleCourseDifficulty } from "../../game/npc-battle-courses";
import type { Resources } from "../../resource";
import type { Stream, Unsubscriber } from "../../stream/stream";
import type { DOMDialog } from "../dialog";
import { onCloserPush } from "./listeners/on-closer-push";
import { onEasyPush } from "./listeners/on-easy-push";
import { onHardPush } from "./listeners/on-hard-push";
import { onNormalPush } from "./listeners/on-normal-push";
import { onVeryHardPush } from "./listeners/on-very-hard-push";
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
    this.#unsubscribers = [
      pushDOMStream(this.#props.backGround).subscribe((action) => {
        this.#onBackGroundPush(action);
      }),
      pushDOMStream(this.#props.closer).subscribe((action) => {
        onCloserPush(this.#props, action);
      }),
      pushDOMStream(this.#props.easy).subscribe((action) => {
        onEasyPush(this.#props, action);
      }),
      pushDOMStream(this.#props.normal).subscribe((action) => {
        onNormalPush(this.#props, action);
      }),
      pushDOMStream(this.#props.hard).subscribe((action) => {
        onHardPush(this.#props, action);
      }),
      pushDOMStream(this.#props.veryHard).subscribe((action) => {
        onVeryHardPush(this.#props, action);
      }),
    ];
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

  /**
   * バックグラウンドが押された際の処理
   *
   * @param action アクション
   */
  #onBackGroundPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#props.exclusive.execute(async () => {
      await this.#props.changeValue.play();
      this.#props.closeDialog.next();
    });
  }
}
