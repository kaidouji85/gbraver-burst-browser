// @flow

/** タイムスケール変更通知 */
export type ToggleTimeScale = {
  type: 'ToggleTimeScale',
  /** 変更するタイムスケール */
  timeScale: number
};