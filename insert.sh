#!/bin/bash
jq -c '.[]' database.json | 
while read keydata; do curl -g -H "Content-Type: application/json" -d "$keydata" -X PUT ${BASE_DOMAIN}/add-ingredients ; done
