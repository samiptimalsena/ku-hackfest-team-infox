export const convertBlobUrlToFile = async (url, step) => {
  const audioBlob = await fetch(url).then((r) => r.blob());
  const audiofile = new File([audioBlob], `wav_file${step}.wav`, {
    type: 'audio/wav'
  });
  return audiofile;
};
