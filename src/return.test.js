import axios from 'axios';
import nock from 'nock'; // Nock kutubxonasini import qilamiz

it('should return popular recipes', async () => {
  nock('http://172.17.185.237:8080')
    .get('/api/recipes/popular')
    .reply(200, ['김치찌개', '불고기', '비빔밥']);

  const response = await axios.get('http://172.17.185.237:8080/api/recipes/popular');
  expect(response.status).toBe(200);
  expect(response.data).toEqual(['김치찌개', '불고기', '비빔밥']);
});
