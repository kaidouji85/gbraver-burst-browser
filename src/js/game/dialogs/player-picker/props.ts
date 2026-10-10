import { ArmdozerId, PilotId } from "gbraver-burst-core";
import { Subject } from "rxjs";

import { Exclusive } from "../../../event/exclusive/exclusive";
import { SoundResource } from "../../../resource/sound/resource";
import { SEPlayerContainer } from "../../../sounds/se/se-player";
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
  /** 閉じるボタンのHTML要素 */
  readonly closeButton: HTMLElement;
  /** 決定ボタンのHTML要素 */
  readonly confirmButton: HTMLElement;
  /** アームドーザアイコンをあつめたもの */
  readonly armdozerIcons: ArmdozerIcon[];
  /** パイロットアイコンをあつめたもの */
  readonly pilotIcons: PilotIcon[];

  /** 値変更サウンド */
  readonly changeValueSound: SoundResource;
  /** 押下ボタンサウンド */
  readonly pushButtonSound: SoundResource;

  /** 閉じる通知用のSubject */
  readonly closeSubject: Subject<void>;
  /** 決定通知用のSubject */
  readonly confirmSubject: Subject<PlayerSelection>;

  /** 排他制御 */
  readonly exclusive: Exclusive;
};
