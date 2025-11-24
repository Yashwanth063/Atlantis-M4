// import './assets/css/App.css';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import { AuthProvider } from 'contexts/auth.context';
// import App from './App';
// import { Provider } from 'react-redux';
// import {store} from './store/store';
// import './utils/hooks/fetch-interceptor';
// import { ColorProvider } from '../src/components/ui/ColorContext';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// serviceWorkerRegistration.register(); 
// // import { store } from 'store/store';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// let user = localStorage.getItem("user");
// user = JSON.parse(user);

//   if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js')
//       .then(reg => console.log('Service Worker registered'))
//       .catch(err => console.log('Service Worker registration failed:', err));
//   });
// }

// root.render(
//   <Provider store={store}>
//     <AuthProvider userData={user}>
//       <BrowserRouter>
//          <ColorProvider>
//       <App />
//     </ColorProvider>
//       </BrowserRouter>
//     </AuthProvider>
//   </Provider>,
// );
// import './assets/css/App.css';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import { AuthProvider } from 'contexts/auth.context';
// import App from './App';
// import { Provider } from 'react-redux';
// import {store} from './store/store';
// import './utils/hooks/fetch-interceptor';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// serviceWorkerRegistration.register(); 
// // import { store } from 'store/store';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// let user = localStorage.getItem("user");
// user = JSON.parse(user);

//   if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js')
//       .then(reg => console.log('Service Worker registered'))
//       .catch(err => console.log('Service Worker registration failed:', err));
//   });
// }

// root.render(
//   <Provider store={store}>
//     <AuthProvider userData={user}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </AuthProvider>
//   </Provider>,
// );
import { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AuthProvider } from "contexts/auth.context";
import { store } from "./store/store";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./assets/css/App.css";
import "./utils/hooks/fetch-interceptor";
import App from "./App";

// ✅ Register service worker
serviceWorkerRegistration.register();

// ✅ Responsive font-size scaling logic
function Root() {
  useEffect(() => {
    const baseWidth = 1280; // design width in px
    const baseFontSize = 12; // base font size in px
    const minFontSize = 10; // minimum font size
    const maxFontSize = 32; // maximum font size

    function updateFontSize() {
      const currentWidth = window.innerWidth;
      let scale = currentWidth / baseWidth;
      scale = Math.min(
        Math.max(scale, minFontSize / baseFontSize),
        maxFontSize / baseFontSize
      );
      const newFontSize = baseFontSize * scale;
      document.documentElement.style.setProperty("--font-size", `${newFontSize}px`);
    }

    updateFontSize();
    window.addEventListener("resize", updateFontSize);
    return () => window.removeEventListener("resize", updateFontSize);
  }, []);

  let user = localStorage.getItem("user");
  user = user ? JSON.parse(user) : null;

  return (
    <Provider store={store}>
      <AuthProvider userData={user}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

// ✅ Create root and render
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <Root />
  </StrictMode>
);

// ✅ Optional: additional service worker (if using manual registration)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => console.log("Service Worker registered"))
      .catch((err) => console.log("Service Worker registration failed:", err));
  });
}
