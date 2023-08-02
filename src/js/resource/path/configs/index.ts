import { ShinyaPathConfigs } from "../../texture/configs/shinya";
import { PathIds } from "../ids";
import { PathConfig } from "../resource";
import { CheckPathConfigs } from "./check";
import { CloserPathConfig } from "./closer";
import { EndingPathConfigs } from "./ending";
import { GaiPathConfigs } from "./gai";
import { GenesisBraverPathConfigs } from "./genesis-braver";
import { LightningDozerPathConfigs } from "./lightning-dozer";
import { LogoPathConfigs } from "./logo";
import { NeoLandozerPathConfigs } from "./neo-landozer";
import { PlayInLandscapePathConfigs } from "./play-in-landscape";
import { RaitoPathConfigs } from "./raito";
import { ShinBraverPathConfigs } from "./shin-braver";
import { TitleBackPathConfigs } from "./title-back";
import { TsubasaPathConfigs } from "./tsubasa";
import { WingDozerPathConfigs } from "./wing-dozer";
import { YuuyaPathConfigs } from "./yuuya";

/** パス設定を集めたもの */
export const PathConfigs: PathConfig[] = [
  ...TitleBackPathConfigs,
  ...LogoPathConfigs,
  ...ShinBraverPathConfigs,
  ...NeoLandozerPathConfigs,
  ...LightningDozerPathConfigs,
  ...WingDozerPathConfigs,
  ...GenesisBraverPathConfigs,
  ...ShinyaPathConfigs,
  ...GaiPathConfigs,
  ...RaitoPathConfigs,
  ...TsubasaPathConfigs,
  ...YuuyaPathConfigs,
  ...EndingPathConfigs,
  ...CloserPathConfig,
  ...PlayInLandscapePathConfigs,
  ...CheckPathConfigs,
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
