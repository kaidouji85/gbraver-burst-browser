/** ゲストがローカル対戦にエントリーする */
export type LocalBattleEntry = {
  type: "LocalBattleEntry";
  /** 参加するルームのID */
  roomID: string;
};
