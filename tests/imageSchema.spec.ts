import { imageModel } from '../src/module/model/imageSchema';
import mockingoose from 'mockingoose';

describe('image Schema test', () => {
    it('should initialize', async () => {
        const mockImage = {
            "hash": "abcdef",
            "filename": "test.jpg",
            "url": "http://localhost/test.jpg",
            "thumb": "abcdef"
        }
        const checker = new imageModel(mockImage);
        mockingoose(imageModel).toReturn({}, 'save');
        await checker.save();
    });
})