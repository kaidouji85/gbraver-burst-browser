import { LoadingProps } from "../props";

/**
 * ローディング進捗を変更する
 * @param completedRate 0〜1で指定する進捗率、1で完了
 */
export function setCompletedRate(
  props: LoadingProps,
  completedRate: number
): void {
  props.text.innerText = `LOADING... ${Math.floor(completedRate * 100)}%`;
  props.bar.style.width = `${completedRate * 100}%`;
}