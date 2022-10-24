// @flow
import { Howl } from "howler";

import { pop } from "../../dom/animation";
import type { PushDOM } from "../../dom/event-stream";
import { pushDOMStream } from "../../dom/event-stream";
import { Exclusive } from "../../exclusive/exclusive";
import type { NPCBattleCourseDifficulty } from "../../game/npc-battle-courses";
import type { Resources } from "../../resource";
import { SOUND_IDS } from "../../resource/sound";
import type { Stream, StreamSource, Unsubscriber } from "../../stream/stream";
import { createStreamSource } from "../../stream/stream";
import { domUuid } from "../../uuid/dom-uuid";
import type { DOMDialog } from "../dialog";
import { ROOT_CLASS } from "./dom/class-name";
import { extractElements } from "./dom/elements";
import { rootInnerHTML } from "./dom/root-inner-html";

/** 難易度選択ダイアログ */
export class DifficultyDialog implements DOMDialog {
  #root: HTMLElement;
  #closer: HTMLElement;
  #easy: HTMLElement;
  #easyButton: HTMLElement;
  #normal: HTMLElement;
  #normalButton: HTMLElement;
  #hard: HTMLElement;
  #hardButton: HTMLElement;
  #veryHard: HTMLElement;
  #veryHardButton: HTMLElement;
  #exclusive: Exclusive;
  #selectionComplete: StreamSource<NPCBattleCourseDifficulty>;
  #closeDialog: StreamSource<void>;
  #unsubscribers: Unsubscriber[];
  #changeValue: typeof Howl;
  #pushButton: typeof Howl;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const ids = {
      backGround: domUuid(),
      closer: domUuid(),
      easy: domUuid(),
      easyButton: domUuid(),
      normal: domUuid(),
      normalButton: domUuid(),
      hard: domUuid(),
      hardButton: domUuid(),
      veryHard: domUuid(),
      veryHardButton: domUuid(),
    };
    this.#root = document.createElement("div");
    this.#root.className = ROOT_CLASS;
    this.#root.innerHTML = rootInnerHTML(resources, ids);

    const elements = extractElements(this.#root, ids);
    this.#closer = elements.closer;
    this.#easy = elements.easy;
    this.#easyButton = elements.easyButton;
    this.#normal = elements.normal;
    this.#normalButton = elements.normalButton;
    this.#hard = elements.hard;
    this.#hardButton = elements.hardButton;
    this.#veryHard = elements.veryHard;
    this.#veryHardButton = elements.veryHardButton;
    this.#unsubscribers = [
      pushDOMStream(elements.backGround).subscribe((action) => {
        this.#onBackGroundPush(action);
      }),
      pushDOMStream(this.#closer).subscribe((action) => {
        this.#onCloserPush(action);
      }),
      pushDOMStream(this.#easy).subscribe((action) => {
        this.#onEasyPush(action);
      }),
      pushDOMStream(this.#normal).subscribe((action) => {
        this.#onNormalPush(action);
      }),
      pushDOMStream(this.#hard).subscribe((action) => {
        this.#onHardPush(action);
      }),
      pushDOMStream(this.#veryHard).subscribe((action) => {
        this.#onVeryHardPush(action);
      }),
    ];

    this.#selectionComplete = createStreamSource();
    this.#closeDialog = createStreamSource();
    this.#exclusive = new Exclusive();
    this.#changeValue =
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE)?.sound ??
      new Howl();
    this.#pushButton =
      resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON)?.sound ??
      new Howl();
  }

  /** @override */
  destructor(): void {
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * 難易度選択完了通知
   *
   * @return 通知ストリーム
   */
  selectionCompleteNotifier(): Stream<NPCBattleCourseDifficulty> {
    return this.#selectionComplete;
  }

  /**
   * ダイアログを閉じる通知
   *
   * @return 通知ストリーム
   */
  closeDialogNotifier(): Stream<void> {
    return this.#closeDialog;
  }

  /**
   * Easyが押された際の処理
   *
   * @param action アクション
   */
  #onEasyPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#exclusive.execute(async () => {
      this.#pushButton.play();
      await pop(this.#easyButton);
      this.#selectionComplete.next("Easy");
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
    this.#exclusive.execute(async () => {
      this.#pushButton.play();
      await pop(this.#normalButton);
      this.#selectionComplete.next("Normal");
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
    this.#exclusive.execute(async () => {
      this.#pushButton.play();
      await pop(this.#hardButton);
      this.#selectionComplete.next("Hard");
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
    this.#exclusive.execute(async () => {
      this.#pushButton.play();
      await pop(this.#veryHardButton);
      this.#selectionComplete.next("VeryHard");
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
    this.#exclusive.execute(async () => {
      this.#changeValue.play();
      await pop(this.#closer, 1.3);
      this.#closeDialog.next();
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
    this.#exclusive.execute(async () => {
      await this.#changeValue.play();
      this.#closeDialog.next();
    });
  }
}
