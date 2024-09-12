import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { SoundResource } from "../../../resource/sound/resource";
import { SEPlayerContainer } from "../../../se/se-player";

/** プライベートマッチのQRコードリーダーのプロパティ */
export type PrivateMatchQRCodeReaderProps = SEPlayerContainer & {
  /** ルートHTML要素 */
  root: HTMLElement;

  /** カメラ映像を描画するキャンバス要素 */
  cameraCanvas: HTMLCanvasElement;
  /** Canvasの2D描画コンテキスト */
  canvas: CanvasRenderingContext2D;
  /** カメラのストリームを関連づけるビデオ要素 */
  video: HTMLVideoElement;

  /** クロージャー */
  closer: HTMLElement;

  /** 効果音（値変更） */
  changeValue: SoundResource;

  /** QRコード読み取りの通知 */
  notificationOfReadQRCode: Subject<string>;
  /** 閉じる通知 */
  notificationOfClose: Subject<void>;

  /** 排他制御 */
  exclusive: Exclusive;
};
