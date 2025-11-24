export const urls = {
  adminLogin: '/admin/login',
  logoutAuto: '/admin/logoutAuto',
  noofCompany: '/dashboard/noofcompany',
  noOfGames: '/dashboard/noOfGames',
  noOfLeaners: '/dashboard/noOfLeaners',
  noOfCreators: '/dashboard/noOfCreators',
  addgameassetbackground: '/gameassets/background/add',
  updategameassetbackground: '/gameassets/background/update',
  getgamebackgroundasset: '/gameassets/background/getAll',
  getgameassetimage: '/gameassets/getassets',
  deletegameassetbackground: '/gameassets/background/delete',

  addgameassetwelcome: '/gameassets/welcome/add',
  getgameWelcomeasset: '/gameassets/welcome/getAll',
  updategameassetwelcome: '/gameassets/welcome/update',
  deletegameassetwelcome: '/gameassets/welcome/delete',


  addgameassetthankyou: '/gameassets/thankyou/add',
  getgamethankyouasset: '/gameassets/thankyou/getAll',
  updategameassetthankyou: '/gameassets/thankyou/update',
  deletegameassetthankyou: '/gameassets/thankyou/delete',

 
  addgameassetbadge: '/gameassets/badge/add',
  getgamebadgeasset: '/gameassets/badge/getAll',
  updategameassetbadge: '/gameassets/badge/update',
  deletegameassetbadge: '/gameassets/badge/delete',

  addgameassetreflection: '/gameassets/reflection/add',
  getgamereflectionasset: '/gameassets/reflection/getAll',
  updategameassetreflection: '/gameassets/reflection/update',
  deletegameassetreflection: '/gameassets/reflection/delete',

  addgameassetcompletion: '/gameassets/completion/add',
  getgamecompletionasset: '/gameassets/completion/getAll',
  updategameassetcompletion: '/gameassets/completion/update',
  deletegameassetcompletion: '/gameassets/completion/delete',

  addgameassetleaderboard: '/gameassets/leaderboard/add',
  getgameleaderboardasset: '/gameassets/leaderboard/getAll',
  updategameassetleaderboard: '/gameassets/leaderboard/update',
  deletegameassetleaderboard: '/gameassets/leaderboard/delete',


  addgameassettakeaway: '/gameassets/takeaway/add',
  getgametakeawayasset: '/gameassets/takeaway/getAll',
  updategameassettakeaway: '/gameassets/takeaway/update',
  deletegameassettakeaway: '/gameassets/takeaway/delete',



  addgameassetaudio: '/gameassets/audios/add',
  getaddgameaudio: '/gameassets/audios/getAll',
  deleteaddgameassetaudio: '/gameassets/audios/delete',
  updategameassetaudio: '/gameassets/audios/update',
  /*********companies***************** */
  createCopmany: '/companies/create',
  getCompany: '/companies/getCompany/',
  editCompany: '/companies/updateCompany/',
  getCompanies: '/companies/getAllCompany',
  removeCompany: '/companies/removeCompany/',
  getCompanyList: '/companies/getCompanyList',
  getGameList:"/game/getGameList",
  companystatus: '/companies/updateStatus/',
  /*******************country*********************** */
  getCountries: '/country/getAllCountries',
  /*********************creator************************** */
  updateCreator: '/creator/updatecreator/',
  addCreator: '/creator/addcreator',
  getAllCreator: '/creator/getCreator',
  getCreator: '/creator/getCreator/',
  deletecreator: '/creator/deletecreator/',
  getSelectCreator: '/creator/selectcreator',
  updatePassword: '/creator/updatepassword/',
  emailchecker: '/creator/emailvalidator',
  createstatus: '/creator/updatestatus/',
  changePassword: '/creator/changepassword/',
  checkPasswordset:'/creator/checkPasswordset',
  /*****************plan************************* */
  updateplan: '/plan/updateplan/',
  createplan: '/plan/createplan',
  getPlanById: '/plan/getPlanById/',
  deleteplanName: '/plan/deleteplan/',
  // getplan: '/plan/getplan',
  getPlanName: '/plan/getPlanName',
  /*******************subscription************************* */
  getplan: '/subscription/getSubscriptionPlan',
  deleteplan: '/subscription/deletePlanValidity/',
  createSubscription: '/subscription/createplansubscription',
  updateSubscription: '/subscription/updateplansubscription/',
  getSubscriptionPlanById: '/subscription/getSubscriptionPlanById/',
  getSubscriptionPlanById1: '/subscription/getSubscriptionPlanById1/',
  // getSubscriptionPlan:'/subscription/getSubscriptionPlan',
  getPlanType: '/subscription/getPlanType/',
  checkvalidity:'/subscription/checkvalidity',//4.11

  /*********************learner************************************** */

  addLearner: '/learner/addlearner',
  getLearner: '/learner/getlearner',
  getLearnerById: '/learner/getlearnerById/',
  updateLearner: '/learner/updatelearner/',
  deleteLearner: '/learner/deletelearner/',
  learnerStatus: '/learner/learnerstatus/',
  getAllLearner: '/learner/getAllLearner/',
  /*********************cohorts***************************** */
  getcohortslist:'/cohorts/getcohortslist',
  addcohorts: '/cohorts/addcohorts',
  getcohorts: '/cohorts/getcohorts',
  updatecohorts: '/cohorts/update/',
  checkCohorts: '/cohorts/check/',
  reomvecohorts: '/cohorts/reomve/',
  getAllCohorts: '/cohorts/getAllCohorts',
  getSelectCohortsNames: '/cohorts/getSelectCohortsNames',
  getCohortsByCreatorId: '/cohorts/getCohortsByCreatorId/',
  removeassigneddata:'/cohorts/removeassigneddata',
  removeassignedGamedata:'/cohorts/removeassignedGamedata',
  // Lokie Add
  getCompanyNames:'/cohorts/getCompanyNames',
  getCreatorNames:'/cohorts/getCreatorNames',
  //assign page 6/8/24
  getCohortsPostMan:'/cohorts/getCohortsPostMan/',
  // getcohortsPrint:'/cohorts/getcohortsDetails/',
  // cohortsLearnerAllDatas:'/cohorts/cohortsLearnerDatas/',  
  /*******************mail**************************** */
  learnerMail: '/mail/learnerAdded/',
  /**************gameassign******************** */
  createAssign: '/gameassign/create',
  getselectedgame: '/gameassign/getselectgameassign/',
  createAssign: '/gameassign/create',
  getselectedgame: '/gameassign/getselectgameassign/',
  
  /************************category******************************** */
  createCategory: '/category/create',
  getallcategory: '/category/getAllCategory',
  updateCategory: '/category/updateCategory/',
  removeCategory: '/category/removeCategory/',
  getCategory: '/category/getCategory/',
  getCategoryList: '/category/getCategoryList',
  CategoryDataGet: '/category/CategoryDataGet',
  // vb 03.01.2024
  categorystatus: '/category/updatecatStatus/',
  // vb 03.01.2024
  /*****************animation********************************** */
  getImages: '/animation/getBackground/',
  getPlayer: '/animation/getPlayer',
  getNonPlayer: '/animation/getNonplayer',
  /*******************industry****************************** */
  addIndustry: '/industry/addIndustry',
  updateIndustry: '/industry/updateIndustry/',
  deleteIndustry: '/industry/deleteIndustry/',
  getIndustry: '/industry/getIndustry',
  getIndustryById: '/industry/getIndustryById/',
  getIndustryName: '/industry/getIndustryName',
  industrystatus: '/industry/updateStatus/',
  /*****************planvalidity*************************** */

  creatPlanValidity: '/planvalidity/creatPlanValidity',
  getEndDateById: '/planvalidity/getEndDateById/',
  getPlanValidity: '/planvalidity/getPlanValidity',
  getValidityPeriod: '/planvalidity/getValidityPeriod',
  getEndDate: '/planvalidity/getEndDate/',
  updatePlanValidity: '/planvalidity/updatePlanValidity/',
  getPlanTypeInCreator: '/planvalidity/getPlanTypeInCreator/',
  /*************************getLocation************************* */
  geoLocation: '/getLocation/geoLocation',
  /*************************completion********************************** */
  bulkComplete: '/completion/bulkCreate',
  /*****************game******************************* */
  getGameById: '/game/getGameById/',
  creategameAssign: '/gameassign/create',
  updateGame: '/game/updateGame/',
  gameList: '/game/getAllgame/',
  addgame: '/game/addgame',
  countByStage: '/game/countByStage',
  getScorm: '/scormdetails/getScorm',
  gameduplicate: '/game/gameduplicate/',
  gamelaunch: '/game/gamelaunch/',
  gameassign: '/game/gameassign/',
  gamepublic: '/game/gamepublic/',
  gamedelete: '/game/gameDelete/',
  gameassignlist: '/game/gameassignlist/',
  getSkills: '/skills/getSkills',
    getSkillsName: '/game/getSkillsName',
  createSkill: '/skills/create/',
  createCategories: '/skills/addcategory/',
  defaultcat: '/game/defaultcat/',
  defaultskill: '/game/defaultskill/',
  createReflection: '/question/createreflection',
  getReflection: '/question/getReflection/',
  storyInsterting: '/game/stroy/',
  getStory: '/game/getstroy/',
  gameBlocks: '/game/getBlocks/',
  listStory: '/game/liststroy/',
  gettemplategames: '/game/gettemplategame/',
  gameviewhistory: '/game/viewhistory/',
  opentemplate: '/game/opentemplate/',
  sentFeedMails: '/game/feedback',
  deletequest: '/game/deletequest/',
  completionscreen: '/game/completionscreen/',
  getTotalMinofWords: '/game/getTotalMinofWords/',
  Compliupdate: '/game/Compliupdate/',
  

  /*********************Previous Data Stored ************************ */
  updatePreviewlogs: '/preview/logs',
  BlockModifiedLog: '/preview/blocklog',

  /****************************Scorm ********************************/
  generateScorm: '/scorm/generateScorm/',
  createScormConfig: '/scorm/createScormConfig/',
  updateScormConfig: '/scorm/updateScormConfig/',
  getScormConfig: '/scorm/getScormConfig/',

  /****************************upload Badge ********************************/
  uploadBadge: '/game/uploadbadge/',
  uploadAudio: '/game/uploadaudio/',
  getBadge: '/game/getbadge/',
  getpreview: '/game/preview/',
  getAudio: '/game/getaudio/',
  entireQuestion: '/game/duplicate/question/',
  creatorBlocks: '/game/creator/blocks/',
  getStoryValidtion: '/game/getStoryValidtion/',

  languages: '/languages/getlanguages',
  // Lokie Add 12/06/2024
  getOldLanguages: '/languages/getOldLanguages',
  getCreatedLanguages: '/languages/getcreatedlanguages',
  updatelanguages: '/languages/updatelanguages',
  /* gamelanuages rajesh kanna */
  gameLanguages: '/languages/getGameLanguages/',
  /*Afrith-mdofied-starts-20/Mar/24*/
  getContentRelatedLanguage: '/languages/getContentRelatedLanguage/',
  /*Afrith-mdofied-ends-20/Mar/24*/
  getMaxBlockQuestNo: '/game/getMaxBlockQuestNo/',
  getBlockData: '/languages/getBlockData/',
  getGameStoryLine: '/languages/getGameStoryLine/',
  getQuestionOptionsText: '/languages/getQuestionOptionsText/',
  getQuestionResponse: '/languages/getQuestionResponse/',
  getQuestionOptions: '/languages/getQuestionOptions/',
  getSelectedLanguages: '/languages/getSelectedLanguages/',

  //nivetha added 1
  getLanguagescount: '/languages/getlanguagecount',
  storyEngAudio: '/languages/storyEngAudio/', //Afrith-modified-10/May/24
  StoryInteractionAudio: '/languages/storyInteractionAudio/', //Afrith-modified-11/May/24
  storyModGameContentLang: '/languages/storyModGameContentLang/', //Afrith-modified-11/May/24
  gameOverviewGameContentLang: '/languages/gameOverviewGameContentLang/', //Afrith-modified-14/May/24
  gameVoicegenaration: '/languages/GameVoicegenaration/',
  /****************************Reviews ********************************/
  addReviews: '/gamereview/addreviewers',
  getAllReviews: '/gamereview/getblockreviewlist/',
  addReadStatus: '/gamereview/readStatus', //........readstatus update api... ,
  updateReadStatusforalert:'/gamereview/updateReadStatusforalert',
  countofReviews:'/gamereview/countofReviews',
  /******** Game Demo with review ******/
  getGameDemoData: '/game/tryout/',
  addGameReview: "/gamereview/addblockreview",
  ReviewerStatus: "/gamereview/addreviewerStatus",
  testAudios: '/game/audioTest',
  getGameCreatorPreview: '/game/creator/demo/',
  getGameplayDetails:'/gameplay/getgameplaydetails/',
  // ********added for m4 thank you new start***********
  insertGameFedback:'/gamePlay/insertGameFedback',
  getAnimations:'/gamePlay/getAnimations',
  getTimespent: '/activity/getTimespent',
    // ********added for m4 thank you new end***********
  /*****************previewlog table get a reocred*************************/
  getPreviewLogsData: '/preview/priviewlogs',
  /*********************creatoractivity************************** */
  createactivitystatus: '/activityc/createactivitystatus',
  /*********************activity************************** */
  getGameWiseData: '/activity/getGameWiseData',
  getSkillWiseScore: '/activity/getSkillWiseScore/',
  getGameAnswer: '/activity/answer/',
  gamesListData: '/activity/gamesListData/',
  updatecohortsgame: '/activity/updatecohortsgame',
  updatecohortsLearner: '/activity/updatecohortsLearner',
  getLearnerFilter: '/activity/getLearnerFilter',
  // getAssignedGames: '/activity/getAssignedGames/',
  getBlocklWiseScore: '/activity/getBlocklWiseScore',
  learnerListData: '/activity/learnerListData/',
  GameCompleteList: '/activity/getGameCompleteList/',
  getAllLearners: '/activity/getAllLearners',
  getGamesList: '/activity/getGamesList/',
  getLearnerData: '/activity/getLearnerData/',
  getCreatorName: '/activity/getCreatorName',
  getcohortsPrint: '/activity/getcohortsDetails/',
  cohortsLearnerAllDatas: '/activity/cohortsLearnerDatas/',
  GameWiseCompletePrint: '/activity/GameWiseCompletePrint/',
  GameWiseStartedPrint: '/activity/GameWiseStartedPrint/',
  getGameAssignData: '/activity/getGameAssignData/',
  getGameSpecific:'/game/specification',
  getValidityDifference: '/dashboard/getValidityDifference',
  getlearnerSpecifics: '/activity/learnerSpecifics',

  getlearnersGames:'/learner/getlearnersGames/',
  resetLearnerPassword:'/learner/resetLearnerPassword',
  forgotLearnerPassword:'/learner/forgotLearnerPassword',
learnerLogin :'/gameUser/login',
changePasswordLearner: '/gameUser/changepassword/',
getAssignedGames: '/gamePlay/getAssignedGames/',
getLeaderboardData: '/gamePlay/getLeaderboardData/',
overallScoreDetails: '/gamePlay/overallScoreDetails/',
getgameplay: '/gamePlay/getgameplay/',
playergamePlay: '/gamePlay/playergamePlay/',
getleaderboard:'/gamePlay/getleaderboard/',
gameprofileUpdate: '/gamePlay/updateprofile',
updateLearnerDetails: '/gamePlay/updateLearnerDetails',
updateLearnerNickName: '/gamePlay/updateLearnerNickName',
activityCreate: '/gameactivity/create',
activityUpdate: '/gameactivity/update/',
//Priya--modified-starts-15.04.2024
activitygetlastblock:'/gameactivity/getLastBlock',
createGamePlayHistory:'/gameactivity/createGamePlayHistory',
getGamePlayHistory:'/gameactivity/getGamePlayHistory',
//Priya--modified-ends-15.04.2024
//Afrith-modified-starts-08/Apr/24,09/Apr/24
getGameAvgScore: '/gameactivity/getGameAvgScore',
getGameOverallQuestScore: '/gameactivity/getGameOverallQuestScore',
getGameActId: '/gameactivity/getGameActId',
//Afrith-modified-ends-08/Apr/24,09/Apr/24

gameDashboard: '/gameDashboard/gameDashboard/',
storeReflection:'/reflectionquestion/storeanswer',
/*(*/
gameStatus: '/gameactivity/gameStatus',

updateGameRecentlyPlayed:'/gameplay/updateGameRecentlyPlayed/',
  /*)*/

  /*********************learnerAnalytics************************************** */
  getAllLearnerAnalytics: '/activity/getAllLearners',
  specificLearners: '/activity/specificLearners',
  getLearnerFilter: '/activity/getLearnerFilter',
  learnerdashboard: '/learner/getDashboard/',
};

