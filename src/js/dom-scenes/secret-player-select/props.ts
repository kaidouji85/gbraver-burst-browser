import {ArmdozerSelection} from "./armdozer-selection";
import {ArmdozerIcon} from "./armdozer-icon";

/** シークレットプレイヤーセレクト画面のプロパティ */
export type SecretPlayerSelectProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** アームドーザ選択状況インジケータ */
  armdozerSelectionIndicator: HTMLElement;
  /** アームドーザ選択詳細 */
  armdozerSelectionDetail: HTMLElement;
  /** アームドーザアイコンをあつめたもの */
  armdozerIcons: ArmdozerIcon[];
  /** アームドーザ選択状況 */
  armdozerSelection: ArmdozerSelection;
};
