import { BatterySelectorProps } from "../props/battery-selector-props";

/**
 * 決定ボタン押下時の処理
 * @param props ゲームオブジェクトプロパティ
 * @param event イベント
 */
export function onOKPush(props: BatterySelectorProps, event: Event): void {
  const { model, decidePush } = props;
  if (model.isPushNotifierDisabled || model.disabled) {
    return;
  }

  decidePush.next(event);
}
