import {max} from "rxjs/operators";
import {AbstractDistribution} from "./abstract.distribution";

export class UniformDistribution extends AbstractDistribution {
    constructor(private min: number,
                private max: number) {
        super();
        if(min > max) {
            throw new Error("Min > Max value!");
        }
    }

    public getValue(): number {
        return Math.random() * (this.max - this.min) + this.min;
    }
}
