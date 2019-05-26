#!/bin/bash
export BASE_DOMAIN=https://f5lyq94lv5.execute-api.us-east-1.amazonaws.com/dev
jq -c 'to_entries[]' database.json | 
while read keydata; do curl -H "Content-Type: application/json" -d "$keydata" -X PUT ${BASE_DOMAIN}/add-ingredients ; done
# while read keydata; do echo "$keydata"; done
# do curl -g -H "Content-Type: application/json" -d $keydata -X PUT ${BASE_DOMAIN}/add-ingredients ; done
#  curl -g -H "Content-Type: application/json" -X PUT ${BASE_DOMAIN}/add-ingredients -d '{"key": "substitute","value": {"text": "substitute","tags": {"POST_NEGATIVE_WORD": 1,"ANY": 1}}}'