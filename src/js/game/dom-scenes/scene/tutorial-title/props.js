// @flow
import type {Resources} from "../../../../resource";
import {ROOT_CLASS} from "./dom/class-name";
import {rootInnerHtml} from "./dom/root-inner-html";

/** チュートリアルタイトル画面プロパティ */
export type TutorialTitleProps = {
  /** ルートHTML要素 */
  root: HTMLElement,
};

/**
 * チュートリアルタイトル画面プロパティを生成する
 *
 * @param resources リソース管理オブジェクト
 * @return 生成した画面プロパティ
 */
export function createTutorialTitleProps(resources: Resources): TutorialTitleProps {
  const root = document.createElement('div');
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHtml(resources);
  return {root};
}