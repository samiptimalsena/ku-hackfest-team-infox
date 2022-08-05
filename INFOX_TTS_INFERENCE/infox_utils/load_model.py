from .vakyansh_tts.tts_infer.tts import TextToMel, MelToWav

def load_glow_hifi(model_name):
    device = "cpu"
    hifi_dir = 'infox_utils/vakyansh_tts/tts_infer/models/vakyansh_models/hifi_ckp'
    glow_dir = f'infox_utils/vakyansh_tts/tts_infer/models/{model_name}'

    text_to_mel = TextToMel(glow_model_dir=glow_dir, device=device)
    mel_to_wav = MelToWav(hifi_model_dir=hifi_dir, device=device)

    return text_to_mel, mel_to_wav
