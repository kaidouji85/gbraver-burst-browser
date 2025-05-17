import { LastStateConditionContainer } from "./last-state-condition";
import { SurviveSuperPowerWithGuardState } from "./state";
import { StateAnimationTypeContainer } from "./state-animation-type";

/** 「超火力はガードで凌げ」用のプロパティ */
export type SurviveSuperPowerWithGuardProps =
  /**
   * アニメーション種別条件判断オブジェクト
   * 本プロパティはonStateAnimationが呼び出されるたびに更新される想定
   */
  StateAnimationTypeContainer &
    /**
     * LastState系イベントで利用する条件判断オブジェクト
     * 本プロパティはbeforeLastStateが呼び出されるたびに更新される想定
     * イベントが実行されていない場合、本プロパティはundefined
     */
    Partial<LastStateConditionContainer> & {
      /** ステート */
      state: SurviveSuperPowerWithGuardState;
    };
