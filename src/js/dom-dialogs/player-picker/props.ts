import { ArmdozerIcon } from "./dom/armdozer-icon";

/** プレイヤーピッカーダイアログのプロパティ */
export type PlayerPickerDialogProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** アームドーザアイコンをあつめたもの */
  armdozerIcons: ArmdozerIcon[];
};
