import { GameProps } from "../../game-props";
import { Loading } from "../../scenes/dom-scenes/loading";
import { switchDOMScene } from "./switch-dom-scene";

/**
 * ローディング画面に切り替える
 * @param props ゲームプロパティ
 * @param scene ローディング画面
 */
export const switchLoading = (props: GameProps, scene: Loading) =>
  switchDOMScene({ ...props, scene, unsubscribers: [] });
