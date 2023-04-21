import { BURST } from "./class-name";

/**
 * バーストボタンHTMLを生成する
 * @param dataID data-id
 * @return 生成結果
 */
export const burstButton = (dataID: string) => `
  <button type="button" class="${BURST}" data-id="${dataID}" accesskey="b"></button>
`;

/**
 * バーストボタンを操作可能にするヘルパー関数
 * @param element 操作対象のHTML要素
 */
export function enabledBurst(element: HTMLButtonElement): void {
  element.disabled = true;
}

/**
 * バーストボタンを操作不可能にするヘルパー関数
 * @param element 操作対象のHTML要素
 */
export function disabledBurst(element: HTMLButtonElement): void {
  element.innerText = "バースト(b)"
}
