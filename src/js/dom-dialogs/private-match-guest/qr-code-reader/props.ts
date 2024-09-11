import { Subject } from "rxjs";

/** プライベートマッチのQRコードリーダーのプロパティ */
export type PrivateMatchQRCodeReaderProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** カメラ映像を描画するキャンバス要素 */
  cameraCanvas: HTMLCanvasElement;
  /** Canvasの2D描画コンテキスト */
  canvas: CanvasRenderingContext2D;
  /** カメラのストリームを関連づけるビデオ要素 */
  video: HTMLVideoElement;

  /** QRコード読み取りの通知 */
  notificationOfReadQRCode: Subject<string>;
};
