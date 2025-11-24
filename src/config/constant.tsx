let BACKEND_SERVER = null;
if (process.env.REACT_APP_BACKEND_SERVER) {
  BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;
} else {
//  BACKEND_SERVER = "http://15.156.37.6:5555";
        //  BACKEND_SERVER = "http://192.168.1.32:5557";
        //  BACKEND_SERVER = "https://test.atlantisworld.co:5555";
        //  BACKEND_SERVER = "https://atlantisworld.co:5555";
        //  BACKEND_SERVER = "https://api.atlantis.com:5555";
        // BACKEND_SERVER = "http://localhost:5558";
          BACKEND_SERVER = "http://192.168.1.3:5557";
}

export const API_SERVER = BACKEND_SERVER;