import { Observable, Subject, Unsubscribable } from "rxjs";

import { pop } from "../../../dom/pop";
import { domPushStream } from "../../../dom/push-dom";
import { waitFinishAnimation } from "../../../dom/wait-finish-animation";
import { Exclusive } from "../../../exclusive/exclusive";
import { ResourcesContainer } from "../../../resource";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SEPlayerContainer } from "../../../se/se-player";
import { PostBattle } from "../../post-battle";
import { PostBattleButtonConfig } from "./post-battle-button-config";

/** ルートHTML要素のclass属性 */
const ROOT_CLASS = "post-battle";

/** アクションボタン */
type ActionButton = {
  /** ボタンのHTML要素 */
  button: HTMLButtonElement;
  /** ボタンイベントのUnsubscriber */
  unsubscriber: Unsubscribable;
};

/** showメソッドのパラメータ */
export type ShowParams = ResourcesContainer &
  SEPlayerContainer & {
    /** アクションボタン設定 */
    buttons: PostBattleButtonConfig[];
  };

/** バトル終了後行動選択フローター */
export class PostBattleFloater {
  /** ルートHTML要素 */
  #root: HTMLElement;
  /** 排他制御 */
  #exclusive: Exclusive;
  /** 選択完了通知 */
  #selectionComplete: Subject<PostBattle>;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * 本クラスの初期表示は(display: none)である
   */
  constructor() {
    this.#root = document.createElement("div");
    this.#root.className = ROOT_CLASS;
    this.#root.style.display = "none";
    this.#exclusive = new Exclusive();
    this.#selectionComplete = new Subject();
    this.#unsubscribers = [];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
    this.#root.innerHTML = "";
  }

  /**
   * ルートHTML要素を取得する
   *
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * アニメーション付きでフローターを表示する
   *
   * @param params 表示パラメータ
   * @returns アニメーションが完了したら発火するPromise
   */
  async show(params: ShowParams): Promise<void> {
    await this.#exclusive.execute(async () => {
      const actionButtons = this.#createActionButtons(params);
      actionButtons.forEach((v) => {
        this.#root.appendChild(v.button);
      });
      this.#unsubscribers = actionButtons.map((v) => v.unsubscriber);
      await this.#bottomUp();
    });
  }

  /**
   * フローターを非表示にする
   */
  hidden(): void {
    this.#root.style.display = "none";
    this.destructor();
  }

  /**
   * 選択完了通知
   * ストリームには選択した戦闘終了後の挙動が渡される
   *
   * @returns 通知ストリーム
   */
  selectionCompleteNotifier(): Observable<PostBattle> {
    return this.#selectionComplete;
  }

  /**
   * 本フローターをボトムアップ表示する
   *
   * @returns アニメーションが完了したら発火するプロミス
   */
  async #bottomUp(): Promise<void> {
    this.#root.style.display = "flex";
    const animation = this.#root.animate(
      [
        {
          transform: "translateY(100%)",
        },
        {
          transform: "translateY(0)",
        },
      ],
      {
        duration: 400,
        fill: "forwards",
        easing: "ease",
      },
    );
    await waitFinishAnimation(animation);
  }

  /**
   * 戦闘後アクションボタンを生成する
   * @param params 生成パラメータ
   * @returns 生成結果
   */
  #createActionButtons(params: ShowParams): ActionButton[] {
    const { resources, se, buttons } = params;
    const pushButton =
      resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
      createEmptySoundResource();
    const changeValue =
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
      createEmptySoundResource();

    const buttonStyles = {
      MainButton: {
        className: `${ROOT_CLASS}__main-action`,
        sound: pushButton,
      },
      SubButton: {
        className: `${ROOT_CLASS}__sub-action`,
        sound: changeValue,
      },
    };
    return buttons.map(({ style, action, label }) => {
      const button = document.createElement("button");
      button.innerText = label;
      const { className, sound } =
        buttonStyles[style] ?? buttonStyles["SubButton"];
      button.className = className;
      const unsubscriber = domPushStream(button).subscribe(({ event }) => {
        this.#exclusive.execute(async () => {
          event.preventDefault();
          event.stopPropagation();
          se.play(sound);
          await pop(button);
          this.#selectionComplete.next(action);
        });
      });
      return {
        button,
        unsubscriber,
      };
    });
  }
}
