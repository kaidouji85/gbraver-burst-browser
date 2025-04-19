/** リソース種別 */
export type ResourceType = BootResource | SharedResource;

/** タイトル画面のための必要最低限のリソース */
export type BootResource = {
  type: "Boot";
};

/** ゲーム開始したら読み込まれっぱなしとなるリソース */
export type SharedResource = {
  type: "Shared";
};
