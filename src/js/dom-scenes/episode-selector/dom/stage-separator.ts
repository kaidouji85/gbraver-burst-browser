import { ROOT_CLASS } from "./class-name";

/**
 * ステージセパレータを生成する
 * @return 生成結果
 */
export function stageSeparator() {
  const separator = document.createElement("div");
  separator.className = `${ROOT_CLASS}__stage-separator`;
  return separator;
}
