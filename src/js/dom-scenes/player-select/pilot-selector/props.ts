import { PilotId } from "gbraver-burst-core";
import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { SoundResource } from "../../../resource/sound/resource";
import { SEPlayer } from "../../../se/se-player";
import { PilotIcon } from "./pilot-icon";
import { PilotStatus } from "./pilot-status";

/** パイロットセレクタのプロパティ */
export type PilotSelectorProps = {
  /** 現在選択中のパイロットID */
  pilotId: PilotId;
  /** 排他制御 */
  exclusive: Exclusive;
  /** ルートHTML要素 */
  root: HTMLElement;
  /** パイロットステータス */
  pilotStatus: PilotStatus;
  /** パイロットアイコンをあつめたもの */
  pilotIcons: PilotIcon[];
  /** OKボタン */
  okButton: HTMLElement;
  /** 戻るボタン */
  prevButton: HTMLElement;
  /** 値変更 効果音 */
  changeValueSound: SoundResource;
  /** 決定 効果音 */
  decideSound: SoundResource;
  /** SE再生オブジェクト */
  se: SEPlayer;
  /** パイロット変更通知ストリーム */
  change: Subject<PilotId>;
  /** パイロット決定通知ストリーム */
  decide: Subject<PilotId>;
  /** 戻る通知ストリーム */
  prev: Subject<void>;
};
