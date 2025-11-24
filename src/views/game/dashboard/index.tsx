// import React, { useEffect, useState } from 'react';
// import { Box, SimpleGrid, Text } from '@chakra-ui/react';
// // import { Bar, Pie } from 'react-chartjs-2'; // Import Pie component
// import axios from 'axios';
// import {getDashboard, getAssignedGame} from 'utils/gameApplication/gamePlayService';

// const LearnerDashboard = () => {
//   const { data, token } = JSON.parse(localStorage.getItem('user'));
//   const { id } = data;

//   const [gameData, setGameData] = useState([]);

//   //Afrith-modified-starts- 25,31/JULY/24
//   const [assignedGameData, setAssignedGameData] = useState([]);
//   const [gamesCompleted, setGamesCompleted] = useState([]);
//   //Afrith-modified-ends- 25,31/JULY/24

//   const [gameStateData, setGameStateData] = useState([]);
//   const [dashData, setDashData]   = useState<any>({
//     count : 0,
//     name : '',
//   });

//   useEffect(() => {
//     // Fetch data from your API endpoint
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://192.168.1.51:5556/gameplay/learnerdashboard');
//         const data = response.data;
//         setGameData(data.gameData);
//         setGameStateData(data.gameStateData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//     handleFetchDashboard()
//   }, []);

//   const handleFetchDashboard = async () => {
//     const response = await getDashboard();
//     const result = response?.data;
//     setDashData({...dashData, count: result?.gameCounts, name: result?.userDetails?.name, title: result?.gameTitle.join(', ')})
//     console.log('result',result)
//   }

//   // Sample data structure for Bar Chart
//   const learnersData = {
//     labels: gameData.map((item) => item.galGameId),
//     datasets: [
//       {
//         label: 'Number of Games',
//         data: gameData.map((item) => item.galLearnerId),
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         borderColor: 'rgba(75,192,192,1)',
//         borderWidth: 1,
//       },
//       // You can add more datasets based on the type of chart you want
//     ],
//   };

//   const chartOptions = {
//     scales: {
//       x: {
//         type: 'category',
//       },
//       y: {
//         beginAtZero: true,
//       },
//     },
//   } as const;

//   // Sample data structure for Pie Chart
//   const gameStateChartData = {
//     labels: ['Started', 'Completed', 'Replayed'],
//     datasets: [
//       {
//         data: [
//           gameStateData.filter((item) => item.galGameState === 'started').length,
//           gameStateData.filter((item) => item.galGameState === 'completed').length,
//           gameStateData.filter((item) => item.galGameState === 'replayed').length,
//         ],
//         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//         hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//       },
//     ],
//   };

//   //Afrith-modified-starts- 25,31/JULY/24
//   const fetchAssignedGame = async () => {
//     try {
//       const result = await getAssignedGame(id);
//       // Assuming data is nested under 'data' property

//       setAssignedGameData(result?.count);
//       setGamesCompleted(result?.gamesCompletedCount);
//       console.log('assignedGameCount--',result.count)
//     } catch (error) {
//       console.error('Error fetching assigned games:', error);
//     }
//   };

//   useEffect(() => {

//     fetchAssignedGame()
  
//   }, [])
  
//   //Afrith-modified-ends- 25,31/JULY/24


//   return (
//     <>
//       <SimpleGrid columns={2} spacing={4} mt="150px">
//         <Box p={4} borderWidth="1px" borderRadius="lg">
//           <Text fontSize="xl" mb={4}>
//             Learners Number of Games and Scores
//           </Text>
//           {/* <Bar data={learnersData} options={chartOptions} /> */}
//         </Box>

//         <Box p={4} borderWidth="1px" borderRadius="lg">
//           <Text fontSize="xl" mb={4}>
//             Game State Chart
//           </Text>
//           {/* <Pie data={gameStateChartData} /> Add Pie Chart component here */}
//         </Box>

//         {/* //Afrith-modified-starts- 25,31/JULY/24 */}
//           <Box p={4} borderWidth="1px" borderRadius="lg">
//             <Text fontSize="xl" mb={4}>
//               No.Of Games Assigned
//             </Text>
//             {assignedGameData}
//           </Box>

//           <Box p={4} borderWidth="1px" borderRadius="lg">
//             <Text fontSize="xl" mb={4}>
//               No.Of Games Completed
//             </Text>
//             {gamesCompleted}
//           </Box>
//         {/* //Afrith-modified-ends- 25,31/JULY/24 */}
//       </SimpleGrid>

//       {/* <Box className="App" mt={'100px'} p={'20px'}>
//           <header className="App-header">
//             <h1>Hello, Atlantis!</h1>
//             <Text>User Name: {data.name}</Text>
//             <Text>Game Count: {data.count}</Text>
//             <Text>Game Titles: {data.title}</Text>
//           </header>
//         </Box> */}
//     </>
//   );
// };

// export default LearnerDashboard;






