import type { DataIDs } from "./data-ids";

/** ルート要素の子孫要素 */
type Elements = {
  backGround: HTMLElement;
  closer: HTMLElement;
  easy: HTMLElement;
  easyButton: HTMLElement;
  normal: HTMLElement;
  normalButton: HTMLElement;
  hard: HTMLElement;
  hardButton: HTMLElement;
  veryHard: HTMLElement;
  veryHardButton: HTMLElement;
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
export function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const backGround = root.querySelector(`[data-id="${ids.backGround}"]`) ?? document.createElement("div");
  const closer = root.querySelector(`[data-id="${ids.closer}"]`) ?? document.createElement("div");
  const easy = root.querySelector(`[data-id="${ids.easy}"]`) ?? document.createElement("div");
  const easyButton = root.querySelector(`[data-id="${ids.easyButton}"]`) ?? document.createElement("div");
  const normal = root.querySelector(`[data-id="${ids.normal}"]`) ?? document.createElement("div");
  const normalButton = root.querySelector(`[data-id="${ids.normalButton}"]`) ?? document.createElement("div");
  const hard = root.querySelector(`[data-id="${ids.hard}"]`) ?? document.createElement("div");
  const hardButton = root.querySelector(`[data-id="${ids.hardButton}"]`) ?? document.createElement("div");
  const veryHard = root.querySelector(`[data-id="${ids.veryHard}"]`) ?? document.createElement("div");
  const veryHardButton = root.querySelector(`[data-id="${ids.veryHardButton}"]`) ?? document.createElement("div");
  return {
    backGround,
    closer,
    easy,
    easyButton,
    normal,
    normalButton,
    hard,
    hardButton,
    veryHard,
    veryHardButton
  };
}