import { BatterySelector } from "../../../../../game/game-object/battery-selector";
import { BurstButton } from "../../../../../game/game-object/burst-button/burst-button";
import { DeathAlert } from "../../../../../game/game-object/death-alert";
import { Fader } from "../../../../../game/game-object/fader/fader";
import { LeadLine } from "../../../../../game/game-object/lead-line/lead-line";
import { PilotButton } from "../../../../../game/game-object/pilot-button/pilot-button";
import { ResultIndicator } from "../../../../../game/game-object/result-indicator/result-indicator";
import { TimeScaleButton } from "../../../../../game/game-object/time-scale-button/time-scale-button";

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
  /** デスアラート */
  deathAlert: DeathAlert;
  /** 引き分けインジケータ */
  drawIndicator: ResultIndicator;
};
