// @flow
import {replaceDOM} from "../../dom/replace-dom";
import type {Resources} from "../../resource";
import {domUuid} from "../../uuid/dom-uuid";
import type {FaceOrientation, FaceType} from "./face-graphic";
import {FaceGraphic} from "./face-graphic";

/** ルートHTML要素のclass属性 */
const ROOT_CLASS = 'message-window';

/** ルートHTML要素が非表示の際のclass属性 */
const ROOT_CLASS_INVISIBLE = `${ROOT_CLASS}--invisible`;

/** ルート要素が左側表示されている時のclass属性 */
const ROOT_CLASS_LEFT = `${ROOT_CLASS}--left`;

/** ルート要素が右側表示されている時のclass属性 */
const ROOT_CLASS_RIGHT = `${ROOT_CLASS}--right`;

/** メッセージウインドウ位置 */
type Position = 'Center' | 'Right' | 'Left';

/**
 * メッセージウインドウ位置に対応したroot要素class属性を取得する
 * 
 * @param position メッセージウインドウ位置
 * @return root要素のclass属性
 */
function toRootClass(position: Position): string {
  switch(position) {
    case 'Center':
      return ROOT_CLASS;
    case 'Left':
      return ROOT_CLASS_LEFT;
    case 'Right':
      return ROOT_CLASS_RIGHT;
    default:
      return ROOT_CLASS_INVISIBLE;
  }
}

/** data-idを集めたもの */
type DataIDs = {messages: string, leftFaceGraphic: string, rightFaceGraphic: string};

/**
 * ルートHTML要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs): string {
  return `
    <div class="${ROOT_CLASS}__face-graphic" data-id="${ids.leftFaceGraphic}"></div>
    <div class="${ROOT_CLASS}__messages" data-id="${ids.messages}"></div>
    <div class="${ROOT_CLASS}__face-graphic" data-id="${ids.rightFaceGraphic}"></div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {messages: HTMLElement, leftFaceGraphic: HTMLElement, rightFaceGraphic: HTMLElement};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
export function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const messages = root.querySelector(`[data-id="${ids.messages}"]`) ?? document.createElement('div');
  const leftFaceGraphic = root.querySelector(`[data-id="${ids.leftFaceGraphic}"]`) ?? document.createElement('div');
  const rightFaceGraphic = root.querySelector(`[data-id="${ids.rightFaceGraphic}"]`) ?? document.createElement('div');
  return {messages, leftFaceGraphic, rightFaceGraphic};
}

/** メッセージウインドウ */
export class MessageWindow {
  #root: HTMLElement;
  #messages: HTMLElement;
  #leftFaceGraphic: FaceGraphic;
  #rightFaceGraphic: FaceGraphic;
  #position: Position;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const ids = {messages: domUuid(), leftFaceGraphic: domUuid(), rightFaceGraphic: domUuid()};
    this.#root = document.createElement('div');
    this.#position = 'Center';
    this.#root.className = toRootClass(this.#position);
    this.#root.innerHTML = rootInnerHTML(ids);
    const {messages, leftFaceGraphic, rightFaceGraphic} = extractElements(this.#root, ids);
    this.#messages = messages;
    this.#leftFaceGraphic = new FaceGraphic(resources);
    replaceDOM(leftFaceGraphic, this.#leftFaceGraphic.getRootHTMLElement());
    this.#rightFaceGraphic = new FaceGraphic(resources);
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
    this.#root.className = isVisible ? toRootClass(this.#position) : ROOT_CLASS_INVISIBLE;
  }

  /**
   * 表示位置を設定する
   *
   * @param value 表示位置
   */
  position(value: Position): void {
    this.#position = value;
    this.#root.className = toRootClass(value);
  }

  /**
   * メッセージを配列形式で設定する
   * 配列の区切れで改行をする
   *
   * @param values メッセージ
   */
  messages(values: string[]): void {
    const createParagraph = (message: string) => {
      const div = document.createElement('div');
      div.className = `${ROOT_CLASS}__paragraph`;
      div.innerText = message;
      return div;
    };

    this.#messages.innerHTML = "";
    values.forEach(message => {
      this.#messages.appendChild(createParagraph(message));
    });
  }

  /**
   * 顔画像を変更する
   *
   * @param faceType 変更する顔画像
   * @param faceOrientation 顔画像の向き
   */
  face(faceType: FaceType, faceOrientation: FaceOrientation = 'Left'): void {
    this.#leftFaceGraphic.face(faceType, faceOrientation);
  }

  /**
   * 顔画像の表示、非表示設定
   *
   * @param isVisible 顔画像表示フラグ、trueで表示する
   */
  faceVisible(isVisible: boolean): void {
    this.#leftFaceGraphic.visible(isVisible);
    //this.#rightFaceGraphic.visible(isVisible);
  }
}