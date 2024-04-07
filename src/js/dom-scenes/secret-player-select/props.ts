import {ArmdozerSelection} from "./armdozer-selection";
import {ArmdozerIcon} from "./armdozer-icon";

/** シークレットプレイヤーセレクト画面のプロパティ */
export type SecretPlayerSelectProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** アームドーザアイコンをあつめたもの */
  armdozerIcons: ArmdozerIcon[];
  /** アームドーザ選択状況 */
  armdozerSelection: ArmdozerSelection;
};
