# AWS REKOGNITION INTEGRATION

## Project description
This is a small project build up to test aws rekognition API

## Project setup and running
1. Copy .env.example to .env
2. Set up your aws credentials and zone, in .env file
3. Put your comparison and target pícutres into `images/comparison` and `images/targets` folders
4. Select your comparison and target pictures by setting up the filename in lines 7 and 8, inside index.js file.
5. Test the images by running on command line:
```
node index.js
```