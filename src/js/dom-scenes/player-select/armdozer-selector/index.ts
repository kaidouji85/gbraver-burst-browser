import type { ArmDozerId } from "gbraver-burst-core";
import { Howl } from "howler";
import { Observable, Subject, Unsubscribable } from "rxjs";

import { pop } from "../../../dom/pop";
import { domPushStream, PushDOM } from "../../../dom/push-dom";
import { replaceDOM } from "../../../dom/replace-dom";
import { Exclusive } from "../../../exclusive/exclusive";
import type { Resources } from "../../../resource";
import { SOUND_IDS } from "../../../resource/sound";
import { domUuid } from "../../../uuid/dom-uuid";
import { ArmdozerIcon } from "./armdozer-icon";
import { ArmdozerStatus } from "./armdozer-status";
import { createArmdozerIcon } from "./create-armdozer-icon";

/** ルートHTML要素 class */
const ROOT_CLASS_NAME = "armdozer-selector";

/** data-idを集めたもの */
type DataIDs = {
  dummyStatus: string;
  okButton: string;
  prevButton: string;
  icons: string;
};

/**
 * ルート要素のinnerHTML
 *
 * @param ids
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs): string {
  return `
    <div data-id="${ids.dummyStatus}"></div>
    <div class="${ROOT_CLASS_NAME}__icons" data-id="${ids.icons}"></div>
    <div class="${ROOT_CLASS_NAME}__controllers">
      <button class="${ROOT_CLASS_NAME}__prev-button" data-id="${ids.prevButton}">戻る</button>
      <button class="${ROOT_CLASS_NAME}__ok-button" data-id="${ids.okButton}">これで出撃</button>
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  dummyStatus: HTMLElement;
  okButton: HTMLElement;
  prevButton: HTMLElement;
  icons: HTMLElement;
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const dummyStatus: HTMLElement =
    root.querySelector(`[data-id="${ids.dummyStatus}"]`) ??
    document.createElement("div");
  const icons: HTMLElement =
    root.querySelector(`[data-id="${ids.icons}"]`) ??
    document.createElement("div");
  const okButton: HTMLElement =
    root.querySelector(`[data-id="${ids.okButton}"]`) ??
    document.createElement("button");
  const prevButton: HTMLElement =
    root.querySelector(`[data-id="${ids.prevButton}"]`) ??
    document.createElement("button");
  return {
    dummyStatus,
    icons,
    okButton,
    prevButton,
  };
}

/** アームドーザアイコン関連オブジェクト */
type IconObjects = {
  armdozerId: ArmDozerId;
  icon: ArmdozerIcon;
};

/** アームドーザセレクタ */
export class ArmdozerSelector {
  #armdozerId: ArmDozerId;
  #exclusive: Exclusive;
  #root: HTMLElement;
  #armdozerStatus: ArmdozerStatus;
  #armdozerIcons: IconObjects[];
  #okButton: HTMLElement;
  #prevButton: HTMLElement;
  #changeValueSound: Howl;
  #decideSound: Howl;
  #change: Subject<ArmDozerId>;
  #decide: Subject<ArmDozerId>;
  #prev: Subject<void>;
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param armDozerIds アームドーザIDリスト
   * @param initialArmdozerId アームドーザID初期値
   */
  constructor(
    resources: Resources,
    armDozerIds: ArmDozerId[],
    initialArmdozerId: ArmDozerId
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
    const dataIDs = {
      dummyStatus: domUuid(),
      okButton: domUuid(),
      prevButton: domUuid(),
      icons: domUuid(),
    };
    this.#root = document.createElement("div");
    this.#root.className = ROOT_CLASS_NAME;
    this.#root.innerHTML = rootInnerHTML(dataIDs);
    const elements = extractElements(this.#root, dataIDs);
    this.#armdozerStatus = new ArmdozerStatus(resources);
    this.#armdozerStatus.switch(this.#armdozerId);
    replaceDOM(elements.dummyStatus, this.#armdozerStatus.getRootHTMLElement());
    this.#armdozerIcons = armDozerIds.map((v) => ({
      armdozerId: v,
      icon: createArmdozerIcon(resources, v),
    }));
    this.#armdozerIcons.forEach((v) => {
      v.icon.selected(v.armdozerId === initialArmdozerId);
      elements.icons.appendChild(v.icon.getRootHTMLElement());
    });
    this.#okButton = elements.okButton;
    this.#prevButton = elements.prevButton;
    this.#unsubscribers = [
      ...this.#armdozerIcons.map((v) =>
        v.icon.notifySelection().subscribe(() => {
          this.#onArmdozerSelect(v.armdozerId);
        })
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
    this.#root.className = ROOT_CLASS_NAME;
  }

  /**
   * 本コンポネントを非表示にする
   */
  hidden(): void {
    this.#root.className = `${ROOT_CLASS_NAME}--hidden`;
  }

  /**
   * リソース読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all(this.#armdozerIcons.map((v) => v.icon.waitUntilLoaded()));
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * アームドーザ選択の通知
   *
   * @return イベント通知ストリーム
   */
  notifyChanges(): Observable<ArmDozerId> {
    return this.#change;
  }

  /**
   * アームドーザ決定通知ストリームを取得する
   *
   * @return アームドーザ決定通知ストリーム
   */
  notifyDecision(): Observable<ArmDozerId> {
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
   *
   * @param armdozerId 選択されたアームドーザID
   * @return 処理結果
   */
  #onArmdozerSelect(armdozerId: ArmDozerId): void {
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
   *
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
