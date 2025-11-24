export const checkIsMandatoryReplayPromptRequired = async (
  playerQuestTotal: number,
  currentQuestGameData: any,
) => {
  if (currentQuestGameData.gameIsSetMinPassScore === 'true') {
    const minScore = currentQuestGameData?.gameMinScore || 0;
    if (minScore > 0 && playerQuestTotal < minScore) {
      return true;
    }
    return false;
  }
  return false;
};

export const isOptionalReplayAllow = async (
  playerQuestTotal: number,
  currentQuestGameData: any,
  gameDisableOptionalReplays: string,
) => {
  if (currentQuestGameData.gameIsSetMinPassScore === 'true') {
    if (playerQuestTotal >= currentQuestGameData?.gameMinScore) {
      const result: boolean = await isOptionReplayRequired(
        playerQuestTotal,
        currentQuestGameData,
        gameDisableOptionalReplays,
      );
      return result;
    }
    return false;
  } else {
    const result: boolean = await isOptionReplayRequired(
      playerQuestTotal,
      currentQuestGameData,
      gameDisableOptionalReplays,
    );
    return result;
  }
};

export const isOptionReplayRequired = async (
  playerQuestTotal: number,
  currentQuestGameData: any,
  gameDisableOptionalReplays: string,
) => {
  // if (currentQuestGameData?.gameIsSetDistinctionScore === 'true') {
  if (
    gameDisableOptionalReplays === 'false' &&
    playerQuestTotal < currentQuestGameData?.gameTotalScore
  ) {
    return true;
  } else if (gameDisableOptionalReplays === 'false') return true;
  return false;
};

export const getPlayerFinalScore = async (
  scores: any,
  currentQuestGameData: any,
) => {
  const sums: any = {};
  scores.forEach((score: any) => {
    const quest = score.quest;
    if (!sums[quest]) {
      sums[quest] = 0;
    }
    sums[quest] += score.score;
  });

  const getFinalscores = Object.entries(sums).map(([quest, score]) => ({
    quest,
    score,
  }));
  const getscores = getFinalscores.find(
    (row: any) => row.quest == currentQuestGameData.gameQuestNo,
  );
  const finalscore = getscores?.score;
  return Number(finalscore || 0);
};
export const getPlayerFinalScoreCompletion = async (
  scores: any,
  currentQuestGameData: any,
) => {
  const sums: any = {};
  scores.forEach((score: any) => {
    const quest = score.quest;
    sums[quest] += score.score;
  });

  const getFinalscores = Object.entries(sums).map(([quest, score]) => ({
    quest,
    score,
  }));
  const getscores = getFinalscores.find(
    (row: any) => row.quest == currentQuestGameData.gameQuestNo,
  );
  const finalscore = getscores?.score;
  return Number(finalscore || 0);
};
