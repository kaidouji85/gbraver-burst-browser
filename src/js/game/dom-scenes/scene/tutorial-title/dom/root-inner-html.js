// @flow
import type {Resources} from "../../../../../resource";
import {PathIds} from "../../../../../resource/path";
import {ROOT_CLASS} from "./class-name";

/**
 * ルート要素のinnerHTML
 *
 * @return innerHTML
 */
export function rootInnerHtml(resources: Resources): string {
  const bustShot = resources.paths.find(v => v.id === PathIds.SHIN_BRAVER_BUST_SHOT)?.path ?? '';
  const stand = resources.paths.find(v => v.id === PathIds.SHIN_BRAVER_STAND)?.path ?? '';
  return `
    <div class="${ROOT_CLASS}__title">
      <div class="${ROOT_CLASS}__stage">
        <div class="${ROOT_CLASS}__stage-prefix--capitalized">T</div>      
        <div class="${ROOT_CLASS}__stage-prefix">uorial</div>
        <div class="${ROOT_CLASS}__stage-level">1</div>
      </div>
      <div class="${ROOT_CLASS}__caption">バッテリーシステム基本</div>
    </div>
    <img class="${ROOT_CLASS}__shin-braver-stand" src="${stand}">
    <img class="${ROOT_CLASS}__shin-braver-bust-shot" src="${bustShot}">
  `;
}