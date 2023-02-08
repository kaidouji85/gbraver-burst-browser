import type { CasualMatch } from "./casual-match";
import type { None } from "./none";
import type { NPCBattle } from "./npc-battle";
import { PrivateMatchHost } from "./private-match-host";
import type { Tutorial } from "./tutorial";

/**
 * 現在進行中のフローの状態を保持する
 */
export type InProgress = None | NPCBattle | CasualMatch | Tutorial | PrivateMatchHost;
