import React, { useState, useEffect } from 'react';

import LearnerAnalyticsCreation from './LearnerAnalyticsCreation';

import Popup from 'components/alerts/Popup';
import OnToast from 'components/alerts/toast';
import { Switch } from '@chakra-ui/react';
import { HashLoader } from 'react-spinners';
import { getLearnerAnalytics } from 'utils/leaner/leaner';
interface LearnerActivityData {
  sNo: number;

  gameTitle: string;
  createdDate: any;

  started: any;
  completed: any;
  progress: any;

  finalScore: any;

  Timespend: any;
}

interface RowObj {
  sNo: number;

  gameTitle: string;
  createdDate: any;

  started: any;
  completed: any;
  progress: any;

  finalScore: any;

  Timespend: any;
}

interface LearnerActivityDataTableProps {
  data: RowObj[];
}

const CreatorCreation: React.FC = () => {
  const storage = JSON.parse(localStorage.getItem('user'));

  const UserRole = storage.data.role;
  const [apiData, setApiData] = useState<LearnerActivityData[]>([]);
  const [gameNames, setGames] = useState([]);
  const [cohorts, setcohort] = useState([]);
  const [loading, setLoading] = useState(true);
  const [companyNames, setCompany] = useState([]);
  const [alert, setAlert] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [msg, setMsg] = useState<string>('');
  const [toastStatus, setToastStatus] = useState<string>('');
  const [isToggled, setIsToggled] = useState(false);

  const fetchData = async () => {
    setLoadingdata(true);

    try {
      const lenUser = { lenUserName: storage?.data?.name };
      const data = JSON.stringify(lenUser);
      const resultfromlearners = await getLearnerAnalytics(data);
      if (resultfromlearners?.status !== 'Success') {
        setLoadingdata(false);
        return;
      }

      const dataArray = Array.isArray(resultfromlearners.data)
        ? resultfromlearners.data
        : Object.values(resultfromlearners.data);

      const transformedData = dataArray.map((item: any, index: number) => {
        // Ensure finalScore is an object with both playedScore and percentage
        const finalScore = item.finalScore || {};
        const playedScore = finalScore.playedScore || '0';
        const percentage = finalScore.percentage || '0%';

        return {
          sNo: index + 1,
          lenUserName: item.lenUserName || '',
          lenMail: item.lenMail || '',
          cpCompanyName: item.cpCompanyName || '',
          ctName: item.ctName || '',
          gameTitle: item.gameTitle || '',
          createdDate: item.createdDate || '',
          cohortName: item.cohortName || '',
          started: item.started || 'Not-Yet',
          completed: item.completed || 'Inprogress',
          progress: item.progress || '0%',
          // Use both playedScore and percentage, depending on the toggle
          originalScore: isToggled ? playedScore : percentage,
          finalScore: item.finalScore, // You can switch this logic as per your requirement
          Improvement: item.Improvement || '0%',
          QuestReplay: item.QuestReplay || '0',
          Timespend: item.timeSpent || '0:00',
          Lastactive: item.lastActive || '0:00',
          playedScore, // Add both playedScore and percentage in the transformed data
          percentage,
        };
      });
      setApiData(
        resultfromlearners?.data.map((item: any) => ({
          ...item,
          sNo: item.sNo,
          lenUserName: item.lenUserName,
          lenMail: item.lenMail,
          cpCompanyName: item.cpCompanyName,
          ctName: item.ctName,
          gameTitle: item.gameTitle,
          createdDate: item.createdDate,
          cohortName: item.cohortName,
          started: item.started,
          completed: item.completed,
          progress: item.progress,
          // progress: `${Math.round(item.progress ?? 0 * 100)}%`,
          // progress: `${Math.round((item.progress ?? 0) * 100)}%`,

          // originalScore: item.originalScore,
          originalScore: isToggled
            ? item.originalScore.playedScore
            : item.originalScore.percentage,

          finalScore: item.finalScore,

          Improvement: item.Improvement,
          QuestReplay: item.QuestReplay,
          Timespend: item.Timespend,
          Lastactive: item.Lastactive,
        })),
      ); // Update state with transformed data
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingdata(false);
    }
  };

  const [formData, setFormData] = useState({
    lenStatus: '',
  });
  const [openCoharts, setOpenCoharts] = useState(false);
  const [openGame, setOpenGame] = useState(false);
  const [learnerId, setLearnerId] = useState<number | null>(null);
  const [loadingdata, setLoadingdata] = useState(false);

  const transformData = (apiData: any) => {
    const dataArray = Array.isArray(apiData)
      ? apiData
      : apiData.rows || Object.values(apiData);

    if (!Array.isArray(dataArray)) {
      return [];
    }

    return dataArray.map((data, index) => ({
      ...data,
      sNo: index + 1,
      lenUserName: data.lenUserName ?? '',
      lenMail: data.lenMail ?? '',
      cpCompanyName: data.cpCompanyName ?? '',
      ctName: data.ctName ?? '',
      gameTitle: data.gameTitle ?? '',
      createdDate: data.createdDate ?? '',
      cohortName: data.cohortName ?? '',
      started: data.started ?? 'Not-Yet',
      completed: data.completed ?? 'Inprogress',
      progress: `${(data.progress ?? 0) * 100}%`,
      // // progress: `${Math.round((data.progress ?? 0) * 100)}%`,
      //  progress: `${Math.round(Number(data.progress || 0) * 100)}%`,

      originalScore: isToggled
        ? data.originalScore.playedScore
        : data.originalScore.percentage,

      finalScore: isToggled
        ? data.finalScore?.playedScore
        : data.finalScore?.percentage,

      Improvement: data.Improvement ?? '0%',
      QuestReplay: data.QuestReplay ?? '0',
      Timespend: data.timeSpent ?? '0:00',
      Lastactive: data.lastActive ?? '0:00',
    }));
  };

  const transformedData: RowObj[] = transformData(apiData);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loadingdata && (
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

      <LearnerAnalyticsCreation
        data={transformedData}
        setApiData={setApiData}
        setCompany={setCompany}
        setGames={setGames}
        setcohort={setcohort}
        apiData={apiData}
        isToggled={isToggled}
        setIsToggled={setIsToggled}
      />

      {isOpen ? (
        <Popup
          setIsConfirm={setIsConfirm}
          setIsOpen={setIsOpen}
          msg={''}
          setmsg={''}
        />
      ) : null}
      {alert ? (
        <OnToast msg={msg} status={toastStatus} setAlert={setAlert} />
      ) : null}
    </>
  );
};

export default CreatorCreation;
