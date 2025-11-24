// Chakra imports
import {
  Portal,
  Box,
  useDisclosure,
  useColorModeValue, 
} from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin';
// Layout components
import Navbar from 'components/navbar/NavbarAdmin';
import Sidebar from 'components/sidebar/Sidebar';
import { SidebarContext } from 'contexts/SidebarContext';
import { useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import routes from 'routes';
import { ProtectedRoute } from 'ProtectedRoute';
import SuperAdminCompanyCreation from 'views/admin/superadmin/company/components/CompanyCreation';
import SuperAdminPlanCreation from 'views/admin/superadmin/plan/components/PlanCreation';
import SuperAdminPlanUpdation from 'views/admin/superadmin/plan/components/PlanUpdation';
import SuperAdminPlanNameUpdation from 'views/admin/superadmin/plan/components/PlanUpdationPlan';
import SuperAdminPlanDurationAdd from 'views/admin/superadmin/plan/components/PlanDurationAdd';
import SuperAdminCreatorCreation from 'views/admin/superadmin/creator/components/CreatorCreation';
import CreatorChangePassword from 'views/admin/superadmin/creator/components/ChangePassword';
import ProfileSetting from 'views/admin/creator/settings/index';
import SuperAdminIndustryCreation from 'views/admin/superadmin/industry/components/IndustryCreation';
import LearnerCreation from 'views/admin/superadmin/learner/components/learnerCreation';
// import GameCreation from 'views/admin/superadmin/game/components/GameCreation';
// import Fristpage from 'views/admin/superadmin/game/fristPage';
// import SecondPage from 'views/admin/superadmin/game/secondPage';
// import ListPreview from 'views/admin/superadmin/game/components/ListPreview';
import LearnerUpdation from 'views/admin/superadmin/learner/components/learnerUpdation';

/***************************Game Application******************************************* */
// import GamePlayArea from 'views/game/gamePlay/components/gamePlayArea';


// Custom Chakra theme
const usePath = () => {
  const location = useLocation();
  return location.pathname
}
export default function Dashboard(props: { [x: string]: any }) { 
  const { ...rest } = props;
  // states and functions
  const storage = JSON.parse(localStorage.getItem('user'));
  const path = usePath();
let role='' ;
if (!storage) {
  role= 'Admin'
}else{
  role =storage.data.role
}
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [mini, setMini] = useState(false); 
  const [hovered, setHovered] = useState(false);
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== '/admin/full-screen-maps';
  };
  const getActiveRoute = (routes: RoutesType[]): string => {
    let activeRoute = 'Default Brand Text';
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes: RoutesType[]): boolean => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].secondary;
        }
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((route: RoutesType, key: number) => {
     
      if (route.layout === '/game') {
        if (route.protected) {
          return (
            <>
             {/* <Route path='/play/:id' element={<GamePlayArea />} /> */}
              <Route key={key} element={<ProtectedRoute />}>
                <Route path={route.path} element={route.component} />
        {/* <Route path='/superadmin/game/creation' element={<GameCreation />} /> */}
        
        {/* <Route path='/play/:id' element={<GamePlayArea />} /> */}
                
        
               
                
                  
                
                  
                
 
               
               
              </Route>
            </>
          );
        }
        //
        return (
          <>
          {/* <Route path='game/play/:id' element={<GamePlayArea />} /> */}
          <Route path={`${route.path}`} element={route.component} key={key} />
          </>
        );
      }
      if (route.collapse) {
        return getRoutes(route.items);
      } else {
        return null;
      }
    });
  };
  console.log(mini);
  document.documentElement.dir = 'ltr';
  const { onOpen } = useDisclosure();
  const bg = useColorModeValue('background.100', 'background.900');
  return (
    <Box bg={bg} h="100vh" w="100vw"   border="2px slid black"
                    alignItems="flex-start"
                    m="0px">
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Sidebar
          hovered={hovered}
          setHovered={setHovered}
          mini={mini}
          routes={routes}
          // display="none"
          {...rest} 
        />
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={
            mini === false
              ? { base: '100%', xl: path.startsWith('/admin/superadmin/game/creation')||path.startsWith('/admin/superadmin/game/template')||path.startsWith('/admin/game/preview/') ? '100%':'calc( 100% - 290px )' }
              : mini === true && hovered === true
                ? { base: '100%', xl: 'calc( 100% - 290px )' }
                : { base: '100%', xl: 'calc( 100% - 120px )' }
          }
          
          maxWidth={
            mini === false
              ? { base: '100%', xl: path.startsWith('/admin/superadmin/game/creation')||path.startsWith('/admin/superadmin/game/template')||path.startsWith('/admin/game/preview/') ? '100%':'calc( 100% - 290px )' }
              : mini === true && hovered === true
                ? { base: '100%', xl: 'calc( 100% - 290px )' }
                : { base: '100%', xl: 'calc( 100% - 120px )' }
          }
          transition="all 1s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, 1s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease-in-out"
        >
          <Portal>
            <Box
            display={'block'}
            >
              <Navbar
                hovered={hovered}
                setMini={setMini}
                mini={mini}
                onOpen={onOpen}
                logoText={'Horizon UI Dashboard PRO'}
                brandText={getActiveRoute(routes)}
                secondary={getActiveNavbar(routes)}
                theme={props.theme}
                setTheme={props.setTheme}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal>

          {getRoute() ? (
            <Box
              mx="auto"
              p={{ base: '20px', md: '30px' }}
              pe="20px"
              minH="100vh"
              pt="50px"
              mt={'100px'}
            >
              <Routes>
                {getRoutes(routes)}
                
                <Route
                  path="/"
                  // element={<Navigate to="/admin/dashboards/default" replace />}
                  element={<Navigate to="/game/gamePlay" replace />}
                />
              </Routes>
            </Box>
          ) : null}
          <Box>
            <Footer />
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
