import { Subject } from "rxjs";

import { AbortManagerContainer } from "../../../abort-controller/abort-manager-container";
import { Exclusive } from "../../../exclusive/exclusive";
import { ROOT_CLASS } from "../dom/class-name";
import { PostBattleFloaterProps } from "../props";

/** PostBattleFloaterProps生成オプション */
export type PostBattleFloaterPropsOptions = Readonly<AbortManagerContainer>;

/**
 * PostBattleFloaterPropsの初期値を設定するヘルパー関数
 * @param options オプション
 * @returns 生成結果
 */
export function createPostBattleFloaterProps(
  options: PostBattleFloaterPropsOptions,
): PostBattleFloaterProps {
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.style.display = "none";
  return {
    ...options,
    root,
    exclusive: new Exclusive(),
    selectionComplete: new Subject(),
    unsubscribers: [],
  };
}
