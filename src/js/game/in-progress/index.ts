import type { CasualMatch } from "./casual-match";
import type { None } from "./none";
import type { NPCBattle } from "./npc-battle";
import { PrivateMatchGuest } from "./private-match-guest";
import { PrivateMatchHost } from "./private-match-host";
import type { Story } from "./story";

/** 現在進行中のフローの状態を保持する */
export type InProgress =
  | None
  | NPCBattle
  | CasualMatch
  | Story
  | PrivateMatchHost
  | PrivateMatchGuest;
