import { API_SERVER } from 'config/constant';
import { getMethod, postMethod, putMethod ,urls,postMethodfile} from 'utils/url/urls';
const person = localStorage.getItem('user');
const user = JSON.parse(person);



export async function changePassword(id,data) {
    try {
      const response = await fetch(`${API_SERVER}${urls.changePasswordLearner}${id}`,putMethod(data));
      const result = await response.json();
      return result;
    } catch (err) {
      console.log('getCreator Error:', err);
    }
  }

  export async function learnerLogin(data) {
    try {
      const response = await fetch(`${API_SERVER}${urls.learnerLogin}`,postMethod(data));
      const result = await response.json();
      return result;
    } catch (err) {
      console.log('getCreator Error:', err);
    }
  }
