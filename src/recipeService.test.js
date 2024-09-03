const axios = require('axios');
const nock = require('nock');

describe('Food Items API Tests', () => {
    const baseURL = 'http://localhost:8080';  // Test uchun localhost ishlatiladi

    beforeAll(() => {
        nock(baseURL)
            .get('/fooditems/1')
            .reply(200, [{ id: 1, foodName: 'Apple', price: 10 }]);

        nock(baseURL)
            .post('/fooditems')
            .reply(200, 2);
    });

    it('should fetch all food items', async () => {
        const deviceId = 1; 
        const response = await axios.get(`${baseURL}/fooditems/${deviceId}`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
    });

    it('should add a food item', async () => {
        const newFoodItem = {
            deviceId: '1',
            foodName: 'Apple',
            price: 10,
            quantity: 5,
            expirationDate: '2024-09-30',
            storageMethod: 'REFRIGERATOR'
        };
        const response = await axios.post(`${baseURL}/fooditems`, newFoodItem);
        expect(response.status).toBe(200);
        expect(response.data).toBe(2);
    });
});
