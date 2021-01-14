const timeDelayLoading = 300; // milliseconds

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const delayLoading = async () => {
  await delay(timeDelayLoading);
};
