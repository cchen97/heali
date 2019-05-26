#!/bin/bash
export BASE_DOMAIN=https://f5lyq94lv5.execute-api.us-east-1.amazonaws.com/dev
jq -c 'to_entries[].key' database.json | 
while read keydata; do curl -g -H "Content-Type: application/json" -X GET ${BASE_DOMAIN}/ingredient/"$keydata" ; done