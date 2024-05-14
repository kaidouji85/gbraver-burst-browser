import { ResourcesContainer } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT } from "./class-name";
import template from "./root-inner-html.hbs";

/** 生成パラメータ */
type RootInnerHtmlParams = ResourcesContainer;


/**
 * ルート要素のinnerHTMLを生成する
 * @returns 生成結果
 */
export function rootInnerHTML(params: RootInnerHtmlParams) {
  const { resources } = params;

  const playerArmdozerPath =
    resources.paths.find((p) => p.id === PathIds.SHIN_BRAVER_STAND)?.path ?? "";
  const enemyArmdozerPath =
    resources.paths.find((p) => p.id === PathIds.NEO_LANDOZER_STAND)?.path ??
    "";
  const turnIndicatorPath =
    resources.paths.find((p) => p.id === PathIds.TURN_INDICATOR)?.path ?? "";
  const closerPath =
    resources.paths.find((p) => p.id === PathIds.CLOSER)?.path ?? "";
  return template({
    ROOT,
    closerPath,
    playerArmdozerPath,
    enemyArmdozerPath,
    turnIndicatorPath,
  });
}
