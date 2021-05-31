import {AbstractDistribution} from "./abstract.distribution";

export class DetermineDistribution extends AbstractDistribution {
    constructor(private periodic: number) {
        super();
    }

    public getValue(): number {
        return this.periodic;
    }
}
