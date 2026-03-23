import { ArmdozerId, PilotId } from "gbraver-burst-core";

/** ローカル対戦（ゲスト）サブフロー キャラ選択 */
export type PlayerSelect = {
  type: "PlayerSelect";
};

/** ローカル対戦（ゲスト）エントリ */
export type Entry = {
  type: "Entry";
  /** 選択したアームドーザ */
  armdozerId: ArmdozerId;
  /** 選択したパイロット */
  pilotId: PilotId;
};

/** ローカル対戦（ゲスト）サブフロー マッチング待ち */
export type Waiting = {
  type: "Waiting";
};

/** ローカル対戦（ゲスト）サブフロー 戦闘中 */
export type Battle = {
  type: "Battle";
};

/** ローカル対戦（ゲスト）のサブフロー */
export type LocalBattleGuestSubFlow = PlayerSelect | Entry | Waiting | Battle;

/** ローカル対戦（ゲスト） */
export type LocalBattleGuest = {
  type: "LocalBattleGuest";
  /** サブフロー */
  localBattleGuest: LocalBattleGuestSubFlow;
};
