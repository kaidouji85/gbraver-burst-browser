import { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT_CLASS } from "./class-name";
import { DataIDs } from "./data-ids";
import template from "./root-inner-html.hbs";

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @param resources リソース管理オブジェクト
 * @param ids data-idをあつめたもの
 * @returns 生成結果
 */
export function rootInnerHTML(resources: Resources, ids: DataIDs): string {
  const closerPath =
    resources.paths.find((v) => v.id === PathIds.CLOSER)?.path ?? "";
  const casualMatchDescription =
    "すべてのプレイヤーでランダムマッチをおこないます";
  const privateMatchHostDescription =
    "プライベートマッチを開催します、ルームIDをゲストに共有してください";
  const privateMatchGuestDescription =
    "ホストから共有されたルームIDを入力して、対戦を開始します";
  return template({
    ROOT_CLASS,
    ids,
    closerPath,
    casualMatchDescription,
    privateMatchHostDescription,
    privateMatchGuestDescription,
  });
}
