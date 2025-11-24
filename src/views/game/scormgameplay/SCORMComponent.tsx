import React, { useEffect, useRef, useState, } from 'react';

import { initializeSCORM, terminateSCORM, getLearnerDetails } from './scorm_intialization';
import { useLocation, useParams } from 'react-router-dom';
import { API_SERVER } from 'config/constant';
import {getScorm,track_Api} from 'utils/scormGameControl/scormgamecontrol';
import GamePreview from './GamePreview';

const SCORMGameComponent = () => {
    const [ScormGame, setScormGame] = useState(null);
    const [error, setError] = useState<string | null>(null);
    const { params }:any = useParams();

    const location = useLocation();
//     const searchParams = new URLSearchParams(params);
// const parsedParams = Object.fromEntries(searchParams.entries());
// console.log("parsedParams",parsedParams);
   

console.log("parsedParams-Raw URL Search Params:", location.search)
  
    useEffect(() => {
      
 
      const fetchRegistrations = async () => {
          try {
            
              
            // const token = 'Scormclouds';
            // const urlWithParams = new URL(`${API_SERVER}/resource`);
            // console.log('params1=>',JSON.parse(params))
            // console.log('location=>',location)
            // // console.log('params=>parsedParams', parsedParams);
            // // console.log('params=>decodedParams', decodedParams);
            // console.log('params=>', params);
            const urlParams = new URLSearchParams(location.search);
            const encodedData = urlParams.keys().next().value; // Get the encoded JSON string
            const decodedData = decodeURIComponent(encodedData); // Decode the JSON string
            const parsedParams = JSON.parse(decodedData); // Convert to an object
           
            console.log("Parsed Params:", parsedParams);
            console.log('location=>',location)
            console.log('params=>parsedParams', parsedParams);
            const response = await getScorm(JSON.stringify(parsedParams));
            console.log('response=>',response)
              // const response = await fetch(urlWithParams);  // Fetch data from your backend
              console.log('response.status=>',response.status)
              if (response.status === 'Success') {
                 if(response.data)
                 {
                    setScormGame(response.data);
                 }
              }
              else if(response.status === 'warning')
              {
                setError(response.message);
                // throw new Error(response.message);
              }
              else{
                setError('Something went wrong');
                // throw new Error('Something went wrong');
                console.error("error-1",error);
              }
            //   const data = await response.json();
            //   setScormGame(data);
          } catch (error: any) {
              setError('Failed to fetch registrations.');
              console.error("error-2",error);
          }
      };
 fetchRegistrations();


      // const track_Ap_fetch = async () => {
      //     try {
      //       // const token = 'Scormclouds';
      //       // const urlWithParams = new URL(`${API_SERVER}/resource`);
      //       console.log('params=>',params)
      //       const response = await track_Api(params);
      //       console.log('response=>',response)
      //         // const response = await fetch(urlWithParams);  // Fetch data from your backend
      //         console.log('response.status=>',response.status)
      //         if (response.status === 'Success') {
      //            if(response.data)
      //            {
      //               setScormGame(response.data);
      //            }
      //         }
      //         else if(response.status === 'warning')
      //         {
      //           setError(response.message);
      //           // throw new Error(response.message);
      //         }
      //         else{
      //           setError('Something went wrong');
      //           // throw new Error('Something went wrong');
      //         }
      //       //   const data = await response.json();
      //       //   setScormGame(data);
      //     } catch (error: any) {
      //         setError('Failed to fetch registrations.');
      //         console.error(error);
      //     }
      // };
      // track_Ap_fetch();
     
  }, []);
  console.log('ScormGame=>',ScormGame);
    return (
        <div>
           {error && <p style={{ color: 'red' }}>{error}</p>}
            {ScormGame ? (
                <GamePreview ScormGame={ScormGame}/>
            ) : (
                <p>Loading learner details...</p>
            )}
        </div>
    );
};

export default SCORMGameComponent;
