import { API_SERVER } from 'config/constant';
import { getMethod, postMethod, putMethod ,urls,postMethodfile,postVoice} from 'utils/url/urls';
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


export async function getAssignedGame(id){
    try{
        const response = await fetch(`${API_SERVER}${urls.getAssignedGames}${id}`,getMethod);
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log('getAssignedGame Error:', err.message);
      }
  }
export async function getLeaderboardData(id){
    try{
        const response = await fetch(`${API_SERVER}${urls.getLeaderboardData}${id}`,getMethod);
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
  // export async function updateLearnerDetails(LearnerDataString) {
  //   try {
  //     const response = await fetch(`${API_SERVER}${urls.updateLearnerDetails}`,putMethod(LearnerDataString));
  //     const result = await response.json(); 
  //     return result;
  //   } catch (err) {
  //     console.log('getCreator Error:', err);
  //   }
  // }
  export async function updateLearnerDetails(LearnerDataString) {
  try {
    const response = await fetch(
      `${API_SERVER}${urls.updateLearnerDetails}`,
      putMethod(LearnerDataString)
    );

    // Always try to parse JSON if backend responds
    const result = await response.json();

    // ✅ Distinguish between success and business error
    if (!response.ok) {
      // HTTP error (4xx/5xx)
      return { success: false, error: result.message || "Request failed" };
    }

    // If backend explicitly sends failure like "no rows were updated"
    if (result?.message && result.message.includes("no rows")) {
      return { success: false, error: result.message };
    }

    // ✅ Normal success
    return { success: true, data: result };
  } catch (err) {
    // This only runs for true network errors (already filtered by wrapper)
    console.error("updateLearnerDetails fetch/network error:", err);
    return { success: false, error: "Network error" };
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

  

  // export async function getVoices(id,data) {
  //   // try {
  //     const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${id}`,postVoice(data));
  //     const result = await response.json(); 
  //     console.log('result Error:', result);
  //     return result;
  //   // } catch (err) {
  //   //   console.log('getCreator Error:', err);
  //   // }
  // }
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
  export async function storeReflection(data){
    try{
        const response = await fetch(`${API_SERVER}${urls.storeReflection}`,postMethod(data));
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log('getBackgrounds Error:', err.message);
      }
  }

  export async function updateLearnerNickName(LearnerDataString) {
    try {
      const response = await fetch(`${API_SERVER}${urls.updateLearnerNickName}`,putMethod(LearnerDataString));
      const result = await response.json(); 
      return result;
    } catch (err) {
      console.log('getCreator Error:', err);
    }
  }