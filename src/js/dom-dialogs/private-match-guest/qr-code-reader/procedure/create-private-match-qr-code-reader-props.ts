import { Subject } from "rxjs";

import { ResourcesContainer } from "../../../../resource";
import { ROOT_HIDDEN } from "../dom/class-name";
import { extractCameraCanvas } from "../dom/elements";
import { rootInnerHTML } from "../dom/root-inner-html";
import { PrivateMatchQRCodeReaderProps } from "../props";

/** プライベートマッチQRコードリーダーのパラメータ */
export type PropsCreatorParams = ResourcesContainer;

/**
 * PrivateMatchQRCodeReaderPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createPrivateMatchQRCodeReaderProps(
  params: PropsCreatorParams,
): PrivateMatchQRCodeReaderProps {
  const root = document.createElement("div");
  root.innerHTML = rootInnerHTML(params.resources);
  root.className = ROOT_HIDDEN;

  const cameraCanvas = extractCameraCanvas(root);
  const canvas =
    cameraCanvas.getContext("2d", { willReadFrequently: true }) ??
    new CanvasRenderingContext2D();

  const video = document.createElement("video");

  const notificationOfReadQRCode = new Subject<string>();

  return { root, cameraCanvas, canvas, video, notificationOfReadQRCode };
}
