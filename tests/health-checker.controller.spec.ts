import { HealthCheckerController } from '../src/server/health-checker/health-checker.controller';
import { Response } from 'express';
import { HealthCheckerService } from '../src/server/health-checker/health-checker.service';

const mockService = {
    healthCheck: () => Promise.resolve({}),
}
export const response = {
    status: (status) => ({json: () => null}),
} as Response;

describe('HealthCheck Controller', () => {
    let controller: HealthCheckerController;
    let service: HealthCheckerService;

    beforeEach(() => {
        service = mockService as any;
        controller = new HealthCheckerController(service);
    });

    describe('List operation cases', () => {
        it('should have instance controller', () => {
            expect(controller).toBeTruthy();
        });

        it('should test healthCheck', () => {
            expect(() => {
                controller.healthCheck(response);
            }).not.toThrow();
        });
    })
});