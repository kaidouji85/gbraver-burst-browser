/** ステージ全体の照明 モデル */
export type IlluminationModel = {
  /**
   * 照明の強さ
   * 0から1で指定して大きいほど明るくなる
   */
  intensity: number;

  /** 照明の色味、0から1で指定する */
  color: {
    /** 赤成分 */
    r: number;
    /** 緑成分 */
    g: number;
    /** 青成分 */
    b: number;
  };
};
