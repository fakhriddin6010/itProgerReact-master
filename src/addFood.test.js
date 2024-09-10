import axios from 'axios';
import nock from 'nock';

describe('Food API - Add Food Item', () => {
  it('should add a food item', async () => {
    // Mock API response with nock
    nock('http://172.17.185.237:8080')
      .post('/api/fooditems', {
        name: 'Apple',
        quantity: 5,
        storageMethod: 'fridge',
        expirationDate: '2024-10-10'
      })
      .reply(200, { message: 'Food item added!' });

    // Make API request with axios
    const response = await axios.post('http://172.17.185.237:8080/api/fooditems', {
      name: 'Apple',
      quantity: 5,
      storageMethod: 'fridge',
      expirationDate: '2024-10-10'
    });

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('Food item added!');
  });
});
