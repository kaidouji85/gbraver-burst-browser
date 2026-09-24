import { ArmdozerId, PilotId } from "gbraver-burst-core";
import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayerContainer } from "../../se/se-player";
import { ArmdozerIcon } from "./dom/armdozer-icon";
import { PilotIcon } from "./dom/pilot-icon";
import { PlayerSelection } from "./player-selection";

/** プレイヤーピッカーダイアログのプロパティ */
export type PlayerPickerDialogProps = SEPlayerContainer & {
  /** 現在選択しているアームドーザID */
  selectedArmdozerId: ArmdozerId;
  /** 現在選択しているパイロットID */
  selectedPilotId: PilotId;

  /** ルートHTML要素 */
  readonly root: HTMLElement;
  /** タイトルへボタンのHTML要素 */
  readonly gotoTitleButton: HTMLElement;
  /** 再戦ボタンのHTML要素 */
  readonly retryButton: HTMLElement;
  /** アームドーザアイコンをあつめたもの */
  readonly armdozerIcons: ArmdozerIcon[];
  /** パイロットアイコンをあつめたもの */
  readonly pilotIcons: PilotIcon[];

  /** 値変更サウンド */
  readonly changeValueSound: SoundResource;
  /** 押下ボタンサウンド */
  readonly pushButtonSound: SoundResource;

  /** 「タイトルへ」通知用のSubject */
  readonly gotoTitleSubject: Subject<void>;
  /** 「再戦」通知用のSubject */
  readonly retrySubject: Subject<PlayerSelection>;

  /** 排他制御 */
  readonly exclusive: Exclusive;
};
