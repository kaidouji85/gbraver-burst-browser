import { Resources } from "../../resource";
import { attackBatteryCaptionInnerHtml } from "./dom/attack-battery-caption-inner-html";
import { defenseBatteryCaptionInnerHtml } from "./dom/defense-battery-caption-inner-html";
import { BatterySystemTutorialState } from "./state";

/** バッテリーシステムチュートリアル固有のプロパティ */
export type BatterySystemTutorialProps = {
  /** チュートリアルのステート */
  eventState: BatterySystemTutorialState;
  /** 攻撃バッテリー注釈 innerHTML */
  readonly attackBatteryCaption: string;
  /** 防御バッテリー注釈 innerHTML */
  readonly defenseBatteryCaption: string;
};

/**
 * バッテリーシステムチュートリアル固有のプロパティを作成する
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function createBatterySystemTutorialProps(
  resources: Resources,
): BatterySystemTutorialProps {
  const eventState = {
    isBatterySystemDescriptionComplete: false,
    isExplainedBurstAtZeroBurst: false,
    isExplainedPilotSkillAtZeroBattery: false,
  };
  return {
    eventState,
    attackBatteryCaption: attackBatteryCaptionInnerHtml(resources),
    defenseBatteryCaption: defenseBatteryCaptionInnerHtml(resources),
  };
}
