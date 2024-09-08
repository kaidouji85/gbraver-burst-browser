import { Subject } from "rxjs";

/** プライベートマッチのQRコードリーダーのプロパティ */
export type PrivateMatchQRCodeReaderProps = {
  /** ルート要素となるCanvas */
  root: HTMLCanvasElement;
  /** Canvasの2D描画コンテキスト */
  canvas: CanvasRenderingContext2D;
  /** カメラ要素になるVideo */
  video: HTMLVideoElement;

  /** QRコード読み取りの通知 */
  notificationOfReadQRCode: Subject<string>;
};
