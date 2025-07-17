import { Observable, Unsubscribable } from "rxjs";

import { DOMDialog } from "../dialog";
import { bindEventListeners } from "./procedures/bind-event-listeners";
import {
  createTutorialDescriptionProps,
  TutorialDescriptionDialogPropsOptions,
} from "./procedures/create-tutoria-description-props";
import { TutorialDescriptionDialogProps } from "./props";

/** コンストラクタのオプション */
type TutorialDescriptionDialogOptions = TutorialDescriptionDialogPropsOptions;

/** チュートリアル説明ダイアログ */
export class TutorialDescriptionDialog implements DOMDialog {
  /** プロパティ */
  readonly #props: TutorialDescriptionDialogProps;
  /** アンサブスクライバ */
  readonly unsubscribables: Unsubscribable[];

  /**
   * @constructor
   * @param options コンストラクタのオプション
   */
  constructor(options: TutorialDescriptionDialogOptions) {
    this.#props = createTutorialDescriptionProps(options);
    this.unsubscribables = bindEventListeners(this.#props);
  }

  /** @override */
  destructor(): void {
    this.unsubscribables.forEach((unsub) => unsub.unsubscribe());
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * ダイアログを閉じたことを通知する
   * @returns 閉じる通知のオブザーバブル
   */
  notifyClose(): Observable<void> {
    return this.#props.closeNotifier;
  }

  /**
   * 「チュートリアルをはじめる」ボタンが押されたことを通知する
   * @returns 「チュートリアルをはじめる」通知のオブザーバブル
   */
  notifyStartTutorial(): Observable<void> {
    return this.#props.startTutorialNotifier;
  }
}
