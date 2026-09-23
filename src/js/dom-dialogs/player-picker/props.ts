import { SoundResource } from "../../resource/sound/resource";
import { SEPlayerContainer } from "../../se/se-player";
import { ArmdozerIcon } from "./dom/armdozer-icon";

/** プレイヤーピッカーダイアログのプロパティ */
export type PlayerPickerDialogProps = SEPlayerContainer & {
  /** ルートHTML要素 */
  readonly root: HTMLElement;
  /** アームドーザアイコンをあつめたもの */
  readonly armdozerIcons: ArmdozerIcon[];

  /** 値変更サウンド */
  readonly changeValueSound: SoundResource;
};
