import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** エピソード パス設定 */
export const EpisodePathConfigs: PathConfig[] = [
  {
    id: PathIds.IMAGE_CUT_BATTERY_SYSTEM,
    path: (root) => `${root.get()}/episodes/image-cut-battery-system.webp`,
  },
  {
    id: PathIds.IMAGE_CUT_ZERO_DEFENSE,
    path: (root) => `${root.get()}/episodes/image-cut-zero-defense.webp`,
  },
  {
    id: PathIds.IMAGE_CUT_BURST,
    path: (root) => `${root.get()}/episodes/image-cut-burst.webp`,
  },
  {
    id: PathIds.IMAGE_CUT_PILOT_SKILL_01,
    path: (root) => `${root.get()}/episodes/image-cut-pilot-skill-01.webp`,
  },
  {
    id: PathIds.IMAGE_CUT_PILOT_SKILL_02,
    path: (root) => `${root.get()}/episodes/image-cut-pilot-skill-02.webp`,
  },
  {
    id: PathIds.IMAGE_CUT_CONFRONTATION_TWO_BRAVER,
    path: (root) =>
      `${root.get()}/episodes/image-cut-confrontation-two-braver.webp`,
  },
  {
    id: PathIds.IMAGE_CUT_PRINCE_OF_FALLEN_SUN,
    path: (root) =>
      `${root.get()}/episodes/image-cut-prince-of-fallen-sun.webp`,
  },
  {
    id: PathIds.IMAGE_CUT_QUEEN_OF_TRAGEDY,
    path: (root) => `${root.get()}/episodes/image-cut-queen-of-tragedy.webp`,
  },
  {
    id: PathIds.IMAGE_CUT_SURVIVE_SUPER_POWER_WITH_GUARD,
    path: (root) =>
      `${root.get()}/episodes/image-cut-survive-super-power-with-guard.webp`,
  },
];