import { Box, Icon, Select, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
// Assets
// Custom components
// import MiniStatistics from 'components/card/MiniStatistics';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import { MdCreate, MdGamepad, MdMoreTime, MdOutlineRocketLaunch } from 'react-icons/md';


import { FaBuildingColumns } from 'react-icons/fa6';


import React, { useEffect, useState } from 'react';
// import { Box, SimpleGrid, Text } from '@chakra-ui/react';
// import { Bar, Pie } from 'react-chartjs-2'; // Import Pie component
import axios from 'axios';
import {getDashboard, getAssignedGame} from 'utils/gameApplication/gamePlayService';
import { learnerDashboard } from 'utils/dashboard/dashboardService';

const LearnerDashboard = () => {
  const { data, token } = JSON.parse(localStorage.getItem('user'));
  const { id } = data;

  const [gameData, setGameData] = useState([]);
  const [details, setDetails] = useState({
    totalAssigned:0,
    completed:0,
    progress:0
  });
  //Afrith-modified-starts- 25,31/JULY/24
  const [assignedGameData, setAssignedGameData] = useState([]);
  const [gamesCompleted, setGamesCompleted] = useState([]);
  //Afrith-modified-ends- 25,31/JULY/24

  const [gameStateData, setGameStateData] = useState([]);
  const [dashData, setDashData]   = useState<any>({
    count : 0,
    name : '',
  });

  useEffect(() => {
    // Fetch data from your API endpoint
    const fetchData = async () => {
      try {
        const response = await learnerDashboard(id);
        if(response?.status !== "Success") return console.log('learner dashboard api error');
        const data = response?.data;
        setDetails(data);
        // setGameData(data?.gameData);
        // setGameStateData(data?.gameStateData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    handleFetchDashboard()    
  }, []);

  const handleFetchDashboard = async () => {
    const response = await getDashboard();
    const result = response?.data;
    setDashData({...dashData, count: result?.gameCounts, name: result?.userDetails?.name, title: result?.gameTitle.join(', ')})
    console.log('result',result)
  }

  // Sample data structure for Bar Chart
  // const learnersData = {
  //   labels: gameData.map((item) => item.galGameId),
  //   datasets: [
  //     {
  //       label: 'Number of Games',
  //       data: gameData.map((item) => item.galLearnerId),
  //       backgroundColor: 'rgba(75,192,192,0.2)',
  //       borderColor: 'rgba(75,192,192,1)',
  //       borderWidth: 1,
  //     },
  //     // You can add more datasets based on the type of chart you want
  //   ],
  // };

  // const chartOptions = {
  //   scales: {
  //     x: {
  //       type: 'category',
  //     },
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  // } as const;

  // Sample data structure for Pie Chart
  // const gameStateChartData = {
  //   labels: ['Started', 'Completed', 'Replayed'],
  //   datasets: [
  //     {
  //       data: [
  //         gameStateData.filter((item) => item.galGameState === 'started').length,
  //         gameStateData.filter((item) => item.galGameState === 'completed').length,
  //         gameStateData.filter((item) => item.galGameState === 'replayed').length,
  //       ],
  //       backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
  //       hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
  //     },
  //   ],
  // };

  //Afrith-modified-starts- 25,31/JULY/24
  const fetchAssignedGame = async () => {
    try {
      const result = await getAssignedGame(id);
      // Assuming data is nested under 'data' property

      setAssignedGameData(result?.count);
      setGamesCompleted(result?.gamesCompletedCount);
      console.log('assignedGameCount--',result.count)
    } catch (error) {
      console.error('Error fetching assigned games:', error);
    }
  };

  useEffect(() => {

    fetchAssignedGame()
  
  }, [])
  
  //Afrith-modified-ends- 25,31/JULY/24

  const brandColor = useColorModeValue('brand.500', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  return (
    <>
      {/* <SimpleGrid columns={2} spacing={4} mt="150px">
        <Box p={4} borderWidth="1px" borderRadius="lg">
          <Text fontSize="xl" mb={4}>
            Learners Number of Games and Scores
          </Text>
         
        </Box>

        <Box p={4} borderWidth="1px" borderRadius="lg">
          <Text fontSize="xl" mb={4}>
            Game State Chart
          </Text>
         
        </Box>

     
          <Box p={4} borderWidth="1px" borderRadius="lg">
            <Text fontSize="xl" mb={4}>
              No.Of Games Assigned
            </Text>
            {assignedGameData}
          </Box>

          <Box p={4} borderWidth="1px" borderRadius="lg">
            <Text fontSize="xl" mb={4}>
              No.Of Games Completed
            </Text>
            {gamesCompleted}
          </Box>
      
      </SimpleGrid> */}

<SimpleGrid columns={{ base: 1, md: 2, lg: 3, '2xl': 4 }} gap='20px' mb='20px'>
				<MiniStatistics
					startContent={
						<IconBox
							w='56px'
							h='56px'
							bg={boxBg}
							icon={<Icon w='32px' h='32px' as={FaBuildingColumns} color={brandColor} />}
						/>
					}
					name='Assigned Games' 
					value={details?.totalAssigned}
				/>
				<MiniStatistics
					startContent={
						<IconBox
							w='56px'
							h='56px'
							bg={boxBg}
							icon={<Icon w='32px' h='32px' as={MdCreate} color={brandColor} />}
						/>
					}
					name='Overall Completed'
					value={details?.completed}
				/>
				<MiniStatistics
					startContent={
						<IconBox
							w='56px'
							h='56px'
							bg={boxBg}
							icon={<Icon w='32px' h='32px' as={MdCreate} color={brandColor} />}
						/>
					}
					name='Progressed Rate'
					value={`${details?.progress} %`}
        />
        </SimpleGrid>

      

      {/* <Box className="App" mt={'100px'} p={'20px'}>
          <header className="App-header">
            <h1>Hello, Atlantis!</h1>
            <Text>User Name: {data.name}</Text>
            <Text>Game Count: {data.count}</Text>
            <Text>Game Titles: {data.title}</Text>
          </header>
        </Box> */}
    </>
  );
};

export default LearnerDashboard;