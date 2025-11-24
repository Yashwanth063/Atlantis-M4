import { API_SERVER } from 'config/constant';
import { getMethod, postMethod, putMethod ,urls,postMethodfile,postVoice} from 'utils/scormurl/scormurl';
const person = localStorage.getItem('user');
const user = JSON.parse(person);

  export async function scormactivityUpdate(data,id){
    try{
        const response = await fetch(`${API_SERVER}${urls.scormactivityUpdate}${id}`,putMethod(data));
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log('getBackgrounds Error:', err.message);
      }
  }
  export async function activityAfterUpdate(data,id){
    try{
        const response = await fetch(`${API_SERVER}${urls.scormactivityUpdate}${id}`,putMethod(data));
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log('getBackgrounds Error:', err.message);
      }
  }

  export async function scormactivityCreate(data){
    try{
        const response = await fetch(`${API_SERVER}${urls.scormactivityCreate}`,postMethod(data));
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log('getBackgrounds Error:', err.message);
      }
  }
  //Priya-modified-starts 15.04.2024
  export async function scormcreateGamePlayHistory(data){
    try{
        const response = await fetch(`${API_SERVER}${urls.scormcreateGamePlayHistory}`,postMethod(data));
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log('getBackgrounds Error:', err.message);
      }
  }
  export async function scormactivitygetlastblock(data){
    try{
        const response = await fetch(`${API_SERVER}${urls.scormactivitygetlastblock}`,postMethod(data));
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log('getBackgrounds Error:', err.message);
      }
  }
  export async function getGamePlayHistory(data){
    try{
        const response = await fetch(`${API_SERVER}${urls.getGamePlayHistory}`,postMethod(data));
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log('getBackgrounds Error:', err.message);
      }
  }
  //-modified-ends

 ///Afrith-modified-starts-08/Apr/24,09/Apr/24
export async function getGameAvgScore(id){
  try {
    const response = await fetch(`${API_SERVER}${urls.getGameAvgScore}/${id}`,getMethod);
    const result = await response.json(); 
    return result;
  } catch (err) {
    console.log('getGameAvgScore Error:', err);
  }
}

export async function getGameOverallQuestScore(id){
  try {
    const response = await fetch(`${API_SERVER}${urls.getGameOverallQuestScore}/${id}`,getMethod);
    const result = await response.json(); 
    return result;
  } catch (err) {
    console.log('getGameAvgScore Error:', err);
  }
}
///Afrith-modified-ends-08/Apr/24,09/Apr/24

///Afrith-modified-starts-22/Apr/24
export async function getGameActId(id){
  try {
    const response = await fetch(`${API_SERVER}${urls.getGameActId}/${id}`,getMethod);
    const result = await response.json(); 
    return result;
  } catch (err) {
    console.log('getGameActId Error:', err);
  }
}
///Afrith-modified-ends-22/Apr/24

  ///////////////////// /*(*/
  export async function getGameStatus(id) {
    try {
      const response = await fetch(`${API_SERVER}${urls.gameStatus}/${id}`, getMethod);
      const result = await response.json();
      return result;
    } catch (err) {
      console.log('game status Error:', err.message);
    }
  }
  
  export async function getAllLearnerAnalytics(data) {
    try {
      const response = await fetch(`${API_SERVER}${urls.getAllLearnerAnalytics}`, getMethod(data));
      const result = await response.json();
      return result;
    } catch (err) {
      console.log('getCreator Error:', err);
    }
} 

  export async function specificLearners(data) {
    try {
      const response = await fetch(`${API_SERVER}${urls.specificLearners}`, postMethod(data));
      const result = await response.json();
      return result;
    } catch (err) {
      console.log('getCreator Error:', err);
    }
}
export async function learnerdashboard() {
  try {
    console.log("Fetching games from the API..."); // Log when the fetch starts

    const response = await fetch(`${API_SERVER}${urls.learnerdashboard}`, getMethod);
  
    const result = await response.json();
    console.log("Games fetched successfully:", result); // Log the successful result

    return result;
  } catch (err) {
    console.error("Error occurred while fetching games:", err); // Log any errors that occur
   
  }
}

export async function getGameList() {
  try {
    console.log("Fetching games from the API..."); // Log when the fetch starts

    const response = await fetch(`${API_SERVER}${urls.getGameList}`, getMethod);
    
    if (!response.ok) {
      console.error("Failed to fetch games. Status:", response.status); // Log the status if the response is not ok
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Games fetched successfully:", result); // Log the successful result

    return result;
  } catch (err) {
    console.error("Error occurred while fetching games:", err); // Log any errors that occur
   
  }
}

export async function getcohortslist() {
  try {
    console.log("Fetching games from the API..."); // Log when the fetch starts

    const response = await fetch(`${API_SERVER}${urls.getcohortslist}`, getMethod);
    
    if (!response.ok) {
      console.error("Failed to fetch games. Status:", response.status); // Log the status if the response is not ok
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("cohorts fetched successfully:", result); // Log the successful result

    return result;
  } catch (err) {
    console.error("Error occurred while fetching games:", err); // Log any errors that occur
   
  }
}

export async function getLearnerFilter() {
  try {
    const response = await fetch(`${API_SERVER}${urls.getLearnerFilter}`, getMethod);
    const result = await response.json();
    return result;
  } catch (err) {
    throw err;
  }
}

export async function scormgetTimespent(data) {
  try {
    const response = await fetch(`${API_SERVER}${urls.scormgetTimespent}`, postMethod(data));
    const result = await response.json();
    return result;
  } catch (err) {
    throw err;
   }
} 
  ///////////////////// /*)*/