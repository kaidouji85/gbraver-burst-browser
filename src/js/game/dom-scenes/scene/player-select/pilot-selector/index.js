// @flow
import type { PilotId } from "gbraver-burst-core";
import { Howl } from "howler";

import { pop } from "../../../../../dom/animation";
import type { PushDOM } from "../../../../../dom/event-stream";
import { pushDOMStream } from "../../../../../dom/event-stream";
import { replaceDOM } from "../../../../../dom/replace-dom";
import { Exclusive } from "../../../../../exclusive/exclusive";
import type { Resources } from "../../../../../resource";
import { SOUND_IDS } from "../../../../../resource/sound";
import type {
  Stream,
  StreamSource,
  Unsubscriber,
} from "../../../../../stream/stream";
import { createStreamSource } from "../../../../../stream/stream";
import { domUuid } from "../../../../../uuid/dom-uuid";
import { createPilotIcon } from "./create-pilot-icon";
import { PilotIcon } from "./pilot-icon";
import { PilotStatus } from "./pilot-status";

/**ルート要素のclass名 */
export const ROOT_CLASS_NAME = "pilot-selector";

/** data-idを集めたもの*/
type DataIDs = {
  dummyStatus: string,
  icons: string,
  okButton: string,
  prevButton: string,
};

/**
 * ルート要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs): string {
  return `
    <div data-id="${ids.dummyStatus}"></div>
    <div class="${ROOT_CLASS_NAME}__icons" data-id="${ids.icons}"></div>
    <div class="${ROOT_CLASS_NAME}__controllers">
    <button class="${ROOT_CLASS_NAME}__prev-button" data-id="${ids.prevButton}">戻る</button>
    <button class="${ROOT_CLASS_NAME}__ok-button" data-id="${ids.okButton}">これを載せる</button>
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  dummyStatus: HTMLElement,
  icons: HTMLElement,
  okButton: HTMLElement,
  prevButton: HTMLElement,
};

/**
 *  ルート要素の子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const dummyStatus =
    root.querySelector(`[data-id="${ids.dummyStatus}"]`) ??
    document.createElement("div");
  const icons =
    root.querySelector(`[data-id="${ids.icons}"]`) ??
    document.createElement("div");
  const okButton =
    root.querySelector(`[data-id="${ids.okButton}"]`) ??
    document.createElement("button");
  const prevButton =
    root.querySelector(`[data-id="${ids.prevButton}"]`) ??
    document.createElement("button");
  return { dummyStatus, icons, okButton, prevButton };
}

/**パイロットセレクタ */
export class PilotSelector {
  #pilotId: PilotId;
  #exclusive: Exclusive;
  #root: HTMLElement;
  #pilotStatus: PilotStatus;
  #pilotIcons: Array<{ pilotId: PilotId, icon: PilotIcon }>;
  #okButton: HTMLElement;
  #prevButton: HTMLElement;
  #changeValueSound: typeof Howl;
  #decideSound: typeof Howl;
  #change: StreamSource<PilotId>;
  #decide: StreamSource<PilotId>;
  #prev: StreamSource<void>;
  #unsubscribers: Unsubscriber[];

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
    initialPilotId: PilotId
  ) {
    this.#pilotId = initialPilotId;
    this.#exclusive = new Exclusive();
    this.#change = createStreamSource();
    this.#decide = createStreamSource();
    this.#prev = createStreamSource();

    this.#changeValueSound =
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE)?.sound ??
      new Howl();
    this.#decideSound =
      resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON)?.sound ??
      new Howl();

    const dataIDs = {
      dummyStatus: domUuid(),
      icons: domUuid(),
      okButton: domUuid(),
      prevButton: domUuid(),
    };
    this.#root = document.createElement("div");
    this.#root.className = ROOT_CLASS_NAME;
    this.#root.innerHTML = rootInnerHTML(dataIDs);
    const elements = extractElements(this.#root, dataIDs);

    this.#pilotStatus = new PilotStatus();
    this.#pilotStatus.switch(this.#pilotId);
    replaceDOM(elements.dummyStatus, this.#pilotStatus.getRootHTMLElement());

    this.#pilotIcons = pilotIds.map((v) => ({
      pilotId: v,
      icon: createPilotIcon(resources, v),
    }));
    this.#pilotIcons.forEach((v) => {
      v.icon.selected(v.pilotId === initialPilotId);
      elements.icons.appendChild(v.icon.getRootHTMLElement());
    });

    this.#okButton = elements.okButton;
    this.#prevButton = elements.prevButton;

    this.#unsubscribers = [
      ...this.#pilotIcons.map((v) =>
        v.icon.selectedNotifier().subscribe(() => {
          this.#onPilotChange(v.pilotId);
        })
      ),
      pushDOMStream(this.#okButton).subscribe((action) => {
        this.#onOkButtonPush(action);
      }),
      pushDOMStream(this.#prevButton).subscribe((action) => {
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
   *
   * @@aram pilotId 選択するパイロットID
   */
  show(pilotId?: PilotId): void {
    this.#root.className = ROOT_CLASS_NAME;

    const selected = this.#pilotIcons.find((v) => v.pilotId === pilotId);
    if (!pilotId || !selected) {
      return;
    }

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
    this.#root.className = `${ROOT_CLASS_NAME}--hidden`;
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
  changeNotifier(): Stream<PilotId> {
    return this.#change;
  }

  /**
   * パイロット選択通知
   *
   * @return 通知ストリーム
   */
  decideNotifier(): Stream<PilotId> {
    return this.#decide;
  }

  /**
   * 戻る 通知
   * @return 通知ストリーム
   */
  prevNotifier(): Stream<void> {
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
