export default class SalesQualityData {
    percentLevel;
    category;
    worstAspects;

    constructor({percentLevel, category, worstAspects}) {
        this.category = category;
        this.percentLevel = percentLevel;
        this.worstAspects = worstAspects;
    }
}
