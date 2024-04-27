import { replaceDOM } from "../../dom/replace-dom";
import { ResourcesContainer } from "../../resource";
import { domUuid } from "../../uuid/dom-uuid";
import { NEXT_MESSAGE_ICON_CLASS_INVISIBLE } from "./dom/class-name";
import { extractElements } from "./dom/elements";
import { rootInnerHTML } from "./dom/root-inner-html";
import { toRootClass } from "./dom/to-root-class";
import { FaceGraphic } from "./face-graphic";
import { FaceOrientation } from "./face-graphic/config/face-orientation";
import { FacePosition } from "./face-position";
import { WindowType } from "./window-type";

/** メッセージウインドウプロパティ */
export type MessageWindowProps = {
  root: HTMLElement;
  messages: HTMLElement;
  nextMessageIcon: HTMLElement;
  leftFaceGraphic: FaceGraphic;
  rightFaceGraphic: FaceGraphic;
  type: WindowType;
  faceOrientation: FaceOrientation;
  facePosition: FacePosition;
};

/** プロパティ生成パラメータ */
export type PropsCreatorParams = ResourcesContainer & {
  /** ウインドウタイプ */
  type?: WindowType;
  /** 顔画像位置 */
  facePosition?: FacePosition;
  /** 顔画像の向き */
  faceOrientation?: FaceOrientation;
};

/**
 * MessageWindowPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createMessageWindowProps(
  params: PropsCreatorParams,
): MessageWindowProps {
  const ids = {
    messages: domUuid(),
    leftFaceGraphic: domUuid(),
    rightFaceGraphic: domUuid(),
  };
  const root = document.createElement("div");
  const type = params?.type ?? "Center";
  root.className = toRootClass(type);
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
    type,
    nextMessageIcon,
    leftFaceGraphic,
    rightFaceGraphic,
    facePosition: params?.facePosition ?? "Right",
    faceOrientation: params?.faceOrientation ?? "Left",
    messages: elements.messages,
  };
}
