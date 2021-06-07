import {AbstractDistribution} from "./abstract.distribution";

export class ExponentialDistribution extends AbstractDistribution {
    constructor(private value: number) {
        super();
        if (value <= 0) {
            throw new Error("Lambda value <= 0!")
        }
    }

    public getValue(): number {
        const y = Math.random();
        return -(1 / this.value) * Math.log(y);
    }
}
