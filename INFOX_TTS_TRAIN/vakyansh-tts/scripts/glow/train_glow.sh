#!/bin/bash

gender='male'

config='/home/maspi/code/KU_HACKFEST/INFOX_TTS_TRAIN/vakyansh-tts/config/glow/male.json'
modeldir='/home/maspi/code/KU_HACKFEST/INFOX_TTS_TRAIN/vakyansh-tts/checkpoints/glow/'$gender
logdir='/home/maspi/code/KU_HACKFEST/INFOX_TTS_TRAIN/vakyansh-tts/logs/glow/'$gender
init=0  # 1 if start from scratch. 0 if start from last checkpoint


####################################################

if [[ $init -eq 1 ]]
then
  python /home/maspi/code/KU_HACKFEST/INFOX_TTS_TRAIN/vakyansh-tts/src/glow_tts/init.py -c $config -m $modeldir -l $logdir
fi
python /home/maspi/code/KU_HACKFEST/INFOX_TTS_TRAIN/vakyansh-tts/src/glow_tts/train.py -c $config -m $modeldir -l $logdir
