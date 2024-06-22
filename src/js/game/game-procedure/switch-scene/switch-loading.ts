import { Loading } from "../../../dom-scenes/loading";
import { GameProps } from "../../game-props";

/**
 * ローディング画面に切り替える
 * @param props ゲームプロパティ
 * @param scene ローディング画面
 */
export const switchLoading = (props: GameProps, scene: Loading) =>
  props.domSceneBinder.bind(scene, () => []);
