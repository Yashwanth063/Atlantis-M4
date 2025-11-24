import './assets/css/App.css';
import './assets/css/ResponsiveApp.css';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {} from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';
import { useRef } from 'react';
import SignInDefault from '../src/views/auth/signIn/SignInDefault';
import { ChakraProvider } from '@chakra-ui/react';
import initialTheme from './theme/theme';
import { useState, useEffect } from 'react';
import SpecificTable from 'views/game/LearnerAnalytics/SpecificTable';
import GamePreview from './views/game/demoplay/GamePreview';
import SCORMComponent from './views/game/scormgameplay/SCORMComponent';
import ForgotPassword from 'views/auth/forgotPassword/ForgotPasswordDefault';
import MobileOnboarding from './MobileOnboarding';
import './utils/hooks/fetch-interceptor';
import OfflinePage from './OfflinePage';
import useOnlineStatus from '../src/utils/hooks/useOnlineStatus';
import Welcome from '../src/views/game/demoplay/playcards/welcome1'
import SomethingWentWrong from './SomethingWentWrong';
import ReflectionFutureTheme from '../src/views/game/demoplay/FutureTheme/ReflectionFutureTheme';

import {ColorProvider} from '../src/components/ui/ColorContext'
import Error from './error';
export default function Main() {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  const location = useLocation();
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();
  const lastOnlinePath = useRef(null);
  console.log('Current Path:', location.pathname);
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((reg) => console.log('Service Worker registered'))
        .catch((err) =>
          console.log('Service Worker registration failed:', err),
        );
    });
  }

  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Detect PWA install status
    const isIOS =
      /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as any).standalone === true;

    if (!isStandalone && (isIOS || isAndroid)) {
      setShowOnboarding(true);
    }
  }, []);

  useEffect(() => {
    if (!isOnline) {
      // Store the page user was on before going offline
      if (window.location.pathname !== '/offline') {
        lastOnlinePath.current = window.location.pathname;
      }
      navigate('/offline');
    } else {
      // If we come back online from /offline, go back to stored path
      if (window.location.pathname === '/offline') {
        navigate(lastOnlinePath.current || '/');
      }
    }
  }, [isOnline, navigate]);

  if (window.location.pathname !== '/error') {
    sessionStorage.setItem('lastPageBeforeError', window.location.pathname);
  }
  useEffect(() => {
    const navEntries = performance.getEntriesByType(
      'navigation',
    ) as PerformanceNavigationTiming[];
    const isPageReload = navEntries?.[0]?.type === 'reload';
    const isOnErrorPage = window.location.pathname === '/error';

    if (isOnErrorPage && isPageReload) {
      const lastPage = sessionStorage.getItem('lastPageBeforeError');
      navigate(lastPage && lastPage !== '/error' ? lastPage : '/admin', {
        replace: true,
      });
    }
  }, [navigate]);
  return (
    <ChakraProvider theme={currentTheme}>
      <ColorProvider>
       {showOnboarding ? (
        <MobileOnboarding />
      ) : (  
        <Routes>
          <Route path="/offline" element={<OfflinePage />} />
          {isOnline && (
            <>
              <Route path="/error" element={<Error />} />
              <Route path="login" element={<SignInDefault />} />
              <Route
                path="/play/:learner_game_play_id"
                element={<GamePreview />}
              />
              <Route path="/play-org/resource" element={<SCORMComponent />} />
              <Route path="/*" element={<AuthLayout />} />
              <Route
                path="game/*"
                element={
                  <AdminLayout
                    theme={currentTheme}
                    setTheme={setCurrentTheme}
                  />
                }
              />

              <Route
                path="rtl/*"
                element={
                  <RTLLayout theme={currentTheme} setTheme={setCurrentTheme} />
                }
              />
              <Route path="/" element={<Navigate to="/game" replace />} />
              <Route path="/specific/:id" element={<SpecificTable />} />
              <Route
                path="/learnerforgotPassword"
                element={<ForgotPassword />}
              />
              <Route
                path="/something-went-wrong"
                element={<SomethingWentWrong />}
              />
               <Route
              path="/welcome"
              element={<Welcome/>}
              />
              <Route path='/reflection' element ={<ReflectionFutureTheme />}/>
              
            </>
          )}
        </Routes>
   )} 
   </ColorProvider>
    </ChakraProvider>
  );
}
