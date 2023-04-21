import { BURST } from "./class-name";

/**
 * バーストボタンHTMLを生成する
 * @param dataID data-id
 * @return 生成結果
 */
export const burstButton = (dataID: string) => `
  <button type="button" class="${BURST}" data-id="${dataID}" accesskey="b">バースト(b)</button>
`;