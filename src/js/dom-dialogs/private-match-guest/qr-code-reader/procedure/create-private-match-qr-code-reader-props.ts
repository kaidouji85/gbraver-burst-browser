import { Subject } from "rxjs";

import { CANVAS_ELEMENT, ROOT } from "../dom/class-name";
import { PrivateMatchQRCodeReaderProps } from "../props";

/**
 * PrivateMatchQRCodeReaderPropsを生成する
 * @returns 生成結果
 */
export function createPrivateMatchQRCodeReaderProps(): PrivateMatchQRCodeReaderProps {
  const root = document.createElement("div");
  root.className = ROOT;

  const canvasElement = document.createElement("canvas");
  canvasElement.className = CANVAS_ELEMENT;
  root.appendChild(canvasElement);

  const canvas =
    canvasElement.getContext("2d", { willReadFrequently: true }) ??
    new CanvasRenderingContext2D();

  const video = document.createElement("video");

  const notificationOfReadQRCode = new Subject<string>();

  return { root, canvasElement, canvas, video, notificationOfReadQRCode };
}
