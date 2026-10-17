import { Observable, Subject, Unsubscribable } from "rxjs";

import { pop } from "../../../dom/pop";
import { domPushStream, PushDOM } from "../../../dom/push-dom";
import { Exclusive } from "../../../event/exclusive/exclusive";
import type { ResourcesContainer } from "../../../resource";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SoundResource } from "../../../resource/sound/resource";
import { SEPlayer, SEPlayerContainer } from "../../../sounds/se/se-player";
import type { PostNetworkError } from "../../post-network-error";
import type { DOMDialog } from "../dialog";
import { ROOT_CLASS } from "./dom/class-name";
import { extractPostNetworkErrorButton } from "./dom/extract-element";
import { rootInnerHtml } from "./dom/root-inner-html";

/** 通信エラー後処理ボタンの文言 */
const postNetworkErrorLabels = {
  Close: "閉じる",
  GotoTitle: "タイトルへ",
};

/** コンストラクタのパラメータ */
export type NetworkErrorDialogParams = ResourcesContainer &
  SEPlayerContainer & {
    /** 通信エラーの後処理 */
    postNetworkError: PostNetworkError;
  };

/** 通信エラー ダイアログ */
export class NetworkErrorDialog implements DOMDialog {
  /** ルート要素 */
  #root: HTMLElement;
  /** 通信エラーの後処理実行ボタン */
  #postNetworkErrorButton: HTMLButtonElement;
  /** 通信エラーの後処理 */
  #postNetworkError: PostNetworkError;
  /** 通信エラーの後処理実行通知 */
  #postNetworkErrorSource: Subject<PostNetworkError>;
  /** ボタン押下通知 */
  #pushButton: SoundResource;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];
  /** 排他制御 */
  #exclusive: Exclusive;
  /** SE再生オブジェクト */
  #se: SEPlayer;

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: NetworkErrorDialogParams) {
    const { resources, se, postNetworkError } = params;
    this.#se = se;
    this.#postNetworkError = postNetworkError;
    this.#root = document.createElement("div");
    this.#root.className = ROOT_CLASS;
    const postNetworkErrorLabel =
      postNetworkErrorLabels[postNetworkError.type] ?? "";
    this.#root.innerHTML = rootInnerHtml({ postNetworkErrorLabel });
    
    this.#postNetworkErrorButton = extractPostNetworkErrorButton(this.#root);
    this.#postNetworkErrorSource = new Subject();
    this.#unsubscribers = [
      domPushStream(this.#postNetworkErrorButton).subscribe((action) => {
        this.#onPostNetworkErrorButtonPush(action);
      }),
    ];
    this.#exclusive = new Exclusive();
    this.#pushButton =
      resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
      createEmptySoundResource();
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
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * 通信エラー後処理の実行タイミングを通知する
   *
   * @returns 通知ストリーム
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
      this.#se.play(this.#pushButton);
      await pop(this.#postNetworkErrorButton);
      this.#postNetworkErrorSource.next(this.#postNetworkError);
    });
  }
}
