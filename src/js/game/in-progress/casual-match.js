// @flow

import type {Battle as BattleSDK} from '@gbraver-burst-network/browser-core';

/** カジュアルマッチ */
export type CasualMatch = CasualMatchX<SubFlow>;

/**
 * カジュアルマッチ
 *
 * @template X サブフロー
 */
export type CasualMatchX<X> = {
  type: 'CasualMatch',
  subFlow: X,
};

/** カジュアルマッチのサブフロー */
export type SubFlow = PlayerSelect | Waiting | Battle;


/** キャラ選択 */
export type PlayerSelect = {
  type: 'PlayerSelect'
};

/** マッチング待ち */
export type Waiting = {
  type: 'Waiting'
};

/** 戦闘中 */
export type Battle = {
  type: 'Battle',
  battle: BattleSDK
};