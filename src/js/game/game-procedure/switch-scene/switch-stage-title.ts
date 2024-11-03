import { StageTitle } from "../../../dom-scenes/stage-title";
import { GameProps } from "../../game-props";
import { switchDOMScene } from "./switch-dom-scene";

/**
 * ステージタイトル画面に切り替える
 * @param props ゲームプロパティ
 * @param scene ステージタイトル画面
 */
export const switchStageTitle = (props: GameProps, scene: StageTitle) =>
  switchDOMScene({ ...props, scene, unsubscribers: [] });
