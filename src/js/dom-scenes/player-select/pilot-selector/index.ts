import { PilotId } from "gbraver-burst-core";
import { Howl } from "howler";
import { Observable, Subject, Unsubscribable } from "rxjs";

import { pop } from "../../../dom/pop";
import { domPushStream, PushDOM } from "../../../dom/push-dom";
import { replaceDOM } from "../../../dom/replace-dom";
import { Exclusive } from "../../../exclusive/exclusive";
import { Resources } from "../../../resource";
import { SOUND_IDS } from "../../../resource/sound";
import { createPilotIcon } from "./create-pilot-icon";
import { BLOCK } from "./dom/class-name";
import { extractDummyStatus, extractIcons, extractOkButton, extractPrevButton } from "./dom/extract-element";
import { rootInnerHTML } from "./dom/root-inner-html";
import { PilotIcon } from "./pilot-icon";
import { PilotStatus } from "./pilot-status";

/**パイロットセレクタ */
export class PilotSelector {
  #pilotId: PilotId;
  #exclusive: Exclusive;
  #root: HTMLElement;
  #pilotStatus: PilotStatus;
  #pilotIcons: Array<{
    pilotId: PilotId;
    icon: PilotIcon;
  }>;
  #okButton: HTMLElement;
  #prevButton: HTMLElement;
  #changeValueSound: Howl;
  #decideSound: Howl;
  #change: Subject<PilotId>;
  #decide: Subject<PilotId>;
  #prev: Subject<void>;
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
    this.#pilotId = initialPilotId;
    this.#exclusive = new Exclusive();
    this.#change = new Subject();
    this.#decide = new Subject();
    this.#prev = new Subject();
    this.#changeValueSound =
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE)?.sound ??
      new Howl({ src: "" });
    this.#decideSound =
      resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON)?.sound ??
      new Howl({ src: "" });
    
    this.#root = document.createElement("div");
    this.#root.className = BLOCK;
    this.#root.innerHTML = rootInnerHTML();
    
    this.#pilotStatus = new PilotStatus();
    this.#pilotStatus.switch(this.#pilotId);
    const dummyStatus = extractDummyStatus(this.#root);
    replaceDOM(dummyStatus, this.#pilotStatus.getRootHTMLElement());
    this.#pilotIcons = pilotIds.map((v) => ({
      pilotId: v,
      icon: createPilotIcon(resources, v),
    }));

    const icons = extractIcons(this.#root);
    this.#pilotIcons.forEach((v) => {
      v.icon.selected(v.pilotId === initialPilotId);
      icons.appendChild(v.icon.getRootHTMLElement());
    });

    this.#okButton = extractOkButton(this.#root);
    
    this.#prevButton = extractPrevButton(this.#root);
    
    this.#unsubscribers = [
      ...this.#pilotIcons.map((v) =>
        v.icon.notifySelection().subscribe(() => {
          this.#onPilotChange(v.pilotId);
        }),
      ),
      domPushStream(this.#okButton).subscribe((action) => {
        this.#onOkButtonPush(action);
      }),
      domPushStream(this.#prevButton).subscribe((action) => {
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
    const selected = this.#pilotIcons.find((v) => v.pilotId === pilotId);
    if (!selected) {
      return;
    }

    this.#root.className = BLOCK;
    this.#pilotId = pilotId;
    selected.icon.selected(true);
    this.#pilotStatus.switch(pilotId);
    this.#pilotIcons
      .filter((v) => v.pilotId !== pilotId)
      .forEach((v) => {
        v.icon.selected(false);
      });
  }

  /**
   * 本コンポネントを非表示にする
   */
  hidden(): void {
    this.#root.className = `${BLOCK}--hidden`;
  }

  /**
   * リソース読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all(this.#pilotIcons.map((v) => v.icon.waitUntilLoaded()));
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * パイロット変更通知
   *
   * @return 通知ストリーム
   */
  notifyChanges(): Observable<PilotId> {
    return this.#change;
  }

  /**
   * パイロット選択通知
   *
   * @return 通知ストリーム
   */
  notifyDecision(): Observable<PilotId> {
    return this.#decide;
  }

  /**
   * 戻る 通知
   * @return 通知ストリーム
   */
  notifyPrev(): Observable<void> {
    return this.#prev;
  }

  /**
   * パイロットが変更された時の処理
   *
   * @param pilotId 変更したパイロットのID
   */
  #onPilotChange(pilotId: PilotId): void {
    this.#exclusive.execute(async (): Promise<void> => {
      const selected = this.#pilotIcons.find((v) => v.pilotId === pilotId);

      if (!selected) {
        return;
      }

      if (this.#pilotId !== pilotId) {
        this.#change.next(pilotId);
      }

      this.#pilotId = pilotId;
      this.#pilotStatus.switch(pilotId);
      selected.icon.pop();
      this.#changeValueSound.play();
      selected.icon.selected(true);
      this.#pilotIcons
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
    this.#exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this.#decideSound.play();
      await pop(this.#okButton);
      this.#decide.next(this.#pilotId);
    });
  }

  /**
   * 戻るボタンを押した時の処理
   *
   * @param action アクション
   */
  #onPrevButtonPush(action: PushDOM): void {
    this.#exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this.#changeValueSound.play();
      await pop(this.#prevButton);
      this.#prev.next();
    });
  }
}
