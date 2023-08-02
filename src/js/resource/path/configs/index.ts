import { PathIds } from "../ids";
import { PathConfig } from "../resource";
import { GenesisBraverPathConfigs } from "./genesis-braver";
import { LightningDozerPathConfigs } from "./lightning-dozer";
import { LogoPathConfigs } from "./logo";
import { NeoLandozerPathConfigs } from "./neo-landozer";
import { ShinBraverPathConfigs } from "./shin-braver";
import { TitleBackPathConfigs } from "./title-back";
import { WingDozerPathConfigs } from "./wing-dozer";

/** パス設定を集めたもの */
export const PathConfigs: PathConfig[] = [
  ...TitleBackPathConfigs,
  ...LogoPathConfigs,
  ...ShinBraverPathConfigs,
  ...NeoLandozerPathConfigs,
  ...LightningDozerPathConfigs,
  ...WingDozerPathConfigs,
  ...GenesisBraverPathConfigs,
  {
    id: PathIds.SHINYA_ICON,
    path: (root) => `${root.get()}/pilot/shinya/player-select.webp`,
  },
  {
    id: PathIds.SHINYA_SKILL_CUTIN,
    path: (root) => `${root.get()}/pilot/shinya/skill-cutin.webp`,
  },
  {
    id: PathIds.GAI_ICON,
    path: (root) => `${root.get()}/pilot/gai/player-select.webp`,
  },
  {
    id: PathIds.GAI_SKILL_CUTIN,
    path: (root) => `${root.get()}/pilot/gai/skill-cutin.webp`,
  },
  {
    id: PathIds.RAITO_SKILL_CUTIN,
    path: (root) => `${root.get()}/pilot/raito/skill-cutin.webp`,
  },
  {
    id: PathIds.RAITO_ICON,
    path: (root) => `${root.get()}/pilot/raito/player-select.webp`,
  },
  {
    id: PathIds.TSUBASA_SKILL_CUTIN,
    path: (root) => `${root.get()}/pilot/tsubasa/skill-cutin.webp`,
  },
  {
    id: PathIds.TSUBASA_ICON,
    path: (root) => `${root.get()}/pilot/tsubasa/player-select.webp`,
  },
  {
    id: PathIds.YUUYA_SKILL_CUTIN,
    path: (root) => `${root.get()}/pilot/yuuya/skill-cutin.webp`,
  },
  {
    id: PathIds.YUUYA_ICON,
    path: (root) => `${root.get()}/pilot/yuuya/player-select.webp`,
  },
  {
    id: PathIds.END,
    path: (root) => `${root.get()}/ending/end.svg`,
  },
  {
    id: PathIds.END_CARD,
    path: (root) => `${root.get()}/ending/end-card.webp`,
  },
  {
    id: PathIds.CLOSER,
    path: (root) => `${root.get()}/dialog/closer.svg`,
  },
  {
    id: PathIds.PLAY_IN_LANDSCAPE,
    path: (root) => `${root.get()}/waring/play-in-landscape.webp`,
  },
  {
    id: PathIds.CHECK,
    path: (root) => `${root.get()}/check/check.webp`,
  },
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
  {
    id: PathIds.TUTORIAL_IMAGE_CUT_01,
    path: (root) => `${root.get()}/tutorial/image-cut-01.webp`,
  },
  {
    id: PathIds.TUTORIAL_IMAGE_CUT_02,
    path: (root) => `${root.get()}/tutorial/image-cut-02.webp`,
  },
  {
    id: PathIds.TUTORIAL_IMAGE_CUT_03,
    path: (root) => `${root.get()}/tutorial/image-cut-03.webp`,
  },
  {
    id: PathIds.BATTERY_ICON,
    path: (root) => `${root.get()}/battery-icon.svg`,
  },
  {
    id: PathIds.HELP_ICON,
    path: (root) => `${root.get()}/help-icon.svg`,
  },
  {
    id: PathIds.MESSAGE_WINDOW_ATTACK_BATTERY,
    path: (root) => `${root.get()}/message-window/attack-battery.webp`,
  },
  {
    id: PathIds.MESSAGE_WINDOW_DEFENSE_BATTERY,
    path: (root) => `${root.get()}/message-window/defense-battery.webp`,
  },
  {
    id: PathIds.MESSAGE_WINDOW_PLUS_BATTERY,
    path: (root) => `${root.get()}/message-window/plus-battery.webp`,
  },
  {
    id: PathIds.MESSAGE_WINDOW_MINUS_BATTERY,
    path: (root) => `${root.get()}/message-window/minus-battery.webp`,
  },
];
