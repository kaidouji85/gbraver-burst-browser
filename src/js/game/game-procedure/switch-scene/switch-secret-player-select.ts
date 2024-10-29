import { map } from "rxjs";

import { SecretPlayerSelect } from "../../../dom-scenes/secret-player-select";
import { GameProps } from "../../game-props";
import { switchDOMScene } from "./switch-dom-scene";

/**
 * シークレットプレイヤー画面のアクションコネクタを生成する
 * @param props ゲームプロパティ
 * @param scene シークレットプレイヤー画面
 */
export const switchSecretPlayerSelect = (
  props: GameProps,
  scene: SecretPlayerSelect,
) =>
  switchDOMScene({
    ...props,
    scene,
    unsubscribers: props.gameAction.connect([
      scene.notifyOK().pipe(map((a) => ({ ...a, type: "SelectionComplete" }))),
      scene.notifyPrev().pipe(map(() => ({ type: "SelectionCancel" }))),
    ]),
  });
