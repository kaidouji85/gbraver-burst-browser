import { ShinyaPathConfigs } from "../../texture/configs/shinya";
import { PathIds } from "../ids";
import { PathConfig } from "../resource";
import { CheckPathConfigs } from "./check";
import { DialogPathConfig } from "./dialog";
import { EndingPathConfigs } from "./ending";
import { GaiPathConfigs } from "./gai";
import { GenesisBraverPathConfigs } from "./genesis-braver";
import { LightningDozerPathConfigs } from "./lightning-dozer";
import { LogoPathConfigs } from "./logo";
import { NeoLandozerPathConfigs } from "./neo-landozer";
import { NPCCoursePathConfigs } from "./npc-course";
import { PlayInLandscapePathConfigs } from "./play-in-landscape";
import { RaitoPathConfigs } from "./raito";
import { ShinBraverPathConfigs } from "./shin-braver";
import { TitleBackPathConfigs } from "./title-back";
import { TsubasaPathConfigs } from "./tsubasa";
import { TutorialPathConfigs } from "./tutorial";
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
  ...DialogPathConfig,
  ...PlayInLandscapePathConfigs,
  ...CheckPathConfigs,
  ...NPCCoursePathConfigs,
  ...TutorialPathConfigs,
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
