import { Box, Button, FormLabel, Img, useToast, Text, Modal, ModalBody, ModalOverlay, ModalCloseButton, ModalContent, useDisclosure, Input } from '@chakra-ui/react';
import React,{useState, useEffect} from 'react'
import { getContentRelatedLanguage } from 'utils/game/gameService';

type languageProps = {
    formData: any;
    preloadedAssets: any;
    gameLanguages: any;
    hasMulitLanguages: boolean;
    setHasMulitLanguages: any;
    profileData: any;
    setProfileData:any;
    isOpenCustomModal: boolean;
    setIsOpenCustomModal: (value: boolean)=> void;
}
const gender = ['Male', 'female'];

const LanguageSelectionPrompt : React.FC<languageProps> = ({formData, preloadedAssets, gameLanguages, hasMulitLanguages, setHasMulitLanguages, profileData,setProfileData, setIsOpenCustomModal, isOpenCustomModal}) => {
const [select, setSelect] = useState<boolean>(false);
const [gameContentId, setGameContentId] = useState(null);
const {isOpen, onOpen, onClose} = useDisclosure();


const handleProfile = (e: any, lang?: any, langId?: any) => {
    const { id, value } = e.target;
    setSelect(false);
    setProfileData((prev: any) => ({
      ...prev,
      [id]: id === 'name' ? value : lang,
    }));
    setGameContentId(langId);
  };

  useEffect(() => {
    const fetchGameContent = async() => {
      
        const gameContentResult = await getContentRelatedLanguage(formData.gameId,gameContentId);
        if (gameContentResult.status === 'Success'){
          const data = gameContentResult.data;
          setProfileData((prev:any)=>({
            ...prev,
            content: data.map((x:any)=>({content: x.content})),
            audioUrls: data.map((x:any)=>({audioUrls: x.audioUrls})),
            textId:data.map((x:any)=>({textId: x.textId})),
            fieldName:data.map((x:any)=>({fieldName: x.fieldName})),
            Audiogetlanguage: data.map((x:any) => ({
              content: x.content,
              audioUrls: x.audioUrls,
              textId: x.textId,
              fieldName: x.fieldName,
            })),
          }))
        }
    };
    if(gameContentId){
      fetchGameContent();
    }
  },[gameContentId])

return (
    <>
        <Modal isOpen={hasMulitLanguages && isOpenCustomModal } onClose={()=>{onClose(); setIsOpenCustomModal(false)}}>
        <ModalOverlay />
        <ModalContent>
        <ModalCloseButton />
        <ModalBody
          bgImage={`url(${preloadedAssets.Lang})`}
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
        >
        <Box id="container" className="Play-station">
          {/* <Box className="top-menu-home-section"> */}
          <Box>
            {hasMulitLanguages && (
              <Box className="Setting-box vertex">
               
              <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, unde similique distinctio perferendis illo alias molestiae temporibus eaque aspernatur, provident aliquam doloremque dicta velit! Numquam eveniet eligendi voluptatem at dolorem!
              Natus ipsum laboriosam consequatur molestiae nulla quam quidem a iure consequuntur molestias cumque necessitatibus repudiandae ex numquam, sint itaque expedita incidunt neque fugit, tempore provident eligendi quod officiis esse. Placeat.
              Facilis distinctio rem cupiditate temporibus. Architecto optio laborum fugit aliquid maiores aliquam qui inventore nihil mollitia nesciunt voluptatum ratione, consectetur nam labore eveniet eaque? Dolor et exercitationem quisquam eos unde.
              Dolorum, ex animi necessitatibus tempore ipsam expedita qui placeat facilis minus adipisci laboriosam fuga magnam magni non iusto temporibus ad consequuntur commodi mollitia natus vero! Laborum alias distinctio omnis animi.
              Consectetur optio vitae pariatur eos eaque quis ea ipsum? Excepturi atque consectetur expedita, illum sequi ex, reprehenderit illo minus voluptatibus, sit molestiae. Tenetur vitae fugit, optio incidunt tempora commodi impedit.
              Odit voluptas ab cupiditate hic, iure praesentium esse quas obcaecati consectetur. Laborum mollitia soluta a eum at totam quos facere architecto? Animi eum blanditiis doloribus at fuga est consectetur quisquam.
              Error natus culpa rem vel accusantium repellat corrupti quisquam aperiam totam cumque, ex mollitia quaerat debitis, ipsa facere. Iusto corrupti libero sunt. Earum quam dicta ullam, pariatur nulla provident eius.
              Cumque doloribus ipsam maxime asperiores numquam quibusdam ipsa. Vitae nemo ratione vero quasi rem. Debitis expedita, rem iusto necessitatibus minus, tenetur, sint repellendus dolorum dolores rerum enim? Similique, earum perspiciatis!</Text>



              </Box>
            )}
          </Box>
          </Box>
        </ModalBody></ModalContent></Modal>
    </>
  );
}
export default LanguageSelectionPrompt;