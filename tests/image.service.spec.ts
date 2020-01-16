import { ImageService } from '../src/module/image/image.service';
import mockingoose from 'mockingoose';
import { imageModel } from '../src/module/model/imageSchema';

const mockImage = {
    "hash": "abcdef",
    "filename": "test.jpg",
    "url": "http://localhost/test.jpg",
    "thumb": "abcdef"
} as any;

const finderMock = query => {
    return [mockImage];
};
const saveMock = query => {
    return [mockImage];
};

describe('Image Service', () => {
    let service: ImageService;

    beforeEach(() => {
        service = new ImageService();
        mockingoose(imageModel).toReturn(saveMock, 'save');
        mockingoose(imageModel).toReturn(finderMock, 'findOne');
    });

    describe('List operation cases', () => {
        it('should have instance service', () => {
            expect(service).toBeTruthy();
        });

        it('should test getAllImages', async () => {
            expect(await service.getAllImages('')).toBeTruthy();
        });

    })

})