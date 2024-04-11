import { LightningDozerModel } from "../model/lightning-dozer-model";
import { LightningDozerSounds } from "../sounds/lightning-dozer-sounds";

/** ライトニングドーザ アニメーション プロパティ */
export type LightningDozerAnimationProps = {
    /** モデル */
    model: LightningDozerModel;
    /** サウンド */
    sounds: LightningDozerSounds;
};