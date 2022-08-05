#!/bin/bash

gender='female'

config='../../config/hifi/config_v1.json'
modeldir='/content/drive/MyDrive/vakyansh-tts-checkpoints/hifi/'$gender
logdir='/content/drive/MyDrive/vakyansh-tts-logs/hifi/'$gender


####################################################



python ../../src/hifi_gan/train.py \
    --config $config \
    --input_training_file '../../data/hifi/'$gender'/train.txt' \
    --input_validation_file '../../data/hifi/'$gender'/valid.txt' \
    --checkpoint_path $modeldir \
    --logs_path $logdir \
    --checkpoint_interval 100 \
    --stdout_interval 50 \
    --training_epochs 30
