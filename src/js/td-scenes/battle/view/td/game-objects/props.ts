import { Illumination } from "../../../../../game-object/illumination/illumination";
import { SkyBrightness } from "../../../../../game-object/sky-brightness/sky-brightness";
import { Stage } from "../../../../../game-object/stage/stage";
import { TurnIndicator } from "../../../../../game-object/turn-indicator/turn-indicator";

/** 3Dレイヤー その他ゲームオブジェクト プロパティ */
export type TDGameObjectsProps = {
  /** ステージ */
  stage: Stage;
  /** ターンインジケーター */
  turnIndicator: TurnIndicator;
  /** 空の明るさ */
  skyBrightness: SkyBrightness;
  /** 照明 */
  illumination: Illumination;
};
