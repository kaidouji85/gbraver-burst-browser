// @flow

/**
 * 指定したHTML要素を置換する
 * 置換基に親要素がない場合は何もしない
 * 
 * @param oldElement 古いHTML要素
 * @param newElement 新しいHTML要素
 */
export function replaceDOM(oldElement: HTMLElement, newElement: HTMLElement): void {
  const parent = oldElement.parentElement;
  if (!parent) {
    return;
  }

  parent.replaceChild(newElement, oldElement);
}