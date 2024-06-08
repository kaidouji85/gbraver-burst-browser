import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";

/**
 * ゲームアクションリスナー
 * @param props ゲームプロパティ
 * @param action ゲームアクション
 */
export type GameActionListener = (props: GameProps, action: GameAction) => void;
