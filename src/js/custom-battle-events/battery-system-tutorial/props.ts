import {Resources} from "../../resource";
import {attackBatteryCaptionInnerHtml} from "./dom/attack-battery-caption-inner-html";
import {defenseBatteryCaptionInnerHtml} from "./dom/defense-battery-caption-inner-html";
import {BatterySystemTutorialState} from "./state";

/** バッテリーシステムチュートリアル固有のプロパティ */
export type BatterySystemTutorialProps = {
  /** チュートリアルのステート */
  state: BatterySystemTutorialState;
  /** 攻撃バッテリー注釈 innerHTML */
  readonly attackBatteryCaption: string;
  /** 防御バッテリー注釈 innerHTML */
  readonly defenseBatteryCaption: string;
};

/**
 * バッテリーシステムチュートリアル固有のプロパティを作成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createBatterySystemTutorialProps(resources: Resources): BatterySystemTutorialProps {
  const state = {
    isBatterySystemDescriptionComplete: false,
  };
  return {
    state,
    attackBatteryCaption: attackBatteryCaptionInnerHtml(resources),
    defenseBatteryCaption: defenseBatteryCaptionInnerHtml(resources),
  };
}