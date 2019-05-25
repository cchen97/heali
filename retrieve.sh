#!/bin/bash
jq -c '.[].text' database.json | 
while read keydata; do curl -g -H "Content-Type: application/json" -X GET ${BASE_DOMAIN}/ingredient/"$keydata" ; done