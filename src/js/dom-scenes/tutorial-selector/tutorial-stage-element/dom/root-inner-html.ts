import { ROOT_CLASS } from "./class-name";
import { DataIDs } from "./data-ids";
import {TutorialType} from "../../../../game/tutorial-stages/tutorial-stage";

/** 初級 */
const beginner = () =>
  `<div class="${ROOT_CLASS}__beginner">初級</div>`;

/** 中級 */
const intermediate = () =>
  `<div class="${ROOT_CLASS}__intermediate">中級</div>`;

/** 上級 */
const advanced = () =>
  `<div class="${ROOT_CLASS}__advanced">上級</div>`;

/**
 * チュートリアル対応に応じたアイコンを生成する
 * @param tutorialType チュートリアルタイプ
 * @return アイコン
 */
const tutorialType = (tutorialType: TutorialType): string => {
  switch(tutorialType) {
    case "Beginner":
      return beginner();
    case "Intermediate":
      return intermediate();
    case "Advanced":
      return advanced();
    default:
      return beginner();
  }
};

/**
 * ルート要素のinnerHTML
 * @param level ステージレベル
 * @param title ステージタイトル
 * @return innerHTML
 */
export function rootInnerHTML(
  ids: DataIDs,
  level: number,
  title: string,
): string {
  return `
    <div class="${ROOT_CLASS}__prefix">${level}</div>
    <div class="${ROOT_CLASS}__title">${title}</div>
    <div class="${ROOT_CLASS}__overlay" data-id="${ids.overlay}"></div>
  `;
}
