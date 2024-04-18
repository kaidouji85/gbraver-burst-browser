import { Observable } from "rxjs";

import { BattleSceneAction } from "../../actions";
import { BattleViewCreatorParams } from "../creator-params";
import { createBattleAction } from "./procedure/create-battle-action";
import { createDOMLayerProps } from "./procedure/create-dom-layer-props";
import { getHTMLElements } from "./procedure/get-html-elements";
import { DOMLayerProps } from "./props";

/** DOMレイヤー */
export interface DOMLayer extends DOMLayerProps {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * 戦闘シーンアクション通知
   * @return 通知ストリーム
   */
  battleActionNotifier(): Observable<BattleSceneAction>;

  /**
   * シーンに追加するHTML要素群を取得する
   * @return シーンに追加するHTML要素群
   */
  getHTMLElements(): HTMLElement[];
}

/**
 * DOMレイヤーを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createDOMLayer(params: BattleViewCreatorParams): DOMLayer {
  const props = createDOMLayerProps(params);
  const battleAction = createBattleAction(props);
  return {
    ...props,
    destructor: () => {
      props.miniController.destructor();
    },
    battleActionNotifier: () => battleAction,
    getHTMLElements: () => getHTMLElements(props)
  }
}