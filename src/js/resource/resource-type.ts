import { ArmdozerId, PilotId } from "gbraver-burst-core";

/** リソース種別 */
export type ResourceType =
  | BootResource
  | SharedResource
  | DynamicArmdozerResource
  | DynamicPilotResource;

/** タイトル画面のための必要最低限のリソース */
export type BootResource = {
  type: "Boot";
};

/** ゲーム開始したら読み込まれっぱなしとなるリソース */
export type SharedResource = {
  type: "Shared";
};

/** ダイナミックにロードするアームドーザ関連リソース */
export type DynamicArmdozerResource = {
  type: "DynamicArmdozer";
  /** アームドーザーのID */
  armdozerId: ArmdozerId;
};

/** ダイナミックにロードするパイロット関連リソース */
export type DynamicPilotResource = {
  type: "DynamicPilot";
  /** パイロットのID */
  pilotId: PilotId;
};
