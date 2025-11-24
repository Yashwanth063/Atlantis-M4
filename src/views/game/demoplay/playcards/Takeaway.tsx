import {
  Box,
  Img,
  Text,
  Button
  // brindha end
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { jsPDF } from 'jspdf'; 
// import bull from 'assets/img/screens/bullet.png';
// import right from 'assets/img/games/right.png';
// import nextBtn from 'assets/img/screens/next.png';
import { ProfileContext } from '../EntirePreview';
import { ScoreContext } from '../GamePreview';
import Scrollbar from 'components/customScroll/CustomScroll';
import download from 'assets/img/games/download.png';
const Takeway: React.FC<{
  formData: any;
  imageSrc: any;
  getData?: any;
  data?: any;
  preloadedAssets: any;
  gameInfo:any;
  setCurrentScreenId:any;
  FeedbackcurrentPosition:any;
  setFeedbackCurrentPosition:any;
  interactionBlockArray:any;
  profileData:any;
  setFeedbackNavigateNext:any;
  feedbackList:any;
  setInterActionBlockArray:any;
  getFeedbackData:() => void;
  setCurrentQuestNo:any;
  setFirstLoading:any;
}> = ({ formData, imageSrc, getData, data,preloadedAssets,gameInfo,setCurrentScreenId,FeedbackcurrentPosition, setFeedbackCurrentPosition,interactionBlockArray,profileData, getFeedbackData,setFeedbackNavigateNext,setInterActionBlockArray,feedbackList ,setCurrentQuestNo,setFirstLoading}) => {
  const useData = useContext(ProfileContext)
  const [TakeAwayContentLang,setTakeAwayContentLang] = useState(null);
  const { profile, setProfile } = useContext(ScoreContext);
  console.log(gameInfo,'gameInfointakeway')
  const TakeAwayContentLanguage = () =>
    {
      if (profileData?.Audiogetlanguage.length !== 0) {
        const GameLanguageFilter = profileData?.Audiogetlanguage.filter(
          (key: any) => key?.textId === formData?.gameId,
       );
       if(GameLanguageFilter.length > 0)
        {
          const takeAwayFiltered = GameLanguageFilter.filter(
            (key: any) => key?.fieldName === 'gameTakeawayContent',
          );
          if(takeAwayFiltered.length > 0)
            {
              const TakeAwayContent = takeAwayFiltered[0]?.content ? takeAwayFiltered[0]?.content.split('\n') : formData?.gameTakeawayContent.split('\n');
              setTakeAwayContentLang(TakeAwayContent)
            }
        }
      }
      else
      {
              setTakeAwayContentLang(formData?.gameTakeawayContent?.split('\n'))
      }
    }
  useEffect(() =>
  {
    TakeAwayContentLanguage();
  },[formData])
  // useEffect(() =>
  // {
  //   TakeAwayContentLanguage();
  // },[])
 
  // const content = formData.gameTakeawayContent?.split('\n');
const previousNavigation =() =>
  {
    useData?.setMotionEffect(true);
    const LastquestNo = parseInt(profile.currentQuest);
    setFirstLoading(false)
   setCurrentQuestNo(LastquestNo)
    setTimeout(()=> {
     if (
      formData?.gameIsShowReflectionScreen === 'true' 
      &&
      gameInfo?.reflectionQuestions.length > 0
    ) {
      setCurrentScreenId(3);
      return false;
    }else if (feedbackList.length !== 0 && gameInfo?.gameData?.gameIsShowInteractionFeedBack === 'Completion') {
      if (feedbackList?.find((item: any) => item.quest == profile.currentQuest)) {
        const groupedFeedback: { [key: string]: any[] } = {};
        feedbackList.forEach((feedback:any) => {
          if (!(feedback.Seq in groupedFeedback)) {
            groupedFeedback[feedback.Seq] = [];
          }
          groupedFeedback[feedback.Seq].push(feedback);
        });
        const firstPageFeedback: any[] = [];
        Object.keys(groupedFeedback).forEach((seq: any) => {
          const lastIndex = groupedFeedback[seq].length - 1;
          if (profile.currentQuest == groupedFeedback[seq][lastIndex].quest) {
            firstPageFeedback.push(groupedFeedback[seq][lastIndex]);
          }
        });
        setFeedbackCurrentPosition(firstPageFeedback.length - 1);
        setInterActionBlockArray(firstPageFeedback.length - 1);
        getFeedbackData();
        setFeedbackNavigateNext(false);
        setCurrentScreenId(14); //Navigate to together all feedback
      }
    } else if (formData?.gameIsShowLeaderboard === 'true') {
      setCurrentScreenId(4);
      return false;
    }
    else{
      setCurrentScreenId(6);
      return false;
    }
  },300)
  }
  const handleNext = () => {
    setFirstLoading(true)
    useData?.setMotionEffect(true)
    setTimeout(()=> {
      getData(data)
    },300)
  }
   // ✅ New: Download PDF function
//  const handleDownloadPDF = () => {
//   if (!TakeAwayContentLang || TakeAwayContentLang.length === 0) return;

//   const doc = new jsPDF();
//   const pageWidth = doc.internal.pageSize.getWidth();
//   const marginLeft = 15;
//   let y = 25;

//   // 🎯 Title: Bold, centered, and larger font
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(18);
//   const title = `${gameInfo.gameData.gameTitle} Takeaways`;
//   const titleWidth = doc.getTextWidth(title);
//   const centerX = (pageWidth - titleWidth) / 2;
//   doc.text(title, centerX, y);
//   y += 15;

//   // 📝 Body: Regular font for takeaway content
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(12);

//   // TakeAwayContentLang.forEach((line:any) => {
//   //   // Clean up duplicate bullets
//   //   const cleanLine = line.replace(/^\s*[\u2022•]\s*/, "");
//   //   const wrappedText = doc.splitTextToSize(`• ${cleanLine}`, 180);

//   //   // Add a new page if needed
//   //   if (y > 270) {
//   //     doc.addPage();
//   //     y = 25;
//   //   }

//   //   doc.text(wrappedText, marginLeft, y);
//   //   y += wrappedText.length * 8;
//   // });

//   TakeAwayContentLang.forEach((line: any) => {
//   const cleanLine = line.replace(/^\s*[\u2022•]\s*/, "");
//   const wrappedText = doc.splitTextToSize(`• ${cleanLine}`, 180);

//   // Check if text fits before printing
//   if (y + wrappedText.length * 7 > 300) {
//     doc.addPage();
//     y = 15;
//   }

//   wrappedText.forEach((textLine: string) => {
//     doc.text(textLine, marginLeft, y);
//     y += 7; // uniform line height (not multiplied)
//   });

//   y += 4; // small gap between bullet items
// });


//   // 💾 Save as PDF
//   doc.save(`${gameInfo.gameData.gameTitle} Takeaways.pdf`);
// };


// const handleDownloadPDF = () => {
//   if (!TakeAwayContentLang || TakeAwayContentLang.length === 0) return;

//   const doc = new jsPDF({ unit: "pt" });
//   const pageWidth = doc.internal.pageSize.getWidth();
//   // const marginLeft = 60;
//   const marginLeft = 50; // smaller left margin
// const marginRight = 30; // add right margin reference

//   let y = 70;

//   // ✅ Use Unicode-safe font
//   // doc.setFont("times", "normal");
//    doc.setFont("helvetica", "bold");

//   // ===== Title =====
//   doc.setFontSize(18);
//   const title = `${gameInfo.gameData.gameTitle} Takeaways`;
//   doc.text(title, pageWidth / 2, y, { align: "center" });

//   y += 35;
//   doc.setFontSize(13);

//   // ===== Process takeaway lines =====
//   TakeAwayContentLang.forEach((rawLine: string) => {
//     if (!rawLine || !rawLine.trim()) return;

//     // Clean up any bad encodings
//     const line = rawLine.replace(/[%æÂ]/g, "").trim();

//     // Split by <br> or newline → main heading + sub-points
//     const parts = line.split(/<h1\s*\/?>|\n/gi).map(p => p.trim()).filter(Boolean);

//     // parts.forEach((part, idx) => {
//     //   const isMain = idx === 0;
//     const hasHeading = /<h1\s*\/?>/i.test(rawLine);

// parts.forEach((part, idx) => {
//   const isMain = hasHeading && idx === 0; // Only bold if <h1> exists

//       // const indent = isMain ? 0 : 20; // sub bullets indented
//       // const bulletX = marginLeft + indent;
//       // const textX = bulletX + (isMain ? 0 : 15); // add space after bullet for subs
//       const marginRight = 80;
// const indent = isMain ? 0 : 12; 
// const bulletX = marginLeft + indent;
// const textX = bulletX + (isMain ? 0 : 10);

// // const wrapped = doc.splitTextToSize(part, pageWidth - textX - marginRight); 


//       // Wrap text width
//       // const wrapped = doc.splitTextToSize(part, pageWidth - textX - 40);
//       const wrapped = doc.splitTextToSize(part, pageWidth - textX - marginRight);


//       // Page break if needed
//       if (y + wrapped.length * 16 > doc.internal.pageSize.getHeight() - 40) {
//         doc.addPage();
//         y = 70;
//       }

//       if (isMain) {
//         // 🔹 Main heading (no bullet)
//         // doc.setFont("times", "bold");
//          doc.setFont("helvetica", "bold");
//         wrapped.forEach((txt: string, i: number) => {
//           const lineY = y + i * 16;
//           doc.text(txt, textX, lineY);
//         });
//         y += wrapped.length * 16 + 6;
//       } else {
//         // 🔸 Sub-content with bullet
//         doc.setFont("helvetica", "normal");
//         doc.text("•", bulletX, y);
//         wrapped.forEach((txt: string, i: number) => {
//           const lineY = y + i * 16;
//           doc.text(txt, textX, lineY);
//         });
//         y += wrapped.length * 16 + 6;
//       }
//     });

//     y += 8; // spacing between items
//   });

//   doc.save(`${gameInfo.gameData.gameTitle} Takeaways.pdf`);
// };
const handleDownloadPDF = () => {
  if (!TakeAwayContentLang || TakeAwayContentLang.length === 0) return;

  const doc = new jsPDF({ unit: "pt" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginLeft = 50;
  const marginRight = 80;

  let y = 70;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);

  const title = `${gameInfo.gameData.gameTitle} Takeaways`;
  doc.text(title, pageWidth / 2, y, { align: "center" });

  y += 35;
  doc.setFontSize(13);

  TakeAwayContentLang.forEach((rawLine:any) => {
    if (!rawLine || !rawLine.trim()) return;

    // Clean encoding
    const cleanLine = rawLine.replace(/[%æÂ]/g, "").trim();

    // Detect if <h1> exists
    const hasHeading = /<h1\s*\/?>/i.test(rawLine);

    // Split content using <h1> or newline
    const parts = cleanLine
      .split(/<h1\s*\/?>|\n/gi)
      .map((p:any) => p.trim())
      .filter(Boolean);

    // ✅ Case 1: Normal paragraph (no <h1>) → ONE bullet only
    if (!hasHeading) {
      doc.setFont("helvetica", "normal");

      const wrapped = doc.splitTextToSize(cleanLine, pageWidth - marginLeft - marginRight);

      // Page break if needed
      if (y + wrapped.length * 16 > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage();
        y = 70;
      }

      // doc.text("•", marginLeft, y);
      wrapped.forEach((line:any, i:any) => {
        doc.text(line, marginLeft + 1, y + i * 16);
      });

      y += wrapped.length * 16 + 10;
      return; // 🔥 Prevents extra printing (fixes double bullet issue)
    }

    // ✅ Case 2: <h1> exists → Heading + bullet sub-points
    parts.forEach((part:any, idx:any) => {
      const isMain = idx === 0;
      const indent = isMain ? 0 : 12;
      const bulletX = marginLeft + indent;
      const textX = bulletX + (isMain ? 0 : 10);

      const wrapped = doc.splitTextToSize(part, pageWidth - textX - marginRight);

      if (y + wrapped.length * 16 > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage();
        y = 70;
      }

      if (isMain) {
        doc.setFont("helvetica", "bold");
        wrapped.forEach((line:any, i:any) => doc.text(line, textX, y + i * 16));
      } else {
        doc.setFont("helvetica", "normal");
        doc.text("•", bulletX, y);
        wrapped.forEach((line:any, i:any) => doc.text(line, textX, y + i * 16));
      }

      y += wrapped.length * 16 + 6;
    });

    y += 8; // spacing
  });

  doc.save(`${gameInfo.gameData.gameTitle} Takeaways.pdf`);
};



// const handleDownloadPDF = () => {
//   if (!TakeAwayContentLang || TakeAwayContentLang.length === 0) return;

//   const doc = new jsPDF({ unit: "pt" });
//   const pageWidth = doc.internal.pageSize.getWidth();
//   const marginLeft = 60;
//   let y = 70;

//   // ✅ Use Unicode-safe font
//   doc.setFont("times", "normal");

//   // ===== Title =====
//   doc.setFontSize(18);
//   const title = `${gameInfo.gameData.gameTitle} Takeaways`;
//   doc.text(title, pageWidth / 2, y, { align: "center" });

//   y += 35;
//   doc.setFontSize(13);

//   // ===== Process lines =====
//   TakeAwayContentLang.forEach((rawLine: string) => {
//     if (!rawLine || !rawLine.trim()) return;

//     const line = rawLine.replace(/[%æÂ]/g, "").trim();
//     const parts = line.split(/<br\s*\/?>|\n/gi).map(p => p.trim()).filter(Boolean);

//     parts.forEach((part, idx) => {
//       const isMain = idx === 0;

//       // Main bullet (•), sub bullet (◦)
//       const bullet = isMain ? "•" : "◦";
//       const indent = isMain ? 0 : 20; // Sub-content indent
//       const bulletX = marginLeft + indent;
//       const textX = bulletX + 15;

//       // Wrapped text width (fit within page)
//       const wrapped = doc.splitTextToSize(part, pageWidth - textX - 40);

//       // Add new page if needed
//       if (y + wrapped.length * 16 > doc.internal.pageSize.getHeight() - 40) {
//         doc.addPage();
//         y = 70;
//       }

//       // Draw bullet symbol
//       doc.setFont("times", "bold");
//       doc.text(bullet, bulletX, y);

//       // Draw text aligned next to bullet
//       doc.setFont("times", "normal");
//       wrapped.forEach((txt: string, i: number) => {
//         const lineY = y + i * 16;
//         doc.text(txt, textX, lineY);
//       });

//       y += wrapped.length * 16 + 6;
//     });

//     y += 8; // spacing between sections
//   });

//   doc.save(`${gameInfo.gameData.gameTitle} Takeaways.pdf`);
// };

//   const handleDownloadPDF = () => {
//   if (!TakeAwayContentLang || TakeAwayContentLang.length === 0) return;

//   const doc = new jsPDF;
//   const pageWidth = doc.internal.pageSize.getWidth();
//   const marginLeft = 40;
//   let y = 60;

//   // ✅ Use Unicode-friendly built-in font
//   doc.setFont("times", "normal");

//   // ====== Title ======
//   doc.setFontSize(18);
//   const title = `${gameInfo.gameData.gameTitle} Takeaways`;
//   doc.text(title, pageWidth / 2, y, { align: "center" });

//   y += 30;
//   doc.setFontSize(12);

//   // ====== Each takeaway line ======
//   TakeAwayContentLang.forEach((rawLine: string) => {
//     if (!rawLine || !rawLine.trim()) return;

//     // 🧹 Clean up broken characters, duplicate bullets, weird encodings
//     let line = rawLine
      

//     // 🧩 Split by <br> or \n for sub-points
//     const parts = line.split(/<br\s*\/?>|\n/gi).map(p => p.trim()).filter(Boolean);

//     parts.forEach((part, idx) => {
//       const isMain = idx === 0;
//       const bullet = "•";
//       const indent = isMain ? 0 : 20;

//       // Prevent overflow
//       const wrapped = doc.splitTextToSize(` ${part}`, pageWidth - marginLeft * 2 - indent);

//       if (y + wrapped.length * 16 > doc.internal.pageSize.getHeight() - 40) {
//         doc.addPage();
//         y = 60;
//       }

//       wrapped.forEach((txt:any) => {
//         doc.text(txt, marginLeft + indent, y);
//         y += 16;
//       });

//       y += 4;
//     });

//     y += 8; // space between main bullets
//   });

//   doc.save(`${gameInfo.gameData.gameTitle} Takeaways.pdf`);
// };

  return (
    <>
      {imageSrc && (
        <Box className="takeaway-screen">
          <Box className="takeaway-screen-box">
          {formData?.gameIsShowTakeaway ==='true' ?
            (<>
            <Img src={imageSrc} className="bg-take" />
            <Box
              className="content-box"             
            >
         <Scrollbar>
              <Box>
                {/* {TakeAwayContentLang &&
                  TakeAwayContentLang.map((it: any, ind: number) => {
                    const bulletIndex = it.indexOf('\u2022');
                    const contentAfterBullet =
                      bulletIndex !== -1
                        ? it.slice(bulletIndex + 1).trim()
                        : it;
                    return (
                      contentAfterBullet &&
                      <Box
                        className="content"
                        fontFamily={'AtlantisText'}
                        color={'#D9C7A2'}
                        key={ind}
                        whiteSpace="normal"        // allow wrapping
                        wordBreak="normal"         // prevent mid-word breaks
                        overflowWrap="normal" 
                      >
                        <>
                          <Img
                            src={preloadedAssets.bull}
                            className="dot-img"
                            w={'16px'}
                            h={'16px'}
                          />
                          {contentAfterBullet}
                        </>
                      </Box>
                    );
                  })} */}
                  {TakeAwayContentLang &&
  TakeAwayContentLang.map((it: any, ind: number) => {
    // Remove extra bullet characters if present
    const bulletIndex = it.indexOf('\u2022');
    const cleanedLine = bulletIndex !== -1 ? it.slice(bulletIndex + 1).trim() : it.trim();

    if (!cleanedLine) return null;

    // Split by <br> to separate main heading and sub-points
    const parts = cleanedLine.split('<h1>').map((p: string) => p.trim()).filter(Boolean);
    const mainHeading = parts[0];
    const subPoints = parts.slice(1);

    return (
      <Box key={ind} mb={4}>
        {/* 🔹 Main bullet heading */}
        <Box
          className="content"
          display="flex"
          alignItems="flex-start"
          fontFamily="AtlantisText"
          color="#D9C7A2"
          whiteSpace="normal"
          wordBreak="normal"
          overflowWrap="normal"
        >
          <Img
            src={preloadedAssets.bull}
            className="dot-img"
            w="16px"
            h="16px"
            mr="8px"
            mt="2px"
          />
          <Text>{mainHeading}</Text>
        </Box>

        {/* 🔸 Sub-bullets (for <br> parts) */}
        {subPoints.length > 0 && (
          <Box ml="30px" mt="4px">
            {subPoints.map((sub: string, subIndex: number) => (
              <Box
                key={subIndex}
                className="content"
          display="flex"
          alignItems="flex-start"
          fontFamily="AtlantisText"
          color="#D9C7A2"
          whiteSpace="normal"
          wordBreak="normal"
          overflowWrap="normal"
              >
                {/* <Text as="span" mr="6px">◦</Text> */}
                <Img
            src={preloadedAssets.bull}
            className="dot-img"
            w="16px"
            h="16px"
            mr="8px"
            mt="2px"
          />
                <Text as="span">{sub}</Text>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    );
  })}

              </Box>     
                </Scrollbar>
                   {/* ✅ Download Button */}
                 {/* ✅ Fixed Download Button */}



                   
                 
            </Box>
            <Box
  position="absolute"
  bottom="3%"
  right="15%"
  zIndex="10"
  className='download-mouse'
>
  <button onClick={handleDownloadPDF} className="download-btntakeaway">
    <Img
      src={download}
      alt="Download"
      w="100%"
      h={{ base: '72px', md: '90px' }} // 👈 Responsive height
    />
  </button>
</Box>

            <Box className='take-away-btns'>
              <Img
                src={preloadedAssets.left}
                className={'interaction_button'}
                onClick={() => previousNavigation()}
              />
              <Img
                src={preloadedAssets.right}
                className={'interaction_button'}
                onClick={() => handleNext()}
              />
            </Box>
            </>)
              : <>
                <Box className="top-menu-home-section">
                  <Box className="Setting-box">
                    <Img
                      src={preloadedAssets?.Replay}
                      className="setting-pad"
                    />
                    <Box className="optional-vertex-error">
                      <Box
                        w={'100%'}
                        h={'100%'}
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={' flex-start'}
                      >

                        <Text className="No_preview" textAlign={'center'} mt={12}>
                          The"Show Takeaway" option is currently disabled. Please enable it if you want to use this feature.</Text>
                        <Box
                          w={'100%'}
                          display={'flex'}
                          justifyContent={'center'}
                          position={'absolute'}
                          bottom={'0'}
                          className='left-right-btn'
                        >
                          <Box w={'80%'} display={'flex'} justifyContent={'space-between'}>
                            <Img src={preloadedAssets.left} className={'interaction_button'} cursor={'pointer'} h={'60px'} onClick={() => previousNavigation()} />
                            <Img
                              src={preloadedAssets.right}
                              className={'interaction_button'}
                              cursor={'pointer'}
                              h={'60px'}
                              onClick={() => getData(data)}
                            />
                          </Box>
                        </Box>

                      </Box>
                    </Box>
                  </Box>
                </Box>
            </>}
          </Box>
        </Box>
      )}
    </>
  );
};
export default Takeway;
