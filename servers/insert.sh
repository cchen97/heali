#!/bin/bash
jq -c 'to_entries[]' database.json | 
while read keydata; do curl -g -H "Content-Type: application/json" -d "$keydata" -X PUT ${BASE_DOMAIN}/add-ingredients ; done
# while read keydata; do echo "$keydata"; done
# do curl -g -H "Content-Type: application/json" -d $keydata -X PUT ${BASE_DOMAIN}/add-ingredients ; done
#  curl -g -H "Content-Type: application/json" -X PUT ${BASE_DOMAIN}/add-ingredients -d '{"key": "substitute","value": {"text": "substitute","tags": {"POST_NEGATIVE_WORD": 1,"ANY": 1}}}'