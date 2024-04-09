import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import { SoundResource } from "../../resource/sound/resource";
import { ArmdozerIcon } from "./armdozer-icon";
import { ArmdozerSelection } from "./armdozer-selection";
import { PilotIcon } from "./pilot-icon";
import { PilotSelection } from "./pilot-selection";
import { PlayerSelection } from "./player-selection";

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
  okButton: HTMLButtonElement;
  /** 戻るボタン */
  prevButton: HTMLElement;

  /** 排他制御 */
  exclusive: Exclusive;

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
  /** 値変更音 */
  changeValueSound: SoundResource;

  /** 選択完了通知ストリーム */
  ok: Subject<PlayerSelection>;
  /** 戻る通知ストリーム */
  prev: Subject<void>;
};
