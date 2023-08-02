import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** NPCコース パス設定 */
export const NPCCoursePathConfigs: PathConfig[] = [
  {
    id: PathIds.NPC_COURSE_EASY_ICON,
    path: (root) => `${root.get()}/npc-course/easy.svg`,
  },
  {
    id: PathIds.NPC_COURSE_NORMAL_ICON,
    path: (root) => `${root.get()}/npc-course/normal.svg`,
  },
  {
    id: PathIds.NPC_COURSE_HARD_ICON,
    path: (root) => `${root.get()}/npc-course/hard.svg`,
  },
  {
    id: PathIds.NPC_COURSE_VERY_HARD_ICON,
    path: (root) => `${root.get()}/npc-course/very-hard.svg`,
  },
];
