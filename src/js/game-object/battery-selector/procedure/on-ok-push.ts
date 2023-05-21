import { BatterySelectorProps } from "../props";

/**
 * 決定ボタン押下時の処理
 * @param props ゲームオブジェクトプロパティ
 * @param event イベント
 */
export function onOKPush(props: BatterySelectorProps, event: Event): void {
  if (props.model.isPushNotifierDisabled) {
    return;
  }

  props.decidePush.next(event);
}
