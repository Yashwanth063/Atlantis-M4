import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { getlearnersGames } from 'utils/leaner/leaner';
import { useParams } from 'react-router-dom';
import Card from 'components/card/Card';

const SpecificTable = () => {
  const [learnerGames, setLearnerGames] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API
        const result = await getlearnersGames(id);

        if (!Array.isArray(result)) {
          setError('Unexpected response format. Expected an array.');
          return;
        }

        if (result.length === 0 || result.some((game) => !game.gameName)) {
          setError('No games found or invalid data structure.');
          return;
        }

        setLearnerGames(result);
      } catch (error) {
        console.error('Error during API call:', error);
        setError('An error occurred while fetching the data.');
      } finally {
        // Stop loading after data is fetched or error occurs
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchData();
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  return (
    <Card
      mb={{ base: '0px', xl: '20px' }}
      mt={'20px'}
      boxShadow={'1px 1px 12px #2e292914'}
      p={'10px 0'}
    >
      <Box
        padding="2px"
        borderRadius="13px 13px 20px 20px"
        maxHeight="400px"
        overflow="hidden"
      >
        {loading ? (
          <p>Loading data...</p> // Show loading state while fetching data
        ) : error ? (
          <>
            <h1
              style={{
                fontSize: 'xx-large',
                color: 'lightgray',
                textAlign: 'center',
              }}
            >
              No Data Available For This Game
            </h1>
          </>
        ) : (
          <Box overflowY="auto" maxHeight="300px" width={'100%'}>
            <Table variant="simple" size="sm" width="full">
              <Thead bg="#f9f9f9" position="sticky" top="0" zIndex="1">
                <Tr>
                  <Th>S.No</Th> {/* Serial Number column */}
                  <Th>Game</Th>
                  <Th>Assigned Date</Th>
                  <Th>Skill</Th>
                  <Th>Final Score (%)</Th>
                </Tr>
              </Thead>
              <Tbody fontSize="17px">
                {learnerGames.length > 0 ? (
                  learnerGames.map((game, index) => {
                    // Render the first row for the game, and then separate rows for each skill
                    return (
                      <React.Fragment key={index}>
                        {game.skills.map((skill: any, skillIndex: any) => {
                          // Prepare the score for the current skill
                          const score =
                            game.scores && game.scores[skillIndex]
                              ? game.scores[skillIndex].percentage // Get the percentage for the current skill
                              : 'N/A';

                          return (
                            <Tr
                              key={`${index}-${skillIndex}`}
                              borderBottom="2px solid #f7f7f7"
                            >
                              {skillIndex === 0 ? ( // Show details for the first skill row
                                <>
                                  <Td rowSpan={game.skills.length}>
                                    {index + 1}
                                  </Td>{' '}
                                  {/* Serial Number */}
                                  <Td rowSpan={game.skills.length}>
                                    {game.gameName}
                                  </Td>{' '}
                                  {/* Game Name */}
                                  <Td rowSpan={game.skills.length}>
                                    {new Date(
                                      game.assignedDate,
                                    ).toLocaleDateString()}
                                  </Td>{' '}
                                  {/* Assigned Date */}
                                  <Td>{skill}</Td> {/* Skill Name */}
                                  <Td>{score}</Td>{' '}
                                  {/* Show score for the current skill */}
                                </>
                              ) : (
                                <>
                                  <Td>{skill}</Td> {/* Skill Name */}
                                  <Td>{score}</Td>{' '}
                                  {/* Show score for the current skill */}
                                </>
                              )}
                            </Tr>
                          );
                        })}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <Tr>
                    <Td colSpan={5}>No data available</Td>{' '}
                    {/* If no data is available */}
                  </Tr>
                )}
              </Tbody>
            </Table>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default SpecificTable;
