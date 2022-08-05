#!/bin/bash

gender='female'

config='../../config/glow/'$gender'.json'
modeldir='/content/drive/MyDrive/vakyansh-tts-checkpoints/glow/'$gender
logdir='/content/drive/MyDrive/vakyansh-tts-logs/glow/'$gender
init=1  # 1 if start from scratch. 0 if start from last checkpoint


####################################################

if [[ $init -eq 1 ]]
then
  python ../../src/glow_tts/init.py -c $config -m $modeldir -l $logdir
fi
python ../../src/glow_tts/train.py -c $config -m $modeldir -l $logdir
