// @flow
import type {Resources} from "../../../../../resource";
import {PathIds} from "../../../../../resource/path";
import {ROOT_CLASS} from "./class-name";

/** ルート要素innerHTMLのパラメータ */
export type RootInnerHTMLParams = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** タイトル */
  title: string
};

/**
 * ルート要素のinnerHTML
 *
 * @return innerHTML
 */
export function rootInnerHtml(params: RootInnerHTMLParams): string {
  const bustShot = params.resources.paths.find(v => v.id === PathIds.SHIN_BRAVER_BUST_SHOT)?.path ?? '';
  const stand = params.resources.paths.find(v => v.id === PathIds.SHIN_BRAVER_STAND)?.path ?? '';
  return `
    <div class="${ROOT_CLASS}__title">
      <div class="${ROOT_CLASS}__stage">
        <div class="${ROOT_CLASS}__stage-prefix--capitalized">T</div>      
        <div class="${ROOT_CLASS}__stage-prefix">uorial</div>
        <div class="${ROOT_CLASS}__stage-level">1</div>
      </div>
      <div class="${ROOT_CLASS}__caption">${params.title}</div>
    </div>
    <img class="${ROOT_CLASS}__shin-braver-stand" src="${stand}">
    <img class="${ROOT_CLASS}__shin-braver-bust-shot" src="${bustShot}">
  `;
}