//Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
//PDX-License-Identifier: MIT-0 (For details, see https://github.com/awsdocs/amazon-rekognition-developer-guide/blob/master/LICENSE-SAMPLECODE.)
require('dotenv').config();

const AWS = require('aws-sdk')
const bucket        = 'bucket' // the bucketname without s3://
const photo_source  = './images/comparison/lara.jpg'
const photo_target  = './images/targets/lara4.jpg'

var fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    const bitmap = fs.readFileSync(file);
    const buffer = new Buffer.from(bitmap, 'base64')

    return buffer
}

const config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})
const client = new AWS.Rekognition();
const params = {
  SourceImage: {
    Bytes: base64_encode(photo_source)
  },
  TargetImage: {
    Bytes: base64_encode(photo_target)
  },
  SimilarityThreshold: 70
}
client.compareFaces(params, function(err, response) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  } else {
    if(!response.FaceMatches.length){
        console.log("Pessoa não reconhecida!");
    }else{
        response.FaceMatches.forEach(data => {
          let position   = data.Face.BoundingBox
          let similarity = data.Similarity

          console.log(`Pessoa reconhecida com ${similarity}% de confiabilidade`)
        }) // for response.faceDetails
    }
  } // if
});