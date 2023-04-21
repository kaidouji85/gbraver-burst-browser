import { PILOT } from "./class-name";

/**
 * パイロットボタンHTMLを生成するヘルパー関数
 * @param dataID データID
 * @return 生成結果
 */
export const pilotButton = (dataID: string) => `
  <button type="button" class="${PILOT}" data-id="${dataID}" accesskey="p">パイロット(p)</button>
`;
