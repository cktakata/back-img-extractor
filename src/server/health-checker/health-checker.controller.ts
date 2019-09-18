import { Controller, Get, Res, HttpStatus, ServiceUnavailableException } from '@nestjs/common';
import { Response } from 'express';
import { HealthCheckerService } from './health-checker.service';
import { HttpResponse } from '../../utils/http.response';
import { Status } from '../../utils/status.entity';

@Controller('health')
export class HealthCheckerController {
    constructor(private readonly _healthCheckerService: HealthCheckerService) {}

    @Get()
    public async healthCheck(@Res() res: Response): Promise<Response> {
        await this._healthCheckerService.healthCheck().catch(err => {
            throw new ServiceUnavailableException('Service is Unhealthy');
        });

        return res.status(HttpStatus.OK).json(
            new HttpResponse(new Status(0, 'Service is Healthy'), { message: 'Service is Healthy' }));
    }

}