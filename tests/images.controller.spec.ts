import { ImageController } from '../src/module/image/image.controller';
import { ImageService } from '../src/module/image/image.service';
import { Response } from 'express';

export const request = {
    get: () => { return { 'Authorization': 'test' } },
} as any;
export const response = {
    status: (status) => ({ json: () => null }),
} as Response;
const mockImage = {
    "hash": "abcdef",
    "filename": "test.jpg",
    "url": "http://localhost/test.jpg",
    "thumb": "abcdef"
} as any;

const mockService = {
    scrap: () => Promise.resolve({}),
}
describe('Image Controller', () => {
    let controller: ImageController;
    let service: ImageService;

    beforeEach(() => {
        service = mockService as any;
        controller = new ImageController(service);
    });

    describe('List operation cases', () => {
        it('should have instance controller', () => {
            expect(controller).toBeTruthy();
        });

        it('should test scrap', () => {
            expect(() => {
                controller.scrap(response, {} as any);
            }).not.toThrow();
        });
    });

});