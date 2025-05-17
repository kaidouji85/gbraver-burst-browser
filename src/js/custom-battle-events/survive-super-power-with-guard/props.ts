import { SurviveSuperPowerWithGuardState } from "./state";
import { StateAnimationConditions } from "./state-animation-conditions";

/** 「超火力はガードで凌げ」用のプロパティ */
export type SurviveSuperPowerWithGuardProps = {
  /** ステート */
  state: SurviveSuperPowerWithGuardState;
  /**
   * カスタムステートアニメーション系イベントの条件判断オブジェクト
   * 本プロパティはonStateAnimationが呼び出されるたびに更新される想定
   * nullは初期値であり、アニメーション未再生状態である
   */
  stateAnimationCondition: StateAnimationConditions | null;
};
