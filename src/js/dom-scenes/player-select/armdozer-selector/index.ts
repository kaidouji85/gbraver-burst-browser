import { ArmdozerId } from "gbraver-burst-core";
import { Howl } from "howler";
import { Observable, Subject, Unsubscribable } from "rxjs";

import { pop } from "../../../dom/pop";
import { domPushStream, PushDOM } from "../../../dom/push-dom";
import { replaceDOM } from "../../../dom/replace-dom";
import { Exclusive } from "../../../exclusive/exclusive";
import { Resources } from "../../../resource";
import { SOUND_IDS } from "../../../resource/sound";
import { ArmdozerIcon } from "./armdozer-icon";
import { ArmdozerStatus } from "./armdozer-status";
import { createArmdozerIcon } from "./create-armdozer-icon";
import { BLOCK, BLOCK_HIDDEN } from "./dom/class-name";
import { extractDummyStatus, extractIcons, extractOkButton, extractPrevButton } from "./dom/extract-element";
import { rootInnerHTML } from "./dom/root-inner-html";

/** アームドーザアイコン関連オブジェクト */
type IconObjects = {
  /** アームドーザID */
  armdozerId: ArmdozerId;
  /** アームドーザアイコン */
  icon: ArmdozerIcon;
};

/** アームドーザセレクタ */
export class ArmdozerSelector {
  #armdozerId: ArmdozerId;
  #exclusive: Exclusive;
  #root: HTMLElement;
  #armdozerStatus: ArmdozerStatus;
  #armdozerIcons: IconObjects[];
  #okButton: HTMLElement;
  #prevButton: HTMLElement;
  #changeValueSound: Howl;
  #decideSound: Howl;
  #change: Subject<ArmdozerId>;
  #decide: Subject<ArmdozerId>;
  #prev: Subject<void>;
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
    this.#armdozerId = initialArmdozerId;

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

    this.#armdozerStatus = new ArmdozerStatus(resources);
    this.#armdozerStatus.switch(this.#armdozerId);
    const dummyStatus = extractDummyStatus(this.#root);
    replaceDOM(dummyStatus, this.#armdozerStatus.getRootHTMLElement());
    this.#armdozerIcons = armdozerIds.map((v) => ({
      armdozerId: v,
      icon: createArmdozerIcon(resources, v),
    }));

    const icons = extractIcons(this.#root);
    this.#armdozerIcons.forEach((v) => {
      v.icon.selected(v.armdozerId === initialArmdozerId);
      icons.appendChild(v.icon.getRootHTMLElement());
    });

    this.#okButton = extractOkButton(this.#root);
    this.#prevButton = extractPrevButton(this.#root);

    this.#unsubscribers = [
      ...this.#armdozerIcons.map((v) =>
        v.icon.notifySelection().subscribe(() => {
          this.#onArmdozerSelect(v.armdozerId);
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
   */
  show(): void {
    this.#root.className = BLOCK;
  }

  /**
   * 本コンポネントを非表示にする
   */
  hidden(): void {
    this.#root.className = BLOCK_HIDDEN;
  }

  /**
   * リソース読み込みが完了するまで待つ
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all(this.#armdozerIcons.map((v) => v.icon.waitUntilLoaded()));
  }

  /**
   * ルートHTML要素を取得する
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * アームドーザ選択の通知
   * @return イベント通知ストリーム
   */
  notifyChanges(): Observable<ArmdozerId> {
    return this.#change;
  }

  /**
   * アームドーザ決定通知ストリームを取得する
   * @return アームドーザ決定通知ストリーム
   */
  notifyDecision(): Observable<ArmdozerId> {
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
   * アームドーザアイコンが選択された際の処理
   * @param armdozerId 選択されたアームドーザID
   * @return 処理結果
   */
  #onArmdozerSelect(armdozerId: ArmdozerId): void {
    this.#exclusive.execute(async (): Promise<void> => {
      if (this.#armdozerId !== armdozerId) {
        this.#armdozerId = armdozerId;
        this.#armdozerStatus.switch(armdozerId);
        this.#change.next(this.#armdozerId);
      }

      this.#changeValueSound.play();
      this.#armdozerIcons
        .filter((v) => v.armdozerId === armdozerId)
        .forEach((v) => {
          v.icon.pop();
          v.icon.selected(true);
        });
      this.#armdozerIcons
        .filter((v) => v.armdozerId !== armdozerId)
        .forEach((v) => {
          v.icon.selected(false);
        });
    });
  }

  /**
   * 決定ボタンが押された時の処理
   * @param action アクション
   */
  #onOkButtonPush(action: PushDOM): void {
    this.#exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this.#decideSound.play();
      await pop(this.#okButton);
      this.#decide.next(this.#armdozerId);
    });
  }

  /**
   * 戻るボタンが押された時の処理
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
