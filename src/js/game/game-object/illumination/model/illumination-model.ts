/** ステージ全体の照明 モデル */
export type IlluminationModel = {
  /**
   * 照明の強さ
   * 1が標準の強さで、0に近づくほど暗くなる
   */
  intensity: number;

  /** 照明の色味、1がベースの色味で、0に近づくほど暗くなる */
  color: {
    /** 赤成分 */
    r: number;
    /** 緑成分 */
    g: number;
    /** 青成分 */
    b: number;
  };
};
