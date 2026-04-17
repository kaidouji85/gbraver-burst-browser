import { ResourcesContainer } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT_CLASS } from "./class-name";
import template from "./root-inner-html.hbs";

/** ルートHTML要素のinnerHTMLのオプション */
export type RootInnerHTMLOptions = ResourcesContainer & {
  /** ルームIDの初期値 */
  initialRoomId?: string;
};

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @returns 生成したinnerHTML
 */
export const rootInnerHTML = (options: RootInnerHTMLOptions) => {
  const { resources } = options;
  const initialRoomId = options.initialRoomId ?? "";
  const closerPath =
    resources.paths.find((p) => p.id === PathIds.CLOSER)?.path ?? "";
  return template({
    ROOT_CLASS,
    closerPath,
    initialRoomId,
  });
};
