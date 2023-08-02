import { ShinyaPathConfigs } from "../../texture/configs/shinya";
import { PathConfig } from "../resource";
import { BatteryIconPathConfigs } from "./battery-icon";
import { CheckPathConfigs } from "./check";
import { DialogPathConfig } from "./dialog";
import { EndingPathConfigs } from "./ending";
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
  ...BatteryIconPathConfigs,
  ...HelpIconPathConfigs,
  ...MessageWindowPathConfigs,
];
