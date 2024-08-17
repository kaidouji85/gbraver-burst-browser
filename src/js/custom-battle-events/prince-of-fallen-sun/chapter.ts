/** チャプターなし */
export type None = {
  readonly type: "None";
};

/** ガイがパイロットスキルを発動した */
export type GaiActivatedSkill = {
  type: "GaiActivatedSkill";
};

/** チャプター情報 */
export type PrinceOfFallenSunChapter = None | GaiActivatedSkill;