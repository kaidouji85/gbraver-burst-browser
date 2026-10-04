/** 戦闘シーンコントローラータイプのマスタ */
export const BattleControllerTypes = ["BigButton", "MiniController"] as const;

/** 戦闘シーンコントローラータイプ */
export type BattleControllerType = (typeof BattleControllerTypes)[number];
