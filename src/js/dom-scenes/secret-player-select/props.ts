import { ArmdozerIcon } from "./armdozer-icon";
import { ArmdozerSelection } from "./armdozer-selection";
import {PilotIcon} from "./pilot-icon";
import {PilotSelection} from "./pilot-selection";

/** シークレットプレイヤーセレクト画面のプロパティ */
export type SecretPlayerSelectProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** アームドーザ選択状況インジケータ */
  armdozerSelectionIndicator: HTMLElement;
  /** アームドーザ選択詳細 */
  armdozerSelectionDetail: HTMLElement;
  /** パイロット選択状況インジケータ */
  pilotSelectionIndicator: HTMLElement;
  /** パイロット選択詳細 */
  pilotSelectionDetail: HTMLElement;

  /** アームドーザアイコンをあつめたもの */
  armdozerIcons: ArmdozerIcon[];
  /** アームドーザ選択状況 */
  armdozerSelection: ArmdozerSelection;

  /** パイロットアイコンをあつめたもの */
  pilotIcons: PilotIcon[];
  /** パイロット選択状況 */
  pilotSelection: PilotSelection;
};
