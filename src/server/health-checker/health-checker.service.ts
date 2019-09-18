export class HealthCheckerService {

    constructor() {}

    public async healthCheck(): Promise<number[]> {
        return Promise.resolve([1]);
    }

}