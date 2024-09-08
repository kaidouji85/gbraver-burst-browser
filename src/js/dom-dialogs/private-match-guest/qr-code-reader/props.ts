import { Subject } from "rxjs";

/** プライベートマッチのQRコードリーダーのプロパティ */
export type PrivateMatchQRCodeReaderProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** Canvas要素 */
  canvasElement: HTMLCanvasElement;
  /** Canvasの2D描画コンテキスト */
  canvas: CanvasRenderingContext2D;
  /** カメラ要素になるVideo */
  video: HTMLVideoElement;

  /** QRコード読み取りの通知 */
  notificationOfReadQRCode: Subject<string>;
};
