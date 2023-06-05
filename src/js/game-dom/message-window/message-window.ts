import {waitFinishAnimation} from "../../dom/animation";
import {replaceDOM} from "../../dom/replace-dom";
import type {Resources} from "../../resource";
import {domUuid} from "../../uuid/dom-uuid";
import type {FaceOrientation, FaceType} from "./face-graphic";
import {FaceGraphic} from "./face-graphic";
import {
  NEXT_MESSAGE_ICON_CLASS,
  NEXT_MESSAGE_ICON_CLASS_INVISIBLE,
  ROOT_CLASS,
  ROOT_CLASS_INVISIBLE
} from "./dom/class-name";
import {Position} from "./position";
import {toRootClass} from "./dom/to-root-class";
import {FacePosition} from "./face-position";
import {CSS_PROPS_BRIGHTNESS} from "./dom/css-custom-props";
import {rootInnerHTML} from "./dom/root-inner-html";
import {extractElements} from "./dom/elements";

/** コンストラクタのパラメータ */
type Params = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ウインドウ位置 */
  position?: Position;
  /** 顔画像位置 */
  facePosition?: FacePosition;
  /** 顔画像の向き */
  faceOrientation?: FaceOrientation;
};

/** メッセージウインドウ */
export class MessageWindow {
  #root: HTMLElement;
  #messages: HTMLElement;
  #nextMessageIcon: HTMLElement;
  #leftFaceGraphic: FaceGraphic;
  #rightFaceGraphic: FaceGraphic;
  #position: Position;
  #faceOrientation: FaceOrientation;
  #facePosition: FacePosition;

  /**
   * コンストラクタ
   *
   * @param params パラメータ
   */
  constructor(params: Params) {
    const ids = {
      messages: domUuid(),
      leftFaceGraphic: domUuid(),
      rightFaceGraphic: domUuid(),
    };
    this.#root = document.createElement("div");
    this.#position = params?.position ?? "Center";
    this.#facePosition = params?.facePosition ?? "Right";
    this.#faceOrientation = params?.faceOrientation ?? "Left";
    this.#root.className = toRootClass(this.#position);
    this.#root.innerHTML = rootInnerHTML(ids);
    const { messages, leftFaceGraphic, rightFaceGraphic } = extractElements(
      this.#root,
      ids
    );
    this.#messages = messages;
    this.#nextMessageIcon = document.createElement("span");
    this.#nextMessageIcon.className = NEXT_MESSAGE_ICON_CLASS_INVISIBLE;
    this.#nextMessageIcon.innerText = "▼";
    this.#leftFaceGraphic = new FaceGraphic(params.resources);
    replaceDOM(leftFaceGraphic, this.#leftFaceGraphic.getRootHTMLElement());
    this.#rightFaceGraphic = new FaceGraphic(params.resources);
    replaceDOM(rightFaceGraphic, this.#rightFaceGraphic.getRootHTMLElement());
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
   * 表示、非表示を設定する
   *
   * @param isVisible trueで表示する
   */
  visible(isVisible: boolean): void {
    this.#root.className = isVisible
      ? toRootClass(this.#position)
      : ROOT_CLASS_INVISIBLE;
  }

  /**
   * メッセージを配列形式で設定する
   * 配列の区切れで改行をする
   *
   * @param values メッセージ
   */
  messages(values: string[]): void {
    const createParagraph = (message: string) => {
      const div = document.createElement("div");
      div.className = `${ROOT_CLASS}__paragraph`;
      div.innerText = message;
      return div;
    };

    this.#messages.innerHTML = "";
    const paragraphs = values.map((message) => createParagraph(message));
    const lastParagraph: HTMLElement | null | undefined =
      paragraphs[paragraphs.length - 1];

    if (!lastParagraph) {
      return;
    }

    paragraphs
      .filter((v) => v !== lastParagraph)
      .forEach((paragraph) => {
        this.#messages.appendChild(paragraph);
      });
    lastParagraph.appendChild(this.#nextMessageIcon);
    this.#messages.appendChild(lastParagraph);
  }

  /**
   * メッセージを上スクロールする
   *
   * @return アニメーションが完了したら発火するPromise
   */
  async scrollUp(): Promise<void> {
    await waitFinishAnimation(
      this.#messages.animate(
        [
          {
            transform: "translateY(2vh)",
          },
          {
            transform: "translateY(0%)",
          },
        ],
        {
          duration: 100,
        }
      )
    );
  }

  /**
   * 顔画像を変更する
   *
   * @param faceType 変更する顔画像
   */
  face(faceType: FaceType): void {
    const target = this.#getTargetFaceGraphic();
    target.face(faceType, this.#faceOrientation);
  }

  /**
   * 顔画像の表示、非表示設定
   *
   * @param isVisible 顔画像表示フラグ、trueで表示する
   */
  faceVisible(isVisible: boolean): void {
    const target = this.#getTargetFaceGraphic();
    target.visible(isVisible);
  }

  /**
   * 次メッセージアイコンの表示、非表示設定
   *
   * @param isNextMessageIconVisible 次メッセージアイコンを表示するか、trueで表示する
   */
  nextMessageIconVisible(isNextMessageIconVisible: boolean): void {
    this.#nextMessageIcon.className = isNextMessageIconVisible
      ? NEXT_MESSAGE_ICON_CLASS
      : NEXT_MESSAGE_ICON_CLASS_INVISIBLE;
  }

  /**
   * ウインドウを暗くする
   */
  darken(): void {
    this.#root.style.setProperty(CSS_PROPS_BRIGHTNESS, `brightness(0.5)`);
  }

  /**
   * ウインドウを標準の明るさにする
   */
  lighten(): void {
    this.#root.style.setProperty(CSS_PROPS_BRIGHTNESS, `brightness(1)`);
  }

  /**
   * 表示位置に応じた顔画像を取得する
   *
   * @return 取得結果
   */
  #getTargetFaceGraphic(): FaceGraphic {
    return this.#facePosition === "Left"
      ? this.#leftFaceGraphic
      : this.#rightFaceGraphic;
  }
}
