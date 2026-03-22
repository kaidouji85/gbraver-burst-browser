import { ResourcesContainer } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT_CLASS } from "./class-name";
import template from "./root-inner-html.hbs";

/** ルートHTML要素のinnerHTML生成オプション */
export type RootInnerHTMLOptions = ResourcesContainer & {
  /** パスワード */
  password: string;
};

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @param options 生成オプション
 * @returns 生成されたinnerHTML
 */
export const rootInnerHTML = (options: RootInnerHTMLOptions) => {
  const { resources, password } = options;
  const closerPath =
    resources.paths.find((p) => p.id === PathIds.CLOSER)?.path ?? "";
  return template({
    ROOT_CLASS,
    closerPath,
    password,
  });
};
