import {BatterySelectorModel} from "./model";
import {BatterySelectorView} from "./view";
import {BatterySelectorSounds, createBatterySelectorSounds} from "./sounds/battery-selector-sounds";
import TWEEN, {Group} from "@tweenjs/tween.js";
import {Observable, Subject} from "rxjs";
import {Resources} from "../../resource";
import {GameObjectAction} from "../action/game-object-action";
import {initialValue} from "./model/initial-value";

/** バッテリーセレクタプロパティ */
export type BatterySelectorProps = {
  /** モデル */
  model: BatterySelectorModel;
  /** ビュー */
  view: BatterySelectorView;
  /** 効果音 */
  sounds: BatterySelectorSounds;
  /** バッテリー変更TweenGroup */
  batteryChangeTween: Group;
  /** -ボタンTweenGroup */
  batteryMinusTween: Group;
  /** +ボタンTweenGroup */
  batteryPlusTween: Group;
  /** 決定ボタン押下通知ストリーム */
  decidePush: Subject<Event>;
  /** バッテリープラスボタン押下通知ストリーム */
  batteryPlusPush: Subject<void>;
  /** バッテリーマイナスボタン押下通知ストリーム */
  batteryMinusPush: Subject<void>;
};

/** バッテリーセレクタプロパティ生成パラメータ */
export type GenerateBatterySelectorPropsParam = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
}

/**
 * バッテリーセレクタプロパティを生成する
 * @param param パラメータ
 * @return バッテリーセレクタプロパティ
 */
export function createBatterySelectorProps(param: GenerateBatterySelectorPropsParam): BatterySelectorProps {
  return {
    model: initialValue(),
    batteryChangeTween: new TWEEN.Group(),
    batteryMinusTween: new TWEEN.Group(),
    batteryPlusTween: new TWEEN.Group(),
    decidePush: new Subject(),
    batteryMinusPush: new Subject(),
    batteryPlusPush: new Subject(),
    sounds: createBatterySelectorSounds(param.resources),
    view: new BatterySelectorView({
      resources: param.resources,
      gameObjectAction: param.gameObjectAction,
    })
  };
}