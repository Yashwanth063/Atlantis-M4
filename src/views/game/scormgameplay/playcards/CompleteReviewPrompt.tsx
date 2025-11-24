import { Box, Button, Img, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
// import { ScoreContext, ProfileType } from '../GamePreview';
import { ProfileContext } from '../EntirePreview';
import { motion } from 'framer-motion';
import {
    CompleteReviewerStatus
  } from 'utils/game/gameService';
type ReviewProps = {
    preloadedAssets: any;
    setIsCompleteReview: any;
    setCompleteTrue:any;
}

const CompletionReview: React.FC<ReviewProps> = ({
    preloadedAssets,
    setIsCompleteReview,
    setCompleteTrue,
}) => {
    const [replayMessage, setReplayMessage] = useState<string>(null);
    const playerInfo = useContext(ProfileContext);
    const ReviewCompletionApi = async () =>
    {
        // const reviewerStatus = await CompleteReviewerStatus(reviewInput?.reviewerId)
        setCompleteTrue(true)
        setIsCompleteReview(false)
    }
    const ReviewPromptClose = () =>
    {
        setCompleteTrue(false)
        setIsCompleteReview(false) ; 
    }
    return (
        <>
            <Box id="container" className="Play-station">
                <Box className="top-menu-home-section">
                    <Box className="Setting-box">
                        <motion.div
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 20,
                            }}
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <>
                                <Img
                                    src={preloadedAssets?.Replay}
                                    className="setting-pad"
                                />
                                <Box className={'complete_propmpt'}>
                                    <Box
                                        w={'100%'}
                                        h={'100%'}
                                        display={'flex'}
                                        flexDirection={'column'}
                                        justifyContent={'space-between'}
                                    >
                                        <>
                                        <Box className='replay_game_text'>Review Completion Confirmation</Box>
                                            <Box className='replay_game_text'>
Is your review final? Once you mark this as complete, your feedback will be shared with the creator and no further comments can be added.</Box>
                                            <Box display={'flex'} justifyContent={'space-between'} w={'100%'}>
                                                <Button
                                                    background={'transparent !important'}
                                                >
                                                    <Img src={preloadedAssets?.Yes} onClick={() => ReviewCompletionApi() } className='replay_game_btn' />
                                                </Button>
                                                <Button
                                                    background={'transparent !important'}
                                                >
                                                    <Img src={preloadedAssets?.No} onClick={() => ReviewPromptClose()} className='replay_game_btn' />
                                                </Button>
                                            </Box>
                                        </>
                                    </Box>
                                </Box>
                            </>

                        </motion.div>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default CompletionReview;