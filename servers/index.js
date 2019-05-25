const serverless = require('serverless-http');
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const util = require('./StringUtils');

const INGREDIENTS_TABLE = process.env.INGREDIENTS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }));

app.get('/', function (req, res) {
  res.send('Coding challenge for Heali done by Charlene Chen')
})

app.get('/ingredient/:key', function (req, res) {
    const params = {
      TableName: INGREDIENTS_TABLE,
      Key: {
        key: req.params.key,
      },
    }
  
    dynamoDb.get(params, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not get ingredient' });
      }
      if (result.Item) {
        const {key, text, tags} = result.Item;
        res.status(200).json({key, text, tags});
      } else {
        console.log(result.Item);
        res.status(404).json({ error: "Ingredient not found" });
      }
    });
})

app.put('/add-ingredients', function (req, res) {
    const key = req.body.key;
    const text = req.body.value.text;
    const tags = req.body.value.tags;

    if (typeof text !== 'string') {
        res.status(400).json({ error: '"key" must be a string' });
    } else if (typeof key !== 'string'){
        res.status(400).json({ error: '"key" must be a string' });
    }
    const params = {
      TableName: INGREDIENTS_TABLE,
      Item: {
        key: key,
        text: text,
        tags: tags
      },
    };

    const newParams = {
        TableName: INGREDIENTS_TABLE,
        Key: {
          key: key,
        },
    }
  
    dynamoDb.put(params, (error) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not create ingredient' });
      } else {
        dynamoDb.get(newParams, (error, result) => {
            if (error) {
              console.log(error);
              res.status(400).json({ error: 'Could not get ingredient' });
            }
            if (result.Item) {
              const {key, text, tags} = result.Item;
              res.status(200).json({key, text, tags});
            } else {
              res.status(404).json({ error: "Ingredient not found" });
            }
          });
      }
    });
})

app.get('/fuzzy-search/:input', function (req, res) {
    let key = new String(req.params.input);
    key = key.toHashKey();
    const params = {
        TableName: INGREDIENTS_TABLE,
        Key: {
          key: key,
        },
      }
    
      dynamoDb.get(params, (error, result) => {
        if (error) {
          console.log(error);
          res.status(400).json({ error: 'Could not get ingredient' });
        }
        if (result.Item) {
          const {text, tags} = result.Item;
          res.status(200).json({text, tags});
        } else {
          console.log(result.Item);
          res.status(200).json(null);
        }
      });
})

module.exports.handler = serverless(app);