import {Resources} from "../../resource";
import {attackBatteryCaptionInnerHtml} from "./dom/attack-battery-caption-inner-html";

/** バッテリーシステムチュートリアル カスタムイベント プロパティ */
export type BatterySystemTutorialProps = {
  /** 攻撃バッテリー注釈 innerHTML */
  attackBatteryCaption: string;
};

/**
 * バッテリーシステムチュートリアル カスタムイベント プロパティを生成する
 * @param resources リソース管理オブジェクト
 * @returns 生成したプロパティ
 */
export function createBatterySystemTutorialProps(
  resources: Resources
)  {
  return {
    attackBatteryCaption: attackBatteryCaptionInnerHtml(resources)
  };
}
