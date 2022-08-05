input_text_path='/home/maspi/code/KU_HACKFEST/INFOX_TTS_TRAIN/vakyansh-tts/data/line_index.txt'
input_wav_path='/home/maspi/code/KU_HACKFEST/INFOX_TTS_TRAIN/vakyansh-tts/data/wavs_22k/'
gender='male'


output_data_path='/home/maspi/code/KU_HACKFEST/INFOX_TTS_TRAIN/vakyansh-tts/data/glow/male'

valid_samples=2
test_samples=1

mkdir -p $output_data_path
python /home/maspi/code/KU_HACKFEST/INFOX_TTS_TRAIN/vakyansh-tts/utils/glow/prepare_iitm_data_glow_en.py -i $input_text_path -o $output_data_path -w $input_wav_path -v $valid_samples -t $test_samples
