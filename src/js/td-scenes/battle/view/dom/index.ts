import { Observable } from "rxjs";

import { BattleSceneAction } from "../../actions";
import { BattleViewCreatorParams } from "../creator-params";
import { notifyBattleAction } from "./procedure/create-battle-action";
import { createDOMLayerProps } from "./procedure/create-dom-layer-props";
import { destructor } from "./procedure/destructor";
import { getHTMLElements } from "./procedure/get-html-elements";
import { DOMLayerProps } from "./props";

/** DOMレイヤー */
export interface DOMLayer extends DOMLayerProps {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * 戦闘シーンアクションを通知する
   * @returns 通知ストリーム
   */
  notifyBattleAction(): Observable<BattleSceneAction>;

  /**
   * シーンに追加するHTML要素群を取得する
   * @returns シーンに追加するHTML要素群
   */
  getHTMLElements(): HTMLElement[];
}

/**
 * DOMレイヤーを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createDOMLayer(params: BattleViewCreatorParams): DOMLayer {
  const props = createDOMLayerProps(params);
  return {
    ...props,
    destructor: () => destructor(props),
    notifyBattleAction: () => notifyBattleAction(props),
    getHTMLElements: () => getHTMLElements(props),
  };
}
