import { CasualMatch } from "./casual-match";
import { None } from "./none";
import { NPCBattle } from "./npc-battle";
import { PrivateMatchGuest } from "./private-match-guest";
import { PrivateMatchHost } from "./private-match-host";
import { Story } from "./story";

/** 現在進行中のフローの状態を保持する */
export type InProgress =
  | None
  | NPCBattle
  | CasualMatch
  | Story
  | PrivateMatchHost
  | PrivateMatchGuest;
