import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayerContainer } from "../../se/se-player";
import { PrivateMatchQRCodeReader } from "./qr-code-reader";

/** プライベートマッチゲストダイアログのプロパティ */
export type PrivateMatchGuestDialogProps = SEPlayerContainer & {
  /** ルートHTML要素 */
  readonly root: HTMLElement;
  /** クロージャ */
  readonly closer: HTMLElement;
  /** ルームIDテキスト入力フォーム */
  readonly roomID: HTMLInputElement;
  /** QRコードリーダー開始ボタン */
  readonly startQRCodeReader: HTMLButtonElement;
  /** プライベートマット開始ボタン */
  readonly enterButton: HTMLElement;

  /** QRコードリーダー */
  readonly qrCodeReader: PrivateMatchQRCodeReader;

  /** 排他制御 */
  readonly exclusive: Exclusive;

  /** 効果音 値変更 */
  readonly changeValue: SoundResource;
  /** 効果音 ボタンプッシュ */
  readonly pushButton: SoundResource;

  /** ダイアログ閉じる通知 */
  readonly dialogClosed: Subject<void>;
  /**
   * プライベートマッチ開始通知
   * ユーザが入力したルームIDをストリームとして渡す
   */
  readonly privateMatchStart: Subject<string>;
};
