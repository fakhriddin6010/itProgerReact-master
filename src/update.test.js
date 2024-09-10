import axios from 'axios';
import nock from 'nock'; // Nock kutubxonasini import qilamiz

it('should update a food item', async () => {
  const updatedFoodItem = {
    deviceId: '1',
    foodName: 'Banana',
    price: 12,
    quantity: 10,
    expirationDate: '2024-10-10',
    storageMethod: 'FRIDGE'
  };

  nock('http://172.17.185.237:8080')
    .put('/api/fooditems/1')
    .reply(200, { message: 'Food item updated!' });

  const response = await axios.put('http://172.17.185.237:8080/api/fooditems/1', updatedFoodItem);
  expect(response.status).toBe(200);
  expect(response.data).toEqual({ message: 'Food item updated!' });
});
