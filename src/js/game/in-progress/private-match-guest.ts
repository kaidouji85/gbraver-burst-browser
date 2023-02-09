import { ArmDozerId, PilotId } from "gbraver-burst-core";

/** プライベートマッチ（ゲスト）サブフロー キャラ選択 */
export type PlayerSelect = {
  type: "PlayerSelect";
};

/** プライベートマッチ（ゲスト）エントリ */
export type Entry = {
  type: "Entry";
  /** 選択したアームドーザ */
  armdozerId: ArmDozerId;
  /** 選択したパイロット */
  pilotId: PilotId;
};

/** プライベートマッチ（ゲスト）サブフロー マッチング待ち */
export type Waiting = {
  type: "Waiting";
};

/** プライベートマッチ（ゲスト）サブフロー 戦闘中 */
export type Battle = {
  type: "Battle";
};

/** プライベートマッチ（ゲスト）サブフロー */
export type PrivateMatchGuestSubFlow = PlayerSelect | Entry | Waiting | Battle;

/**
 * プライベートマッチ（ゲスト）
 * @template X サブフロー
 */
export type PrivateMatchGuestX<X extends PrivateMatchGuestSubFlow> = {
  type: "PrivateMatchGuest";
  /** サブフロー */
  subFlow: X;
};

/** プライベートマッチ（ゲスト） */
export type PrivateMatchGuest = PrivateMatchGuestX<PrivateMatchGuestSubFlow>;
