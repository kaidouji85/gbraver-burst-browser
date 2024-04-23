import { Subject } from "rxjs";

import { BatterySelector } from "../../../../../game-object/battery-selector";
import { BurstButton } from "../../../../../game-object/burst-button/burst-button";
import { Fader } from "../../../../../game-object/fader/fader";
import { LeadLine } from "../../../../../game-object/lead-line/lead-line";
import { PilotButton } from "../../../../../game-object/pilot-button/pilot-button";
import { ResultIndicator } from "../../../../../game-object/result-indicator/result-indicator";
import { TimeScaleButton } from "../../../../../game-object/time-scale-button/time-scale-button";
import { BattleSceneAction } from "../../../actions";

/** HUDレイヤーゲームオブジェクト プロパティ */
export type HUDGameObjectsProps = {
  /** バッテリーセレクタ */
  batterySelector: BatterySelector;
  /** バッテリーセレクタの引き出し線 */
  batterySelectorLeadLine: LeadLine;
  /** バーストボタン */
  burstButton: BurstButton;
  /** バーストボタンの引き出し線 */
  burstButtonLeadLine: LeadLine;
  /** パイロットボタン */
  pilotButton: PilotButton;
  /** パイロットボタンの引き出し線 */
  pilotButtonLeadLine: LeadLine;
  /** アニメーションタイムスケールボタン */
  timeScaleButton: TimeScaleButton;
  /** フェーダ（最前列） */
  frontmostFader: Fader;
  /** フェーダ（最後尾） */
  rearmostFader: Fader;
  /** 引き分けインジケータ */
  drawIndicator: ResultIndicator;
  /** バトルアクション通知 */
  battleAction: Subject<BattleSceneAction>;
};
