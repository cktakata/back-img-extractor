import { HealthCheckerService } from '../src/server/health-checker/health-checker.service';

describe('HealthCheck Service', () => {
    let service: HealthCheckerService;

    beforeEach(() => {
        service = new HealthCheckerService();
    });

    describe('List operation cases', () => {
        it('should have instance service', () => {
            expect(service).toBeTruthy();
        });

        it('should test healthCheck', () => {
            expect(() => {
                service.healthCheck();
            }).not.toThrow();
        });
    })
});