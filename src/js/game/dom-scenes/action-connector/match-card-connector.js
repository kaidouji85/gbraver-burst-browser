// @flow

import { MatchCard } from "../scene/match-card";
import type { DOMSceneActionConnector } from "./dom-scene-action-connector";

/** アクションコネクタのデータ型 */
type Connector = DOMSceneActionConnector<MatchCard>;

/** 対戦カード画面とゲームアクションを関連付ける */
export const matchCardConnector: Connector = () => [];
