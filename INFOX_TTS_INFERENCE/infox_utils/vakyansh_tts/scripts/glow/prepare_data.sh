input_text_path='/content/vakyansh-tts/data/ne_np_female/line_index.txt'
input_wav_path='/content/vakyansh-tts/data/ne_np_female/wavs_22k/'
gender='female'


output_data_path='../../data/glow/'$gender

valid_samples=100
test_samples=10

mkdir -p $output_data_path
python ../../utils/glow/prepare_iitm_data_glow_en.py -i $input_text_path -o $output_data_path -w $input_wav_path -v $valid_samples -t $test_samples
