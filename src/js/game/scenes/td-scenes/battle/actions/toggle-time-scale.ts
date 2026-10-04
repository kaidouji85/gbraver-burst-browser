/** タイムスケール変更通知 */
export type ToggleTimeScale = {
  type: "toggleTimeScale";

  /** 変更するタイムスケール */
  timeScale: number;
};
