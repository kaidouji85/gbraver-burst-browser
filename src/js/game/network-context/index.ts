import { OfflineLAN } from "./offline-lan";
import { Online } from "./online";
import { StandAlone } from "./stand-alone";

/** ネットワークコンテキスト */
export type NetworkContext = StandAlone | OfflineLAN | Online;
