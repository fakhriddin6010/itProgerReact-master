import axios from 'axios';
import nock from 'nock';

describe('Food API - Delete Food Item', () => {
  it('should delete a food item', async () => {
    const foodId = 1;

    // Mock API response with nock
    nock('http://172.17.185.237:8080')
      .delete(`/api/fooditems/${foodId}`)
      .reply(200, { message: 'Food item deleted!' });

    // Make API request with axios
    const response = await axios.delete(`http://172.17.185.237:8080/api/fooditems/${foodId}`);

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('Food item deleted!');
  });
});
