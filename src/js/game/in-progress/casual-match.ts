import { BattleSDK } from "@gbraver-burst-network/browser-sdk";

/** キャラ選択 */
export type PlayerSelect = {
  type: "PlayerSelect";
};

/** 戦闘中 */
export type Battle = {
  type: "Battle";
  /** バトルSDK */
  battle: BattleSDK;
};
/** 再戦 */
export type Rematch = {
  type: "Rematch";
};

/** カジュアルマッチのサブフロー */
export type CasualMatchSubFlow = PlayerSelect | Battle | Rematch;

/**
 * カジュアルマッチ
 * @template X サブフロー
 */
export type CasualMatchX<X> = {
  type: "CasualMatch";
  readonly casualMatch: X;
};

/** カジュアルマッチ */
export type CasualMatch = CasualMatchX<CasualMatchSubFlow>;
