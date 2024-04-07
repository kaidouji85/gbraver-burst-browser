import { ArmdozerIcon } from "./armdozer-icon";
import { ArmdozerSelection } from "./armdozer-selection";
import {PilotIcon} from "./pilot-icon";
import {PilotSelection} from "./pilot-selection";
import {SoundResource} from "../../resource/sound";

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
  /** 決定ボタン */
  okButton: HTMLElement;
  /** 戻るボタン */
  prevButton: HTMLElement;

  /** アームドーザアイコンをあつめたもの */
  armdozerIcons: ArmdozerIcon[];
  /** アームドーザ選択状況 */
  armdozerSelection: ArmdozerSelection;

  /** パイロットアイコンをあつめたもの */
  pilotIcons: PilotIcon[];
  /** パイロット選択状況 */
  pilotSelection: PilotSelection;

  /** 決定音 */
  pushButtonSound: SoundResource;
};
