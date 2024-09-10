import { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT_CLASS } from "./class-name";
import template from "./root-inner-html.hbs";

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @param resources リソース管理オブジェクト
 * @param roomID 表示するルームID
 * @returns 生成結果
 */
export function rootInnerHTML(resources: Resources, roomID: string): string {
  const closerPath =
    resources.paths.find((v) => v.id === PathIds.CLOSER)?.path ?? "";
  const description =
    "プライベートマッチしたい人に、以下のQRコードまたはルームIDを共有してください。";
  return template({
    ROOT_CLASS,
    closerPath,
    roomID,
    description,
  });
}