const person = localStorage.getItem('user');
const user = JSON.parse(person);
export const getMethod = {
  method: 'GET',
  mode: 'cors',
  headers: {
    Authorization: user?.token,
    'Content-Type': 'application/json',
  },
};
export const postMethodfile = (data) => {
  let method = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization: user?.token,
      'Content-Type': 'application/json',
    },
    body: data,
  };
  return method;
};
export const postVoice = (data) => {
  let method = {
    method: 'POST',
   
    headers :{
      "Accept": "audio/mpeg",
      "Content-Type": "application/json",
      XI_API_KEY: "a4a359b90c7062376f6e4ad7a7ab6d37"
    },
    body: data,
  };
  return method;
};
export const postMethod = (data) => {
  let method = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization: user?.token,
      'Content-Type': 'application/json',
    },
    body: data,
  };
  return method;
};

export const putMethod = (data) => {
  let method = {
    method: 'PUT',
    mode: 'cors',
    headers: {
      Authorization: user?.token,
      'Content-Type': 'application/json',
    },
    body: data,
  };
  return method;
};

export const postMethodVoice = (data) => {
  let method = {
    method: 'POST',
    // mode: 'cors',

    headers: {
      // XI_API_KEY:'28f7b776bb262ab1140ce635a90bd8f9',
      'xi-api-key': 'e8b9d84992ae3b4e70a232136717f5ab',
      'Content-Type': 'application/json',
    },
    body: data,
  };
  return method;
};

export const postMethodGameReview = (data) => {
  let method = {
    method: 'POST',
    mode: 'cors',
    headers: {
      // Authorization: user?.token,
      'Content-Type': 'application/json',
    },
    body: data,
  };
  return method;
};
