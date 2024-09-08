/** プライベートマッチのQRコードリーダーのプロパティ */
export type PrivateMatchQRCodeReaderProps = {
  /** ルート要素となるCanvas */
  root: HTMLCanvasElement;
  /** Canvasの2D描画コンテキスト */
  canvas: CanvasRenderingContext2D;
  /** カメラ要素になるVideo */
  video: HTMLVideoElement;
};