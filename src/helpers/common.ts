const timeDelayLoading = 500; // milliseconds

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
export const delayLoading = async () => {
  await delay(timeDelayLoading);
};
