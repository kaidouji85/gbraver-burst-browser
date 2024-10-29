import { Loading } from "../../../dom-scenes/loading";
import { GameProps } from "../../game-props";
import { switchDOMScene } from "./switch-dom-scene";

/**
 * ローディング画面に切り替える
 * @param props ゲームプロパティ
 * @param scene ローディング画面
 */
export const switchLoading = (props: GameProps, scene: Loading) =>
  switchDOMScene({ ...props, scene, unsubscribers: [] });
