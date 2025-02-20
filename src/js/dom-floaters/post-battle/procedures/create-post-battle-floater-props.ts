import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { ROOT_CLASS } from "../dom/class-name";
import { PostBattleFloaterProps } from "../props";

/**
 * PostBattleFloaterPropsの初期値を設定するヘルパー関数
 * @returns 生成結果
 */
export function createPostBattleFloaterProps(): PostBattleFloaterProps {
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.style.display = "none";
  return {
    root,
    exclusive: new Exclusive(),
    selectionComplete: new Subject(),
    unsubscribers: [],
  };
}
