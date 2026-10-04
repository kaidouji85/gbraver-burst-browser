/** ビネットの色 */
export type Color = {
  /** 赤、0から1で指定する */
  r: number;
  /** 緑、0から1で指定する */
  g: number;
  /** 青、0から1で指定する */
  b: number;
};

/** プレイヤーデスアラート */
export const PLAYER_DEATH_ALERT_COLOR: Color = {
  r: 255 / 255,
  g: 0 / 255,
  b: 0 / 255,
};

/** 敵デスアラート */
export const ENEMY_DEATH_ALERT_COLOR: Color = {
  r: 0 / 255,
  g: 255 / 255,
  b: 255 / 255,
};
