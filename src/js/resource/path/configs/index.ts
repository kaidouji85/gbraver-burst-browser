import { ShinyaPathConfigs } from "../../texture/configs/shinya";
import { PathConfig } from "../resource";
import { BatteryIconPathConfigs } from "./battery-icon";
import { CheckPathConfigs } from "./check";
import { DialogPathConfig } from "./dialog";
import { EndingPathConfigs } from "./ending";
import { EpisodePathConfigs } from "./episodes";
import { GaiPathConfigs } from "./gai";
import { GenesisBraverPathConfigs } from "./genesis-braver";
import { HelpIconPathConfigs } from "./help-icon";
import { LightningDozerPathConfigs } from "./lightning-dozer";
import { LogoPathConfigs } from "./logo";
import { MessageWindowPathConfigs } from "./message-window";
import { NeoLandozerPathConfigs } from "./neo-landozer";
import { NPCCoursePathConfigs } from "./npc-course";
import { PlayInLandscapePathConfigs } from "./play-in-landscape";
import { RaitoPathConfigs } from "./raito";
import { ShinBraverPathConfigs } from "./shin-braver";
import { TitleBackPathConfigs } from "./title-back";
import { TsubasaPathConfigs } from "./tsubasa";
import { TurnIndicatorConfigs } from "./turn-indicator";
import { UserConfigs } from "./user";
import { WingDozerPathConfigs } from "./wing-dozer";
import { YuuyaPathConfigs } from "./yuuya";
import { BattleHamburgerMenuConfigs } from "./battle-hamburger-menu";

/** すべてのパス設定をあつめたもの */
export const PathConfigs: PathConfig[] = [
  ...UserConfigs,
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
  ...EpisodePathConfigs,
  ...BatteryIconPathConfigs,
  ...HelpIconPathConfigs,
  ...MessageWindowPathConfigs,
  ...TurnIndicatorConfigs,
  ...BattleHamburgerMenuConfigs,
];

/** プリロード対象となるパス設定 */
export const PreLoadPathConfigs: PathConfig[] = [
  ...NPCCoursePathConfigs,
  ...MessageWindowPathConfigs,
];
