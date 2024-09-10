import axios from 'axios';
import nock from 'nock';

describe('Food API - Update Food Item', () => {
  it('should update a food item', async () => {
    const foodId = 1;
    const updatedFoodItem = {
      name: 'Banana',
      quantity: 10,
      storageMethod: 'room',
      expirationDate: '2024-11-11'
    };

    // Mock API response with nock
    nock('http://172.17.185.237:8080')
      .put(`/api/fooditems/${foodId}`, updatedFoodItem)
      .reply(200, { message: 'Food item updated!' });

    // Make API request with axios
    const response = await axios.put(`http://172.17.185.237:8080/api/fooditems/${foodId}`, updatedFoodItem);

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('Food item updated!');
  });
});
