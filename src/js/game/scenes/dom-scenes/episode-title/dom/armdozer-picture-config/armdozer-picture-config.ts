/** アームドーザ画像設定 */
export type ArmdozerPictureConfig = {
  /** 立ち絵 */
  stand: {
    /** 画像パス */
    path: string;
    /** class属性 */
    className: string;
  };
  /** バストショット */
  bustShot: {
    /** 画像パス */
    path: string;
    /** class属性 */
    className: string;
  };
};
