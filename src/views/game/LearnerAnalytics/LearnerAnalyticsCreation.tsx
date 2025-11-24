import React, { useEffect, useState } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  TableInstance,
} from 'react-table';
import { HashLoader } from 'react-spinners';
import { Navigate, useNavigate } from 'react-router-dom';
import SelectField from 'components/fields/SelectField';
// Chakra imports
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Box,
  Button,
  SimpleGrid,
  Tooltip,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { getCompanyList, getSelectCreator } from 'utils/creator/creator';
// import {getgames} from "utils/game/gameService";
import { getPlanName } from 'utils/plan/plan';
import {
  getAllLearnerAnalytics,
  getLearnerFilter,
} from 'utils/gameApplication/gameActivityService';
import { getLearnerAnalytics } from 'utils/leaner/leaner';
import { getGameList } from 'utils/gameApplication/gameActivityService';
import { getcohortslist } from 'utils/gameApplication/gameActivityService';
import { formToJSON } from 'axios';
import { SearchIcon } from '@chakra-ui/icons';
import InputField from 'components/fields/InputField';
import ToggleSwitch from './ToggleSwitch';
import {
  IconButton,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { identity } from 'lodash';

interface LearnerActivityData {
  sNo: number;

  gameId: number;
  gameTitle: string;
  createdDate: any;

  started: any;
  completed: any;
  progress: any;

  finalScore: any;
}
type RowObj = {
  sNo: number;

  gameId: number;
  gameTitle: string;
  createdDate: any;

  started: any;
  completed: any;
  progress: any;

  finalScore: any;
};

interface OptionType {
  value: string;
  label: string;
}
interface ColumnObj {
  Header: number | string;
  accessor: keyof RowObj;
}
interface planType {
  plPlan: string;
  plId: string;
  // other properties if any
}
type DataCol = TableInstance<RowObj>;
interface CustomLearnerDataTableProps {
  data?: any[];
  setApiData?: (data: any[]) => void;
  setCompany?: any;
  apiData?: any;
  company?: any;
  setGames?: any;
  setcohort?: any;
  isToggled: any;
  setIsToggled: any;
}

const LearnerAnalyticsCreation: React.FC<CustomLearnerDataTableProps> = ({
  data,
  setApiData,
  setCompany,
  // setgamename,
  company,
  apiData,
  setGames,
  setcohort,
  isToggled,
  setIsToggled,
}) => {
  const storage = JSON.parse(localStorage.getItem('user'));

  let storageCreatorId = '';
  const UserRole = storage.data.role;
  if (storage.data.role === 'Creator') {
    storageCreatorId = storage.data.id;
  }
  let storagelenNameId = '';
  const UserRolee = storage.data.role;
  if (storage.data.role === 'Creator') {
    storagelenNameId = storage.data.id;
  }
  const [loading, setLoading] = useState(true);
  const [lastPage, setLastPage] = useState<any>();
  const [AllLearners, setAllLearners] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const [creatorOptions, setCreatorOptions] = useState([]);
  // const [gamename,setGameName] = useState([])
  const [selected, setSelected] = useState({
    companyId: '',
    creatorId: '',
    lenUserName: '',
    galGameId: '',
    cohortId: '',
    date: '',
  });

  const [filteredCreators, setFilteredCreators] = useState([]);
  const [filteredGameOptions, setFilteredGameOptions] = useState([]);
  // setFilteredCreators(creator.data);
  const [creators, setCreators] = useState([]);
  const [GameOptions, setGameOptions] = useState([]);
  const [cohortOption, setCohortOption] = useState([]);
  const [cohorts, setCohorts] = useState([]);

  const navigate = useNavigate();
  const searchIconColor = useColorModeValue('gray.700', 'white');
  let menuBg = useColorModeValue('white', 'navy.800');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
  );
  interface OptionTypecon {
    value: string;
    label: string;
    CompanyId: string;
    lenUserName: string;
    galGameId: string;
    cohortId: string;
  }
  const handleNavigate = () => {
    navigate('creation');
  };
  const galGameIds = apiData.map((data: any) => data?.galGameId ?? ''); // Defaulting if undefined

  const gameTitles = apiData.map((data: any) => data?.gameTitle ?? ''); // Defaulting if undefined

  // const [gameNames, setGameNames] = useState<string[]>([]);
  const [selectedGame, setSelectedGame] = useState<string>('');

  interface GameOption {
    value: string;
    label: string;
  }

  const cohortIds = apiData.map((data: any) => data.cohortId ?? ''); // Defaulting if undefined

  interface CohortsData {
    cohortName: string;
    cohortId: any;
  }

  const cohortNames = apiData.map((data: any) => data.cohortName ?? ''); // Defaulting if undefined

  const [selectedCohorts, setSelectedCohorts] = useState<string>('');

  interface CohortOption {
    value: string;
    label: string;
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected({
      ...selected,
      date: event.target.value,
    });
  };

  const columns: ColumnObj[] = React.useMemo(() => {
    let userRoleColumns: ColumnObj[] = [];

    userRoleColumns = [
      { Header: 'sNo', accessor: 'sNo' },

      { Header: 'GameTitle', accessor: 'gameTitle' },
      { Header: 'AssignedDate', accessor: 'createdDate' },

      { Header: 'Started', accessor: 'started' },
      { Header: 'Completed', accessor: 'completed' },

      { Header: 'FinalScore', accessor: 'finalScore' },

      { Header: 'progress', accessor: 'progress' },
    ];

    return userRoleColumns;
  }, [UserRole]);

  const colum: ColumnObj[] = React.useMemo(() => {
    let userRoleColumns: ColumnObj[] = [];

    userRoleColumns = [
      { Header: 'sNo', accessor: 'sNo' },

      { Header: 'GameTitle', accessor: 'gameTitle' },
      { Header: 'AssignedDate', accessor: 'createdDate' },

      { Header: 'FinalScore', accessor: 'finalScore' },

      // { Header: 'Skills', accessor: 'Skills' },
    ];

    return userRoleColumns;
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
    gotoPage,
    setPageSize,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  }: DataCol = useTable<RowObj>(
    {
      columns,
      data: data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );
  const mappedPlanOptions = Array.isArray(creators)
    ? creators.map((creators) => ({
        value: creators.plId,
        label: creators.plPlan,
      }))
    : [];
  useEffect(() => {
    const lastPage = Math.floor(data.length / pageSize);
    setLastPage(Math.floor(data.length / pageSize));
  }, []);

  const totalPages = Math.ceil(data.length / pageSize);

  const handleGoPage = (pageNumber: number) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      gotoPage(pageNumber);
    } else {
    }
  };

  const getPageNumbers = () => {
    const pageCount = 3;
    const currentPage = pageIndex + 1;
    const pages = [];

    if (totalPages <= pageCount) {
      // Display all pages if total pages are less than or equal to the page count
      for (let i = 0; i < totalPages; i++) {
        pages.push(i + 1);
      }
    } else {
      const start = Math.max(1, currentPage - Math.floor(pageCount / 2));
      const end = Math.min(totalPages, start + pageCount - 1);

      if (start > 1) {
        pages.push(1, '...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages) {
        pages.push('...', totalPages);
      }
    }

    return pages;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const AllLearner = await getLearnerFilter();

        setAllLearners(AllLearner.data);
        if (AllLearner?.status !== 'Success') return;

        // Check if user role is 'AllLearner'
        if (UserRole === 'AllLearner') {
          const selectAllLearnerData: OptionTypecon[] = AllLearner?.data || [];
          const foundItem = selectAllLearnerData.find(
            (item) => item.value === storagelenNameId,
          );
          setSelected({ ...selected, lenUserName: foundItem?.lenUserName });
        }

        const company = await getCompanyList();
        setCompanyOptions(company?.data);
        setCompany(company?.data);
        if (company?.status !== 'Success') return;

        const game = await getGameList();

        if (game?.status !== 'Success') return;

        setGameOptions(game?.data);
        setGames(game?.data);

        const cohort = await getcohortslist();

        if (cohort?.status !== 'Success') return;

        setCohortOption(cohort?.data);
        setcohort(cohort?.data);

        const creator = await getSelectCreator(); // Replace with your actual function to get plan names

        if (creator?.status !== 'Success') return;

        setCreatorOptions(creator.data);
        setCreators(creator.data);

        // Set default values based on user role
        if (UserRole === 'Creator') {
          const selectCreatorData: OptionTypecon[] = creator?.data || [];
          const foundCompany = selectCreatorData.find(
            (item) => item.value === storageCreatorId,
          );

          // Populate the selected state with company and creator details
          if (foundCompany) {
            setSelected({
              ...selected,
              companyId: foundCompany.CompanyId,
              creatorId: foundCompany.value,
            });
          }
        }
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Fetch data as before...

    if (UserRole === 'Admin' || UserRole === 'Creator') {
      const initialFiltered = UserRole === 'Creator' ? creators : [];
      setFilteredCreators(initialFiltered);
    }
  }, [UserRole, creators]);

  useEffect(() => {}, [GameOptions]);

  useEffect(() => {
    // Check if GameOptions contains data
    if (!GameOptions || GameOptions.length === 0) {
      return;
    }

    if (selected.creatorId) {
      const filteredGames = GameOptions.filter(
        (game) => game.creatorId === selected.creatorId,
      );
      setFilteredGameOptions(filteredGames);
    } else {
      setFilteredGameOptions(GameOptions);
    }
  }, [selected.creatorId, GameOptions]);

  const handleGameChange = (selectedOption: OptionTypecon | null) => {
    setSelected({
      ...selected,
      galGameId: selectedOption.value,
    });
  };
  const handleCohortsChange = (selectedOption: OptionTypecon | null) => {
    setSelected({
      ...selected,
      cohortId: selectedOption?.value,
      companyId: selected.companyId,
    });
  };

  const handleCompanyChange = (selectedOption: OptionTypecon | null) => {
    setSelected({
      ...selected,
      companyId: selectedOption.value,
      creatorId: '',
      galGameId: '',
      cohortId: '',
    });
  };

  const handleCreatorIdChange = (selectedOption: OptionTypecon | null) => {
    if (selectedOption) {
      setSelected({
        ...selected,
        creatorId: selectedOption.value,
        companyId: selectedOption.CompanyId,
        galGameId: '', // Reset gameId when a new creator is selected
      });
    } else {
      setSelected({
        ...selected,
        creatorId: '',
        galGameId: '', // Reset gameId when no creator is selected
      });
    }
  };
  const handleLeanerIdChange = (selectedOption: OptionType | null) => {
    setSelected({
      ...selected,

      lenUserName: selectedOption.value,
    });
  };

  const handleCohortChange = (selectedOption: OptionType | null) => {
    setSelected({ ...selected, cohortId: selectedOption?.value });
  };

  const handleClick = async () => {
    let data = JSON.stringify({
      ...selected,
      galGameId: selected.galGameId,
      cohortId: selected.cohortId,
    });

    try {
      setLoading(true); // Start loading
      const result = await getLearnerAnalytics(data);
  
console.log(result,'resultingame')
      if (result?.status !== 'Success') {
        setApiData([]);
      } else {
        setApiData(
          
          result?.data.map((item: any) => ({
        
            ...item,
            sNo: item.sNo,
            gameId: item.gameId,
            lenUserName: item.lenUserName,
            lenMail: item.lenMail,
            cpCompanyName: item.cpCompanyName,
            ctName: item.ctName,
            gameTitle: item.gameTitle,
            createdDate: item.createdDate,
            cohortName: item.cohortName,
            started: item.started,
            completed: item.completed,
            progress: item.progress ?? 0,
              // progress: Array.isArray(item.progress) ? item.progress[0] ?? 0 : item.progress ?? 0, 
            // progress: Number(item.progress) || 0,

            originalScore: item.originalScore,
            finalScore: item.finalScore,
            Improvement: item.Improvement,
            QuestReplay: item.QuestReplay,
            Timespend: item.Timespend,
            Lastactive: item.Lastactive,
          })),
        );
      }
    } catch (err) {
      console.error('Error fetching learner analytics:', err);
    } finally {
      setLoading(false); // Always stop loading (on both success and error)
    }
  };

  useEffect(() => {
    handleClick();
  }, [
    selected.companyId,
    selected.creatorId,
    selected.lenUserName,
    selected.galGameId,
    selected.cohortId,
    selected.date,
    isToggled,
  ]);

  const handleSpecfic = (id: any) => {
    if (!id) return;
    setShowTable(true); // This line is not needed if you're opening in a new window
    window.open(window.location.origin + `/specific/${id}`, '_blank');
  };

  return (
    <>
      {/* <Box mb={{ base: '0px', md: '100px', xl: '100px' }}></Box> */}
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(10px)',
          }}
        >
          <HashLoader color="#3b38e0" />
        </div>
      )}

      <Flex
        justifyContent={{
          base: 'center',
          sm: 'flex-end',
          md: 'flex-end',
          lg: 'flex-end',
        }}
        align={'center'}
        mb={'10px'}
        p={'20px 0'}
      >
        <Flex
          w={{ sm: '100%', md: 'auto' }}
          alignItems="center"
          flexDirection={{ xs: 'column', sm: 'row', md: 'row', lg: 'row' }}
          bg={menuBg}
          flexWrap={{ base: 'wrap', md: 'nowrap' }}
          p="10px"
          borderRadius="20px"
          boxShadow={shadow}
        >
          <InputGroup w={{ base: '100%', sm: '100%', md: '200px' }}>
            <InputLeftElement
              children={
                <IconButton
                  aria-label="search"
                  bg="inherit"
                  borderRadius="inherit"
                  _active={{
                    bg: 'inherit',
                    transform: 'none',
                    borderColor: 'transparent',
                  }}
                  _hover={{
                    background: 'none',
                  }}
                  _focus={{
                    background: 'none',
                    boxShadow: 'none',
                  }}
                  icon={
                    <SearchIcon color={searchIconColor} w="15px" h="15px" />
                  }
                />
              }
            />
            <Input
              type="text"
              placeholder="Search..."
              value={globalFilter || ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              bg={'#f9f9f9'}
              borderRadius={'14px'}
              w={{ base: '100%', sm: '100%', xl: '300px' }}
            />
          </InputGroup>
        </Flex>
      </Flex>
      <ToggleSwitch isToggled={isToggled} setIsToggled={setIsToggled} />
      <Card
        mb={{ base: '0px', xl: '20px' }}
        mt={'20px'}
        boxShadow={'1px 1px 12px #2e292914'}
        p={'10px 0'}
      >
        <Box
          // overflowX={{ sm: 'scroll', xl: 'scroll' }}
          padding="2px"
          borderRadius={'13px 13px 20px 20px'}
        >
          {/* <div style={{ overflowX: 'auto', position: 'relative' }}> */}
          <div style={{ width: '100%', overflow: 'auto' }}>
            <Table {...getTableProps()}>
              <Thead className="thead" bg={'#f9f9f9'}>
                {headerGroups.map((headerGroup) => (
                  <Tr
                    {...headerGroup.getHeaderGroupProps()}
                    borderBottom={'2px solid #f7f7f7'}
                  >
                    {headerGroup.headers.map((column, index) => (
                      <Th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps(),
                        )}
                      >
                        {column.render('Header')}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? ' 🔽'
                              : ' 🔼'
                            : ''}
                        </span>
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()} fontSize={'17px'}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <Tr
                      {...row.getRowProps()}
                      borderBottom={'2px solid #f7f7f7'}
                    >
                      {row.cells.map((cell, index) => {
                        return (
                          <Td
                            {...cell.getCellProps()}
                            cursor={
                              cell.column.id === 'gameId'
                                ? 'pointer'
                                : 'default'
                            } // ## Add pointer cursor for gameId column
                          >
                            {cell.render('Cell')}
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </div>
        </Box>
        <Box
          p={'20px 5px'}
          display={{ base: 'block', xl: 'flex' }}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Box mb={5}>
            <Box mr={'10px'} color={'#000'}>
              <span style={{ color: '#20212396' }}>
                Page{' '}
                <span>
                  {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
                </span>{' '}
              </span>
            </Box>
          </Box>
          <Box display={{ base: 'flex', xl: 'flex' }}>
            <Box mr={'10px'} display={'flex'} alignItems={'center'}>
              <Button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                bg={'#f3f0f0'}
                mr={'5px'}
                h={'40px'}
                w={'40px'}
                borderRadius="50%"
                lineHeight="1em"
                flexShrink={0}
                fontWeight={800}
              >
                {'<'}
              </Button>{' '}
              {getPageNumbers().map((page, index) => (
                <Button
                  key={index}
                  mr={'5px'}
                  h={'40px'}
                  w={'40px'}
                  borderRadius="100px"
                  lineHeight="1em"
                  flexShrink={0}
                  fontWeight={800}
                  background={pageIndex + 1 === page ? '#3311db' : 'unset'}
                  color={pageIndex + 1 === page ? '#fff' : 'unset'}
                  onClick={() =>
                    typeof page === 'number' ? handleGoPage(page - 1) : null
                  }
                >
                  {page}
                </Button>
              ))}
              <Button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                bg={'#f3f0f0'}
                h={'40px'}
                w={'40px'}
                borderRadius="100px"
                lineHeight="1em"
                flexShrink={0}
                fontWeight={800}
              >
                {'>'}
              </Button>{' '}
            </Box>
            <Box></Box>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default LearnerAnalyticsCreation;
