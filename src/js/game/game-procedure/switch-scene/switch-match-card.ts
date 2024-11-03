import { MatchCard } from "../../../dom-scenes/match-card";
import { GameProps } from "../../game-props";
import { switchDOMScene } from "./switch-dom-scene";

/**
 * 対戦カード画面に切り替える
 * @param props ゲームプロパティ
 * @param scene 対戦カード画面
 */
export const switchMatchCard = (props: GameProps, scene: MatchCard) =>
  switchDOMScene({ ...props, scene, unsubscribers: [] });
