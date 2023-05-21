import {BatterySelectorProps} from "../props";
import {Observable, Unsubscribable} from "rxjs";
import {GameObjectAction} from "../../action/game-object-action";
import {onUpdate} from "./on-update";
import {onPreRender} from "./on-pre-render";
import {onOKPush} from "./on-ok-push";
import {onBatteryMinusPush} from "./on-battery-minus-push";
import {onBatteryPlusPush} from "./on-battery-plus-push";

/**
 * イベントリスナーをバインドする
 * @param props ゲームオブジェクトプロパティ
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return アンサブスクライバ
 */
export function bindEventListeners(props: BatterySelectorProps, gameObjectAction: Observable<GameObjectAction>): Unsubscribable[] {
  return [
    gameObjectAction.subscribe((action) => {
      if (action.type === "Update") {
        onUpdate(props, action);
      } else if (action.type === "PreRender") {
        onPreRender(props, action);
      }
    }),
    props.view.okButtonPushNotifier().subscribe((event) => {
      onOKPush(props, event);
    }),
    props.view.plusButtonPushNotifier().subscribe(() => {
      onBatteryPlusPush(props);
    }),
    props.view.minusButtonPushNotifier().subscribe(() => {
      onBatteryMinusPush(props);
    }),
  ];
}