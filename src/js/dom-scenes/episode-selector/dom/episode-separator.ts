import { ROOT_CLASS } from "./class-name";

/**
 * エピソードセパレータを生成する
 * @return 生成結果
 */
export function episodeSeparator() {
  const separator = document.createElement("div");
  separator.className = `${ROOT_CLASS}__episode-separator`;
  return separator;
}
