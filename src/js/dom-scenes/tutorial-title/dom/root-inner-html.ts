import type { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path";
import { ROOT_CLASS } from "./class-name";
import type { DataIDs } from "./data-ids";

/**
 * ステージ名のHTMLタグ
 *
 * @param title ステージタイトル
 * @return 生成したHTMLタグ
 */
function captionClauses(title: string[]): string {
  return title
    .map(
      (v) => `
    <span class="${ROOT_CLASS}__caption-clause">
      ${v}
    </span>
  `
    )
    .join("");
}

/** ルート要素innerHTMLのパラメータ */
export type RootInnerHTMLParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** タイトル */
  title: string[];
  /** チュートリアルレベル */
  level: number;
};

/**
 * ルート要素のinnerHTML
 *
 * @param ids data-idをあつめたもの
 * @param params パラメータ
 * @return innerHTML
 */
export function rootInnerHtml(
  ids: DataIDs,
  params: RootInnerHTMLParams
): string {
  const prefix = "Tutorial";
  const bustShot =
    params.resources.paths.find((v) => v.id === PathIds.SHIN_BRAVER_BUST_SHOT)
      ?.path ?? "";
  const stand =
    params.resources.paths.find((v) => v.id === PathIds.SHIN_BRAVER_STAND)
      ?.path ?? "";
  return `
    <div class="${ROOT_CLASS}__title">
      <div class="${ROOT_CLASS}__stage">
        <div class="${ROOT_CLASS}__stage-prefix--capitalized">
          ${prefix.slice(0, 1)}
        </div>      
        <div class="${ROOT_CLASS}__stage-prefix">${prefix.slice(1)}</div>
        <div class="${ROOT_CLASS}__stage-level">${params.level}</div>
      </div>
      <div class="${ROOT_CLASS}__caption">${captionClauses(params.title)}</div>
    </div>
    <img class="${ROOT_CLASS}__shin-braver-stand" data-id="${
    ids.stand
  }" src="${stand}">
    <img class="${ROOT_CLASS}__shin-braver-bust-shot" data-id="${
    ids.bustShot
  }" src="${bustShot}">
  `;
}
