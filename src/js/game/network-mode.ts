import { BrowserSDK } from "@gbraver-burst-network/browser-sdk";
import { OfflineBrowserSDK } from "@gbraver-burst-network/offline-browser-sdk/lib/offline-browser-sdk";

/** スタンドアローン */
export type StandAlone = {
  type: "stand-alone";
};

/** オフラインLAN */
export type OfflineLAN = {
  type: "offline-lan";
  /** オフラインLAN用のSDK */
  sdk: OfflineBrowserSDK;
};

/** オンライン */
export type Online = {
  type: "online";
  /** オンライン用のSDK */
  sdk: BrowserSDK;
};

/** ネットワークモード */
export type NetworkMode = StandAlone | OfflineLAN | Online;
