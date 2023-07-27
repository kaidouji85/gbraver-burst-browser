import { LoadingProps } from "../props";

/**
 * ローディング進捗を画面に反映する
 * @param props 画面プロパティ
 */
export function engageCompletedRate(props: LoadingProps): void {
  props.text.innerText = `LOADING... ${Math.floor(props.completedRate * 100)}%`;
  props.bar.style.width = `${props.completedRate * 100}%`;
}
