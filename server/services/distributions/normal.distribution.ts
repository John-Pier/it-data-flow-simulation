import {AbstractDistribution} from "./abstract.distribution";

export class NormalDistribution extends AbstractDistribution {
    private readonly tryingCount = 100;
    private readonly precisionCount = 12;

    constructor(private expectedValue: number,
                private variance: number) {
        super();
    }

    public getValue(): number {
        let i = 0;
        while (i < this.tryingCount)
        {
            let sum = 0;
            for (let j = 0; j <= this.precisionCount; j++)
            {
                sum += Math.random();
            }
            let value = this.expectedValue + this.variance * (sum - 6);
            if (value > 0) {
                return value;
            }
            i++;
        }

        return this.expectedValue;
    }
}
