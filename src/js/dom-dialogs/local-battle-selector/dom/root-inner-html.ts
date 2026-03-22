import { ResourcesContainer } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT_CLASS } from "./class-name";
import template from "./root-inner-html.hbs";

/** ルート要素のinnerHTML生成オプション */
export type RootInnerHTMLOptions = ResourcesContainer;

/**
 * ルート要素のinnerHTML
 * @param options 生成オプション
 * @returns 生成したinnerHTML
 */
export const rootInnerHTML = (options: RootInnerHTMLOptions) => {
  const { resources } = options;
  const closerPath =
    resources.paths.find((p) => p.id === PathIds.CLOSER)?.path ?? "";
  const localBattleHostDescription =
    "ローカル対戦を開催します、ルームIDをゲストに共有してください";
  const localBattleGuestDescription =
    "ホストから共有されたルームIDを入力して、対戦を開始します";
  return template({
    ROOT_CLASS,
    closerPath,
    localBattleHostDescription,
    localBattleGuestDescription,
  });
};
