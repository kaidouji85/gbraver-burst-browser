// @flow

/** Loading要素のセレクタ */
export const Loading = '.loading';

/** Loading要素を非表示にする */
export function hiddenLoading(): void {
  document.querySelectorAll(Loading).forEach(e => {
    e.style.display = 'none';
  });
}
