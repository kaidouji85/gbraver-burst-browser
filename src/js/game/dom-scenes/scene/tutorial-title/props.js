// @flow
import {ROOT_CLASS} from "./dom/class-name";
import type {RootInnerHTMLParams} from "./dom/root-inner-html";
import {rootInnerHtml} from "./dom/root-inner-html";

/** チュートリアルタイトル画面プロパティ */
export type TutorialTitleProps = {
  /** ルートHTML要素 */
  root: HTMLElement,
};

/** プロパティ生成パラメータ */
export type CreatePropsParams = RootInnerHTMLParams;

/**
 * チュートリアルタイトル画面プロパティを生成する
 *
 * @param params パラメータ
 * @return 生成した画面プロパティ
 */
export function createTutorialTitleProps(params: CreatePropsParams): TutorialTitleProps {
  const root = document.createElement('div');
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHtml(params);
  return {root};
}