import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { SoundResource } from "../../../resource/sound/resource";
import { SEPlayerContainer } from "../../../se/se-player";

/** プライベートマッチのQRコードリーダーのプロパティ */
export type PrivateMatchQRCodeReaderProps = SEPlayerContainer & {
  /** ルートHTML要素 */
  readonly root: HTMLElement;

  /** カメラ映像を描画するキャンバス要素 */
  readonly cameraCanvas: HTMLCanvasElement;
  /** Canvasの2D描画コンテキスト */
  readonly canvas: CanvasRenderingContext2D;
  /** カメラのストリームを関連づけるビデオ要素 */
  readonly video: HTMLVideoElement;

  /** クロージャー */
  readonly closer: HTMLElement;

  /** 効果音（値変更） */
  readonly changeValue: SoundResource;

  /** QRコード読み取りの通知 */
  readonly notificationOfReadQRCode: Subject<string>;
  /** 閉じる通知 */
  readonly notificationOfClose: Subject<void>;

  /** 排他制御 */
  readonly exclusive: Exclusive;
};
