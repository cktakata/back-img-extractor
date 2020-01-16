import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { ImageService } from '../image/image.service';
import { async } from 'q';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() wss: Server;
    private logger: Logger = new Logger('AppGateway');

    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: string): void {
        console.log('handleMessage');
        try {
            if (payload['url']) {
                console.log(payload['url']);
                console.log('Instantiating service');
                const service = new ImageService;
                service.getAllImages(payload['url']).then(data => {
                    this.wss.emit('msgToClient', data);
                })
            }
        } catch (e) {
            this.wss.emit('msgToClient', e);
        }
    }

    afterInit(server: Server) {
        console.log('afterInit');
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
        console.log('handleDisconnect');
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log('handleConnection');
        client.emit('connection', 'Successfully connected to websocket');
        this.logger.log(`Client connected: ${client.id}`);
    }
}