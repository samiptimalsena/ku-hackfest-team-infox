from infox_utils.vakyansh_tts.tts_infer.tts import TextToMel, MelToWav
from .vakyansh_tts.tts_infer.num2word import normalize_nums
from .vakyansh_tts.tts_infer.translator import transliterate_to_nepali

import re
from scipy.io.wavfile import write

def run_tts(text, t2m, m2w, username, lang="ne"):
    text = text.replace('।', '.')
    text_num_to_word = normalize_nums(text, lang) # converting numbers to words in lang
    nepali_translated_text = transliterate_to_nepali(text)
    
    mel = t2m.generate_mel(nepali_translated_text)
    audio, sr = m2w.generate_wav(mel)

    save_wav_path = f'/home/maspi/code/KU_HACKFEST/INFOX_TTS_INFERENCE/output/{username}.wav'
    write(filename=save_wav_path, rate=sr, data=audio)
    # return (sr, audio)
    return save_wav_path

