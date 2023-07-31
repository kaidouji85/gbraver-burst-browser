import {BatterySystemTutorialState} from "./state";
import {Resources} from "../../resource";
import {attackBatteryCaptionInnerHtml} from "./dom/attack-battery-caption-inner-html";
import {defenseBatteryCaptionInnerHtml} from "./dom/defense-battery-caption-inner-html";

/** バッテリーシステムチュートリアル固有のプロパティ */
export type BatterySystemTutorialOwnProps = {
  /** チュートリアルのステート */
  state: BatterySystemTutorialState;
  /** 攻撃バッテリー注釈 innerHTML */
  attackBatteryCaption: string;
  /** 防御バッテリー注釈 innerHTML */
  defenseBatteryCaption: string;
};

/**
 * バッテリーシステムチュートリアル固有のプロパティを作成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createBatterySystemTutorialOwnProps(resources: Resources): BatterySystemTutorialOwnProps {
  const state = {
    isBatterySystemDescriptionComplete: false,
  };
  return {
    state,
    attackBatteryCaption: attackBatteryCaptionInnerHtml(resources),
    defenseBatteryCaption: defenseBatteryCaptionInnerHtml(resources),
  };
}