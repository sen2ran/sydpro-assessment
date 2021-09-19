export const useAsyncAwait = (promise: Promise<any>) => {
  return promise
    .then((data) => [data, undefined])
    .catch((error) => Promise.resolve([undefined, error]));
};
