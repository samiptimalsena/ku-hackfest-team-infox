from subprocess import call

def train_glow():
    try:
        r_call = call("/home/maspi/code/KU_HACKFEST/INFOX_TTS_TRAIN/vakyansh-tts/scripts/data/resample.sh", shell=True)   # Resampling the audio file to 22050Hz
        r_call = call("/home/maspi/code/KU_HACKFEST/INFOX_TTS_TRAIN/vakyansh-tts/scripts/glow/prepare_data.sh", shell=True)   # Preparing dataset for training
        # r_call = call("/home/maspi/code/KU_HACKFEST/INFOX_TTS_TRAIN/vakyansh-tts/scripts/glow/train_glow.sh", shell=True)  # This is for training the model
        return "completed"
    except err as e:
        return err
