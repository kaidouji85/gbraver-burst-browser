import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayerContainer } from "../../se/se-player";
import { PrivateMatchQRCodeReader } from "./qr-code-reader";

/** プライベートマッチゲストダイアログのプロパティ */
export type PrivateMatchGuestDialogProps = SEPlayerContainer & {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** クロージャ */
  closer: HTMLElement;
  /** ルームIDテキスト入力フォーム */
  roomID: HTMLInputElement;
  /** QRコードリーダー開始ボタン */
  startQRCodeReader: HTMLButtonElement;
  /** プライベートマット開始ボタン */
  enterButton: HTMLElement;

  /** QRコードリーダー */
  qrCodeReader: PrivateMatchQRCodeReader;

  /** 排他制御 */
  exclusive: Exclusive;

  /** 効果音 値変更 */
  changeValue: SoundResource;
  /** 効果音 ボタンプッシュ */
  pushButton: SoundResource;

  /** ダイアログ閉じる通知 */
  dialogClosed: Subject<void>;
  /**
   * プライベートマッチ開始通知
   * ユーザが入力したルームIDをストリームとして渡す
   */
  privateMatchStart: Subject<string>;
};
