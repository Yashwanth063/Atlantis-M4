import { API_SERVER } from 'config/constant';
import { getMethod, postMethod, putMethod ,urls,postMethodfile} from 'utils/url/urls';
const person = localStorage.getItem('user');

export async function playgame(data) {
    try {
        const response = await fetch(`${API_SERVER}${urls.addPlayGame}`, postMethod(data));
        const result = await response.json();
        return result;
    } catch (err) {
      console.log('addgame Error:', err);
    }
  }
 
// vignesh 08-01-24
  export async function lastGame(gid,id) {
    try {
        const response = await fetch(`${API_SERVER}${urls.lastgame}/${gid}/${id}`, getMethod);
        const result = await response.json();
        return result;
    } catch (err) {
      console.log('addgame Error:', err);
    }
  }
  //