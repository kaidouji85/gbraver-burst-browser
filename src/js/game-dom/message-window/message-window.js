// @flow
import { waitFinishAnimation } from "../../dom/animation";
import { replaceDOM } from "../../dom/replace-dom";
import type { Resources } from "../../resource";
import { domUuid } from "../../uuid/dom-uuid";
import type { FaceOrientation, FaceType } from "./face-graphic";
import { FaceGraphic } from "./face-graphic";

/** ルートHTML要素のclass属性 */
const ROOT_CLASS = "message-window";

/** ルートHTML要素が非表示の際のclass属性 */
const ROOT_CLASS_INVISIBLE = `${ROOT_CLASS}--invisible`;

/** ルート要素が左側表示されている時のclass属性 */
const ROOT_CLASS_LEFT = `${ROOT_CLASS}--left`;

/** ルート要素が右側表示されている時のclass属性 */
const ROOT_CLASS_RIGHT = `${ROOT_CLASS}--right`;

/** ルート要素がバッテリーセレクタの隣に表示されている時のclass属性 */
const ROOT_CLASS_NEAR_BATTERY_SELECTOR = `${ROOT_CLASS}--near-battery-selector`;

/** ルート要素がバーストボタンの隣に表示されている時のclass属性 */
const ROOT_CLASS_NEAR_BURST_BUTTON = `${ROOT_CLASS}--near-burst-button`;

/** ルート要素がパイロットボタンの隣に表示されている時のclass属性 */
const ROOT_CLASS_NEAR_PILOT_BUTTON = `${ROOT_CLASS}--near-pilot-button`;

/** 次メッセージアイコンのclass属性 */
const NEXT_MESSAGE_ICON_CLASS = `${ROOT_CLASS}__next-message-icon`;

/** 次メッセージアイコン非表示時のclass属性 */
const NEXT_MESSAGE_ICON_CLASS_INVISIBLE = `${NEXT_MESSAGE_ICON_CLASS}--invisible`;

/** メッセージウインドウ位置 */
type Position =
  | "Center"
  | "Right"
  | "Left"
  | "NearBatterySelector"
  | "NearBurstButton"
  | "NearPilotButton";

/** 顔画像表示位置 */
type FacePosition = "Right" | "Left";

/** CSSカスタムプロパティ --brightness */
const CSS_PROPS_BRIGHTNESS = "--brightness";

/**
 * メッセージウインドウ位置に対応したroot要素class属性を取得する
 *
 * @param position メッセージウインドウ位置
 * @return root要素のclass属性
 */
function toRootClass(position: Position): string {
  switch (position) {
    case "Center":
      return ROOT_CLASS;
    case "Left":
      return ROOT_CLASS_LEFT;
    case "Right":
      return ROOT_CLASS_RIGHT;
    case "NearBatterySelector":
      return ROOT_CLASS_NEAR_BATTERY_SELECTOR;
    case "NearBurstButton":
      return ROOT_CLASS_NEAR_BURST_BUTTON;
    case "NearPilotButton":
      return ROOT_CLASS_NEAR_PILOT_BUTTON;
    default:
      return ROOT_CLASS_INVISIBLE;
  }
}

/** data-idを集めたもの */
type DataIDs = {
  messages: string,
  leftFaceGraphic: string,
  rightFaceGraphic: string,
};

/**
 * ルートHTML要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs): string {
  return `
    <div class="${ROOT_CLASS}__face-graphic" data-id="${ids.leftFaceGraphic}"></div>
    <div class="${ROOT_CLASS}__messages-wrapper">
      <div class="${ROOT_CLASS}__messages" data-id="${ids.messages}"></div>
    </div>
    <div class="${ROOT_CLASS}__face-graphic" data-id="${ids.rightFaceGraphic}"></div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  messages: HTMLElement,
  leftFaceGraphic: HTMLElement,
  rightFaceGraphic: HTMLElement,
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
export function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const messages =
    root.querySelector(`[data-id="${ids.messages}"]`) ??
    document.createElement("div");
  const leftFaceGraphic =
    root.querySelector(`[data-id="${ids.leftFaceGraphic}"]`) ??
    document.createElement("div");
  const rightFaceGraphic =
    root.querySelector(`[data-id="${ids.rightFaceGraphic}"]`) ??
    document.createElement("div");
  return { messages, leftFaceGraphic, rightFaceGraphic };
}

/** コンストラクタのパラメータ */
type Params = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** ウインドウ位置 */
  position?: Position,
  /** 顔画像位置 */
  facePosition?: FacePosition,
  /** 顔画像の向き */
  faceOrientation?: FaceOrientation,
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
    const lastParagraph: ?HTMLElement = paragraphs[paragraphs.length - 1];
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
        [{ transform: "translateY(2vh)" }, { transform: "translateY(0%)" }],
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
