import { ResourcesContainer } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT_CLASS } from "./class-name";
import template from "./root-inner-html.hbs";

/** ルートHTML要素の生成オプション */
export type RootHTMLOptions = ResourcesContainer & {
  /** ルームIDの初期値 */
  initialRoomID?: string;
};

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @param options 生成オプション
 * @returns 生成結果
 */
export function rootInnerHtml(options: RootHTMLOptions): string {
  const { resources } = options;
  const initialRoomID = options.initialRoomID ?? "";
  const closerPath =
    resources.paths.find((v) => v.id === PathIds.CLOSER)?.path ?? "";
  return template({
    ROOT_CLASS,
    closerPath,
    initialRoomID,
  });
}
