#! /usr/bin/env bash
echo "Building Docker Container Image..."
docker build -t cchen97/heali .
docker push cchen97/heali
echo  "Cleaning Up..."
docker image prune -f 