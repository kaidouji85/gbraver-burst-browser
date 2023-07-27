import { LoadingProgress } from "../../../resource/loading/loading-actions";
import { LoadingProps } from "../props";
import { engageCompletedRate } from "./engage-completed-rate";

/**
 * リソースのローディング進捗に変化があった際のイベント
 * @param action アクション
 */
export function onLoadingProgress(
  props: LoadingProps,
  action: LoadingProgress
): void {
  props.completedRate = Math.max(action.completedRate, props.completedRate);
  engageCompletedRate(props);
}
