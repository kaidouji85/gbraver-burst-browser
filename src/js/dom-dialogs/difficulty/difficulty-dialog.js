// @flow

import { pop } from "../../dom/animation";
import type { PushDOM } from "../../dom/event-stream";
import { pushDOMStream } from "../../dom/event-stream";
import type { NPCBattleCourseDifficulty } from "../../game/npc-battle-courses";
import type { Resources } from "../../resource";
import type { Stream, Unsubscriber } from "../../stream/stream";
import type { DOMDialog } from "../dialog";
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
        this.#onCloserPush(action);
      }),
      pushDOMStream(this.#props.easy).subscribe((action) => {
        this.#onEasyPush(action);
      }),
      pushDOMStream(this.#props.normal).subscribe((action) => {
        this.#onNormalPush(action);
      }),
      pushDOMStream(this.#props.hard).subscribe((action) => {
        this.#onHardPush(action);
      }),
      pushDOMStream(this.#props.veryHard).subscribe((action) => {
        this.#onVeryHardPush(action);
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
   * Easyが押された際の処理
   *
   * @param action アクション
   */
  #onEasyPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#props.exclusive.execute(async () => {
      this.#props.pushButton.play();
      await pop(this.#props.easyButton);
      this.#props.selectionComplete.next("Easy");
    });
  }

  /**
   * Normalが押された際の処理
   *
   * @param action アクション
   */
  #onNormalPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#props.exclusive.execute(async () => {
      this.#props.pushButton.play();
      await pop(this.#props.normalButton);
      this.#props.selectionComplete.next("Normal");
    });
  }

  /**
   * Hardが押された際の処理
   *
   * @param action アクション
   */
  #onHardPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#props.exclusive.execute(async () => {
      this.#props.pushButton.play();
      await pop(this.#props.hardButton);
      this.#props.selectionComplete.next("Hard");
    });
  }

  /**
   * VeryHardが押された際の処理
   *
   * @param action アクション
   */
  #onVeryHardPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#props.exclusive.execute(async () => {
      this.#props.pushButton.play();
      await pop(this.#props.veryHardButton);
      this.#props.selectionComplete.next("VeryHard");
    });
  }

  /**
   * 閉じるボタンが押された際の処理
   *
   * @param action アクション
   */
  #onCloserPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#props.exclusive.execute(async () => {
      this.#props.changeValue.play();
      await pop(this.#props.closer, 1.3);
      this.#props.closeDialog.next();
    });
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
