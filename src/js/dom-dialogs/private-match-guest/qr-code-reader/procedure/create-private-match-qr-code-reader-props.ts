import { Subject } from "rxjs";

import { ResourcesContainer } from "../../../../resource";
import { PathIds } from "../../../../resource/path/ids";
import { ROOT, ROOT_HIDDEN } from "../dom/class-name";
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
  const root = document.createElement("canvas");
  root.className = ROOT_HIDDEN;

  const canvas =
    root.getContext("2d", { willReadFrequently: true }) ??
    new CanvasRenderingContext2D();

  const video = document.createElement("video");

  const closer = document.createElement("img");
  closer.className = `${ROOT}__closer`;
  closer.src =
    params.resources.paths.find((p) => p.id === PathIds.CLOSER)?.path ?? "";
  root.appendChild(closer);

  const notificationOfReadQRCode = new Subject<string>();

  return { root, canvas, video, notificationOfReadQRCode };
}
