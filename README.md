# Process csv and xml files

## Process and save data to mongo

Read file, transform data and save to local or to mongo atlas

### How to run this project

- Create an account on mongo atlas [Link Here](https://www.mongodb.com/atlas/database)
- Set your credential on .env file
- Run the test `yarn test`
- Run the project `yarn dev`

### Route

destination: Local or Mongo

```

POST http://localhost:3000/upload

BODY form-data
{
  file: sample.csv
  destination: Local
}

PAYLOAD
{
  "success": true
}
```

### Preview 

<img src="./post.png" width="100%" alt="example">

### Use on your project
- Copy the files to your project 
- Call the function `processFileService`
- You can provide an file from uploaded

Any question feel free to message me [Linkedin](https://www.linkedin.com/in/alessandro-l-menezes-57906b71/)
