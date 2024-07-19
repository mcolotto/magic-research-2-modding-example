export type SpellcraftData = {
    vatId: string;
    spellcraftId: string | undefined;
    spellId: string | undefined;
};
export type SpellcraftStrategy = {
    rules: {
        spellcraftId: string | undefined;
        spellId: string | undefined;
    }[];
    strategyName: string | undefined;
};
