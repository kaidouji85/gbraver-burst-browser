import { z } from "zod";

/** 戦闘プレイヤーパイロット表示設定 zodスキーマ */
export const PlayerPilotVisibilitySchema = z.union([
  z.literal("visible"),
  z.literal("hidden"),
]);
