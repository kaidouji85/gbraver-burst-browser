import { ArmdozerId } from "gbraver-burst-core";

import { SoundResource } from "../../resource/sound/resource";
import { SEPlayerContainer } from "../../se/se-player";
import { ArmdozerIcon } from "./dom/armdozer-icon";
import { PilotIcon } from "./dom/pilot-icon";

/** プレイヤーピッカーダイアログのプロパティ */
export type PlayerPickerDialogProps = SEPlayerContainer & {
  /** 現在選択しているアームドーザID */
  selectedArmdozerId: ArmdozerId;

  /** ルートHTML要素 */
  readonly root: HTMLElement;
  /** アームドーザアイコンをあつめたもの */
  readonly armdozerIcons: ArmdozerIcon[];
  /** パイロットアイコンをあつめたもの */
  readonly pilotIcons: PilotIcon[];

  /** 値変更サウンド */
  readonly changeValueSound: SoundResource;
};
