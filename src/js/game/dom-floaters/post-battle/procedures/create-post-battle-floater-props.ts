import { Subject } from "rxjs";

import { Exclusive } from "../../../../exclusive/exclusive";
import { PostBattleFloaterProps } from "../props";

/**
 * PostBattleFloaterPropsの初期値を設定するヘルパー関数
 * @returns 生成結果
 */
export function createPostBattleFloaterProps(): PostBattleFloaterProps {
  return {
    root: document.createElement("div"),
    exclusive: new Exclusive(),
    selectionComplete: new Subject(),
    unsubscribers: [],
  };
}
