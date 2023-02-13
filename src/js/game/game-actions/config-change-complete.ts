import { GbraverBurstBrowserConfig } from "../config/browser-config";

/** 設定変更完了 */
export type ConfigChangeComplete = {
  type: "ConfigChangeComplete";
  /** 変更した設定内容 */
  config: GbraverBurstBrowserConfig;
};
