import { SurviveSuperPowerWithGuardState } from "./state";
import { StateAnimationConditionContainer } from "./state-animation-condition";

/** 「超火力はガードで凌げ」用のプロパティ */
export type SurviveSuperPowerWithGuardProps =
  /**
   * アニメーション種別条件判断オブジェクト
   * 本プロパティはonStateAnimationが呼び出されるたびに更新される想定
   * イベントが実行されていない場合、本プロパティはundefined
   */
  Partial<StateAnimationConditionContainer> & {
    /** ステート */
    state: SurviveSuperPowerWithGuardState;
  };
