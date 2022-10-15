// @flow
import type {Resources} from "../../../../../resource";
import {PathIds} from "../../../../../resource/path";
import {ROOT_CASS} from "./class-name";

/**
 * ルート要素のinnerHTML
 *
 * @return innerHTML
 */
export function rootInnerHtml(resources: Resources): string {
  const bustShot = resources.paths.find(v => v.id === PathIds.SHIN_BRAVER_BUST_SHOT)?.path ?? '';
  return ` 
    <img class="${ROOT_CASS}__shin-braver-bust-shot" src="${bustShot}">
  `;
}