import { API_SERVER } from 'config/constant';
import { getMethod, postMethod, putMethod ,urls,postMethodfile} from 'utils/url/urls';
const person = localStorage.getItem('user');
const user = JSON.parse(person);



export async function learnerListData(data) {
    try {
      const response = await fetch(`${API_SERVER}${urls.learnerListData}`, postMethod(data));
      const result = await response.json();
      return result;
    } catch (err) {
     throw err;
    }
  }
  export async function updatecohortsLearner(data) {
    try {
      const response = await fetch(`${API_SERVER}${urls.updatecohortsLearner}`, postMethod(data));
      const result = await response.json();
      return result;
    } catch (err) {
      throw err;
    }
  }
  export async function checkCohorts(id) {
    try {
      const response = await fetch(`${API_SERVER}${urls.checkCohorts}${id}`, getMethod);
      
      const result = await response.json();
      return result;
    }
    catch (err) {
      throw err;
    }
  }
   

export async function addcohorts(data) {
    try {
      const response = await fetch(`${API_SERVER}${urls.addcohorts}`, {
        method: 'POST',
        headers: {
          Authorization: user?.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      return result;
    } catch (err) {
      throw err;
    }
  }

export async function getcohortsPrint(id) {
    try {
      const response = await fetch(`${API_SERVER}${urls.getcohortsPrint}${id}`,getMethod);
      const result = await response.json(); 
      return result;
    } catch (err) {
      throw err;
    }
  }

  export async function updatecohortsgame(data) {
    try {
      const response = await fetch(`${API_SERVER}${urls.updatecohortsgame}`, postMethod(data));
      const result = await response.json();
      return result;
    } catch (err) {
    throw err;
    }
}
export async function gamesListData(data) {
    try {
      const response = await fetch(`${API_SERVER}${urls.gamesListData}`,postMethod(data));
      const result = await response.json(); 
      return result;
    } catch (err) {
     throw err;
    }
  }

 
  export async function updatecohorts(idv, data) {
    try {
      console.log('datacohort',data)
      const response = await fetch(`${API_SERVER}${urls.updatecohorts}${idv}`, putMethod(data));
      const result = await response.json();
      return result;
    }
    catch (err) {
      throw err;
    }
  }
 
  export async function cohortsLearnerAllDatas(id) {
    try {
      const response = await fetch(`${API_SERVER}${urls.cohortsLearnerAllDatas}${id}`, getMethod); // Add a slash before id
      const result = await response.json();
      return result;
    } catch (err) {
      throw err; // Rethrow the error to handle it in the caller function
    }
  }

  export async function reomvecohorts(id) {
    try {
      const response = await fetch(`${API_SERVER}${urls.reomvecohorts}${id}`, getMethod);
      const result = await response.json();
      return result;
    }
    catch (err) {
      throw err;
    }
  }
  export async function getcohorts(datas){
    try{  
          const response = await fetch(`${API_SERVER}${urls.getcohorts}`,postMethod(datas));
          const result = await response.json();
         return result;
        }
   catch (err) {
        throw err;
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
  

export async function getAllCohorts(datas){
  try{  
        const response = await fetch(`${API_SERVER}${urls.getAllCohorts}`,postMethod(datas));
        const result = await response.json();
       return result;
      }
 catch (err) {
      throw err;
  }
}

export async function removeassigneddata(id,datas){
  try{  
        const response = await fetch(`${API_SERVER}${urls.removeassigneddata}/${id}/${datas}`,getMethod);
        const result = await response.json();
       return result;
      }
 catch (err) {
        console.log('removeassigneddata Error:', err);
  }
}
export async function removeassignedGamedata(id,datas){
  try{  
        console.log('api entered into cohorts all');
        const response = await fetch(`${API_SERVER}${urls.removeassignedGamedata}/${id}/${datas}`,getMethod);
        const result = await response.json();
       return result;
      }
 catch (err) {
        console.log('removeassignedGamedata Error:', err);
  }
}
// Lokie Added
export async function getCompanyNames() {
  try {
    const response = await fetch(`${API_SERVER}${urls.getCompanyNames}`, getMethod);
    const result = await response.json();
    return result;
  }
  catch (err) {
    console.log('updatecohorts Error:', err);
  }
}

export async function getCreatorNames(data) {
  try {
    const response = await fetch(`${API_SERVER}${urls.getCreatorNames}`, postMethod(data));
    const result = await response.json();
    return result;
  }
  catch (err) {
    console.log('updatecohorts Error:', err);
  }
}
//for listing cohorts in assign page
export async function getCohortsPostMan(id){
  try{
      const response = await fetch(`${API_SERVER}${urls.getCohortsPostMan}${id}`,getMethod);
      const result = await response.json();
      return result;
  }
  catch (err) {
      console.log('editCompany Error:', err.message);
    }
}