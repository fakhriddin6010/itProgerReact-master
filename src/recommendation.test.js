import axios from 'axios';
import nock from 'nock';

describe('Recipe API - Recommend Menu Based on Ingredients', () => {
  it('should recommend menu based on fridge ingredients', async () => {
    const deviceId = 1234;
    const ingredients = 'onion,carrot';

    // Mock API response with nock
    nock('http://172.17.185.237:8080')
      .get(`/api/recipes/recommendation/${deviceId}`)
      .query({ ingredients })
      .reply(200, ['볶음밥', '스프']);

    // Make API request with axios
    const response = await axios.get(`http://172.17.185.237:8080/api/recipes/recommendation/${deviceId}`, {
      params: { ingredients }
    });

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.data).toEqual(['볶음밥', '스프']);
  });
});
