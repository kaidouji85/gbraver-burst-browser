// @flow
import {ROOT_CASS} from "./dom/class-name";

/** チュートリアルタイトル画面プロパティ */
export type TutorialTitleProps = {
  /** ルートHTML要素 */
  root: HTMLElement,
};

/**
 * チュートリアルタイトル画面プロパティを生成する
 *
 * @return 生成した画面プロパティ
 */
export function createTutorialTitleProps(): TutorialTitleProps {
  const root = document.createElement('div');
  root.className = ROOT_CASS;
  return {root};
}