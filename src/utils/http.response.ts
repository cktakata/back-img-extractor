import { Status } from './status.entity';
export class HttpResponse {

    public return: Status;
    public data: any;

    constructor(status: Status, data?: any) {
        this.return = status;
        if (data) this.data = data;
    }
}