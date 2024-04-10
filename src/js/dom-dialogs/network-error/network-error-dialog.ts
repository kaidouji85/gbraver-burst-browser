import { Observable, Subject, Unsubscribable } from "rxjs";

import { pop } from "../../dom/pop";
import { domPushStream, PushDOM } from "../../dom/push-dom";
import { Exclusive } from "../../exclusive/exclusive";
import type { PostNetworkError } from "../../game/post-network-error";
import type { Resources } from "../../resource";
import { createEmptySoundResource } from "../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../resource/sound/ids";
import { SoundResource } from "../../resource/sound/resource";
import { domUuid } from "../../uuid/dom-uuid";
import type { DOMDialog } from "../dialog";

/** ルート要素のcssクラス名 */
const ROOT_CLASS_NAME = "network-error";

/** data-idを集めたもの */
type DataIDs = {
  postNetworkErrorButton: string;
};

/**
 * 通信エラー後処理情報に対応した、ボタンの文言を取得する
 *
 * @param postNetworkError 通信エラー後処理情報
 * @return ボタン文言
 */
function postNetowrkErrorLabel(postNetworkError: PostNetworkError) {
  switch (postNetworkError.type) {
    case "Close":
      return "閉じる";

    case "GotoTitle":
      return "タイトルへ";

    default:
      return "";
  }
}

/**
 * ルート要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @param postNetworkErrorLabel 通信エラー後処理ボタンの文言
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs, postNetworkErrorLabel: string): string {
  return `
    <div class="${ROOT_CLASS_NAME}__background"></div>
    <div class="${ROOT_CLASS_NAME}__dialog">
      <span class="${ROOT_CLASS_NAME}__caption">通信エラーが発生しました</span>
      <button class="${ROOT_CLASS_NAME}__post-network-error" data-id="${ids.postNetworkErrorButton}">${postNetworkErrorLabel}</button>
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  postNetworkErrorButton: HTMLButtonElement;
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const postNetworkErrorButtonElement = root.querySelector(
    `[data-id="${ids.postNetworkErrorButton}"]`,
  );
  const postNetworkErrorButton =
    postNetworkErrorButtonElement instanceof HTMLButtonElement
      ? postNetworkErrorButtonElement
      : document.createElement("button");
  return {
    postNetworkErrorButton,
  };
}

/** 通信エラー ダイアログ */
export class NetworkErrorDialog implements DOMDialog {
  #root: HTMLElement;
  #postNetworkErrorButton: HTMLButtonElement;
  #postNetworkError: PostNetworkError;
  #postNetworkErrorSource: Subject<PostNetworkError>;
  #pushButton: SoundResource;
  #unsubscribers: Unsubscribable[];
  #exclusive: Exclusive;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param postNetworkError 通信エラーの後処理情報
   */
  constructor(resources: Resources, postNetworkError: PostNetworkError) {
    this.#postNetworkError = postNetworkError;
    const dataIDs = {
      postNetworkErrorButton: domUuid(),
    };
    this.#root = document.createElement("div");
    this.#root.className = ROOT_CLASS_NAME;
    const label = postNetowrkErrorLabel(this.#postNetworkError);
    this.#root.innerHTML = rootInnerHTML(dataIDs, label);
    const elements = extractElements(this.#root, dataIDs);
    this.#postNetworkErrorButton = elements.postNetworkErrorButton;
    this.#postNetworkErrorSource = new Subject();
    this.#unsubscribers = [
      domPushStream(this.#postNetworkErrorButton).subscribe((action) => {
        this.#onPostNetworkErrorButtonPush(action);
      }),
    ];
    this.#exclusive = new Exclusive();
    this.#pushButton =
      resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
      createEmptySoundResource()
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
   * ルートのHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * 通信エラー後処理の実行タイミングを通知する
   *
   * @return 通知ストリーム
   */
  notifyPostNetworkError(): Observable<PostNetworkError> {
    return this.#postNetworkErrorSource;
  }

  /**
   * 通信エラー後処理ボタンを押した時の処理
   *
   * @param action アクション
   */
  #onPostNetworkErrorButtonPush(action: PushDOM): void {
    this.#exclusive.execute(async () => {
      action.event.preventDefault();
      this.#pushButton.sound.play();
      await pop(this.#postNetworkErrorButton);
      this.#postNetworkErrorSource.next(this.#postNetworkError);
    });
  }
}
