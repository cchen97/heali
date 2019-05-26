#! /usr/bin/env bash
./build.sh
docker push cchen97/heali
ssh ec2-user@ec2-18-218-125-66.us-east-2.compute.amazonaws.com 'bash -s' < update.sh