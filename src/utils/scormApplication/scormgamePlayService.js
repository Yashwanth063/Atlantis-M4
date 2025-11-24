import { API_SERVER } from 'config/constant';
import { getMethod, postMethod, putMethod ,urls,postMethodfile,postVoice} from 'utils/scormurl/scormurl';
const person = localStorage.getItem('user');
const user = JSON.parse(person);

export async function addgame(data) {
  try {
    const person = localStorage.getItem('user');
    const user = JSON.parse(person);    
    const response = await fetch(`${API_SERVER}${urls.addgame}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: user?.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json(); 
    return result;
  } catch (err) {
    console.log('addgame Error:', err); 
  }
} 
export async function getPreview(id) {
  try {
    const response = await fetch(`${API_SERVER}${urls.getpreview}${id}`,getMethod);
    const result = await response.json(); 
    return result;
  } catch (err) {
    console.log('getPreview Error:', err);
  }
}
export async function getAllGame(data,type) {
  try {
    const response = await fetch(`${API_SERVER}${urls.gameList}${type}`,putMethod(data));
    const result = await response.json(); 
    return result;
  } catch (err) {
    console.log('getAllGame Error:', err);
  }
}

export async function getImages(id){
    try { 
        const response = await fetch(`${API_SERVER}${urls.getImages}${id}`,getMethod);
        const result = await response.json();
        return result;
      }
    catch (err) {
        console.log('getImages Error:', err.message);
      }
}


export async function getscormAssignedGame(id,learnerId){
    try{
        const response = await fetch(`${API_SERVER}${urls.getscormAssignedGame}${id}/${learnerId}`,getMethod);
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log('getscormAssignedGame Error:', err.message);
      }
  }
export async function getscormLeaderboardData(id,learnerid){
    try{
        const response = await fetch(`${API_SERVER}${urls.getscormLeaderboardData}${id}/${learnerid}`,getMethod);
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log('getAssignedGame Error:', err.message);
      }
  }
  export async function overallScoreDetails(id){
    try{
        const response = await fetch(`${API_SERVER}${urls.overallScoreDetails}${id}`,getMethod);
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log('getScrore Error:', err.message);
      }
  }
  export async function getBackgrounds(){
    try{
        const response = await fetch(`${API_SERVER}${urls.getBackgrounds}`,getMethod);
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log('getBackgrounds Error:', err.message);
      }
  }
   
  export async function getGamePlay(id,selectLanguageId){
    try{
        const response = await fetch(`${API_SERVER}${urls.getgameplay}${id}/${selectLanguageId}`,getMethod);
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log('getBackgrounds Error:', err.message);
      }
  }
  export async function PlayerGamePlayDetails(id,selectedLanguages){
    try{
        const response = await fetch(`${API_SERVER}${urls.playergamePlay}${id}/${selectedLanguages}`,getMethod);
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log('getBackgrounds Error:', err.message);
      }
  }
  export async function scormupdateLearnerDetails(LearnerDataString) {
    try {
      const response = await fetch(`${API_SERVER}${urls.scormupdateLearnerDetails}`,putMethod(LearnerDataString));
      const result = await response.json(); 
      return result;
    } catch (err) {
      console.log('getCreator Error:', err);
    }
  }
  export async function updatescormdetails(data) {
    try {
      // const response = await fetch(`${API_SERVER}${urls.updatescormdetails}/${data}`,getMethod);
      const response = await fetch(`${API_SERVER}${urls.updatescormdetails}`,postMethod(data));
      const result = await response.json(); 
      return result;
    } catch (err) {
      console.log('getCreator Error:', err);
    }
  }



  export async function profileUpdate(data){
    try{
        const response = await fetch(`${API_SERVER}${urls.gameprofileUpdate}`,postMethod(data));
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log('getBackgrounds Error:', err.message);
      }
  }

  

  export async function getVoices(id,data) {
    // try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${id}`,postVoice(data));
      const result = await response.json(); 
      console.log('result Error:', result);
      return result;
    // } catch (err) {
    //   console.log('getCreator Error:', err);
    // }
  }
  export async function getLeaderBoard(id){
    try{
        const response = await fetch(`${API_SERVER}${urls.getleaderboard}${id}`,getMethod);
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log('getBackgrounds Error:', err.message);
      }
  }

  export async function getDashboard() {
    try {
      const response = await fetch(`${API_SERVER}${urls.gameDashboard}`, getMethod);
      const result = await response.json();
      return result;
    }
    catch (err) {
      console.log('dashboard Error:', err.message);
    }
  }
  export async function scormstoreReflection(data){
    try{
        const response = await fetch(`${API_SERVER}${urls.scormstoreReflection}`,postMethod(data));
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log('getBackgrounds Error:', err.message);
      }
  }

  export async function scormupdateLearnerNickName(LearnerDataString) {
    try {
      const response = await fetch(`${API_SERVER}${urls.scormupdateLearnerNickName}`,putMethod(LearnerDataString));
      const result = await response.json(); 
      return result;
    } catch (err) {
      console.log('getCreator Error:', err);
    }
  }