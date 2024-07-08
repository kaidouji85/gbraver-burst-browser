import { MatchCard } from "../../../dom-scenes/match-card";
import { GameProps } from "../../game-props";

/**
 * 対戦カード画面に切り替える
 * @param props ゲームプロパティ
 * @param scene 対戦カード画面
 */
export const switchMatchCard = (props: GameProps, scene: MatchCard) =>
  props.domSceneBinder.bind(scene, []);
