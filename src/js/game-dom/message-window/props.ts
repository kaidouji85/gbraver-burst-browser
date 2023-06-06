import {FaceGraphic, FaceOrientation} from "./face-graphic";
import {Position} from "./position";
import {FacePosition} from "./face-position";
import {Resources} from "../../resource";
import {domUuid} from "../../uuid/dom-uuid";
import {toRootClass} from "./dom/to-root-class";
import {rootInnerHTML} from "./dom/root-inner-html";
import {extractElements} from "./dom/elements";
import {NEXT_MESSAGE_ICON_CLASS_INVISIBLE} from "./dom/class-name";
import {replaceDOM} from "../../dom/replace-dom";

/** メッセージウインドウプロパティ */
export type MessageWindowProps = {
  root: HTMLElement;
  messages: HTMLElement;
  nextMessageIcon: HTMLElement;
  leftFaceGraphic: FaceGraphic;
  rightFaceGraphic: FaceGraphic;
  position: Position;
  faceOrientation: FaceOrientation;
  facePosition: FacePosition;
}

/** プロパティ生成パラメータ */
export type GenerateParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ウインドウ位置 */
  position?: Position;
  /** 顔画像位置 */
  facePosition?: FacePosition;
  /** 顔画像の向き */
  faceOrientation?: FaceOrientation;
};

/**
 * MessageWindowPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createMessageWindowProps(params: GenerateParams): MessageWindowProps {
  const ids = {
    messages: domUuid(),
    leftFaceGraphic: domUuid(),
    rightFaceGraphic: domUuid(),
  };
  const root = document.createElement("div");
  const position = params?.position ?? "Center";
  root.className = toRootClass(position);
  root.innerHTML = rootInnerHTML(ids);
  const elements = extractElements(root, ids);
  const nextMessageIcon = document.createElement("span");
  nextMessageIcon.className = NEXT_MESSAGE_ICON_CLASS_INVISIBLE;
  nextMessageIcon.innerText = "▼";
  const leftFaceGraphic = new FaceGraphic(params.resources);
  replaceDOM(elements.leftFaceGraphic, leftFaceGraphic.getRootHTMLElement());
  const rightFaceGraphic = new FaceGraphic(params.resources);
  replaceDOM(elements.rightFaceGraphic, rightFaceGraphic.getRootHTMLElement());
  return {
    root,
    position,
    nextMessageIcon,
    leftFaceGraphic,
    rightFaceGraphic,
    facePosition: params?.facePosition ?? "Right",
    faceOrientation: params?.faceOrientation ?? "Left",
    messages: elements.messages,
  };
}