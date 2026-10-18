import { pop } from "../../../../dom/pop";
import { PushDOM } from "../../../../dom/push-dom";
import { NetworkErrorDialogProps } from "../props";

/**
 * ネットワークエラー後アクションのボタンが押された時の処理
 * @param options オプション
 * @param options.props ネットワークエラーダイアログのプロパティ
 * @param options.action 押下イベント情報
 */
export const onPostNetworkErrorButtonPush = (options: {
  props: Readonly<NetworkErrorDialogProps>;
  action: PushDOM;
}) => {
  const { props, action } = options;
  props.exclusive.execute(async () => {
    action.event.preventDefault();
    props.se.play(props.pushButtonSound);
    await pop(props.postNetworkErrorButton);
    props.postNetworkErrorSource.next(props.postNetworkError);
  });
};
