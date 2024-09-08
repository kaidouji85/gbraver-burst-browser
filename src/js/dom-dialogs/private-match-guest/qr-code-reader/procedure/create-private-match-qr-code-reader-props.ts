import { Subject } from "rxjs";

import { ROOT } from "../dom/class-name";
import { PrivateMatchQRCodeReaderProps } from "../props";

/**
 * PrivateMatchQRCodeReaderPropsを生成する
 * @returns 生成結果
 */
export function createPrivateMatchQRCodeReaderProps(): PrivateMatchQRCodeReaderProps {
  const root = document.createElement("canvas");
  root.className = ROOT;

  const canvas =
    root.getContext("2d", { willReadFrequently: true }) ??
    new CanvasRenderingContext2D();

  const video = document.createElement("video");

  const notificationOfReadQRCode = new Subject<string>();

  return { root, canvas, video, notificationOfReadQRCode };
}
