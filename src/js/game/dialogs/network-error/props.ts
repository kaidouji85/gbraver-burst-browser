import { Subject } from "rxjs";

import { Exclusive } from "../../../event/exclusive/exclusive";
import { SoundResource } from "../../../resource/sound/resource";
import { SEPlayerContainer } from "../../../sounds/se/se-player";
import { PostNetworkError } from "../../post-network-error";

/** 通信エラーダイアログのプロパティ */
export type NetworkErrorDialogProps = SEPlayerContainer & {
  /** 通信エラーの後処理 */
  readonly postNetworkError: PostNetworkError;

  /** ルート要素 */
  readonly root: HTMLElement;
  /** 通信エラーの後処理実行ボタン */
  readonly postNetworkErrorButton: HTMLButtonElement;

  /** 排他制御 */
  readonly exclusive: Exclusive;

  /** 通信エラーの後処理実行通知 */
  readonly postNetworkErrorSource: Subject<PostNetworkError>;

  /** ボタンプッシュ音 */
  readonly pushButtonSound: SoundResource;
};
