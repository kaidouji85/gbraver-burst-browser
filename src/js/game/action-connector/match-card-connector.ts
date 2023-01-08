import { MatchCard } from "../../dom-scenes/match-card";
import type { DOMSceneActionConnector } from "../dom-scene-binder/dom-scene-action-connector";

/** アクションコネクタのデータ型 */
type Connector = DOMSceneActionConnector<MatchCard>;

/** 対戦カード画面とゲームアクションを関連付ける */
export const matchCardConnector: Connector = () => [];
