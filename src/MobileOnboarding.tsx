
// MobileOnboarding.tsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from './TemplateData/HeaderOption2.png'
import Image from './TemplateData/HeaderOption1.png'
import Menu from './TemplateData/Menu-Icon.png'
import Share from './TemplateData/IOS-Share-Icon.png'
import Logo from '../src/assets/img/avatars/LogoAtlantis.png'
const MobileOnboarding: React.FC = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const isIOS =
      /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.userAgent.includes("Mac") && "ontouchend" in document);
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.matchMedia("(display-mode: fullscreen)").matches ||
      (navigator as any).standalone === true; // for iOS

      
    const InstallPrompt = document.getElementById("Install-Overlay");

   
    if (!isStandalone && InstallPrompt) {
      if (isAndroid) {
        InstallPrompt.innerHTML = `
          <img id="Install-Header" src=${Image} alt="Aurelius Header Image" />
          <div id="Install-Container">
            <h2>How to Install Atlantis</h2>
            <ol>
              <li> 
              <span class="inline-icon">
    Tap on the Browser Menu
    <img id="Menu-Icon" src=${Menu} alt="Menu Icon" />
  </span>
              </li>
              <li>Select 'Add to Home Screen'</li>
              <li>Tap on Add</li>
              <li>
      <span class="inline-icon-wrapper">
    Look for the 
    <span class="app-icon"></span>
    icon on your Home Screen
  </span>
              </li>
            </ol>
          </div>`;
      } else if (isIOS) {
        InstallPrompt.innerHTML = `
          <img id="Install-Header" src=${Image} alt="Aurelius Header Image" />
          <div class="IOS" id="Install-Container">
            <h2>How to Install Atlantis</h2>
            <ol>
              <li>Tap on the Share button
                <img id="IOS-Share-Icon" src=${Share} alt="IOS Share Icon" />
              </li>
              <li>Scroll down and select 'Add to Home Screen'</li>
              <li>Tap on Add</li>
              <li> <span class="inline-icon-wrapper">
    Look for the 
    <span class="app-icon"></span>
    icon on your Home Screen
  </span>
              </li>
            </ol>
          </div>`;
      } else {
       InstallPrompt.remove()
     
      }
    } else {
          InstallPrompt?.remove()
          
    }

    // Redirect if already running in standalone mode (iOS or Android)
    if (isStandalone) {
      navigate(`/login`);
    }

    // ✅ Listen for Android switching to standalone mode after install
    const displayModeQuery = window.matchMedia("(display-mode: standalone)");
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        navigate(`/login`);
      }
    };
    displayModeQuery.addEventListener("change", handleDisplayModeChange);

    // Clean up listener on unmount
    return () => {
      displayModeQuery.removeEventListener("change", handleDisplayModeChange);
    };

    //  const redirectTimer = setTimeout(() => {
    //   navigate(`/login`);
    // }, 0); // 4 sec delay or use a button click

    // return () => clearTimeout(redirectTimer);
  }, [gameId, navigate]);

  return (
    <div>

      <div id="Install-Overlay"></div>
    </div>
  );
};

export default MobileOnboarding;
