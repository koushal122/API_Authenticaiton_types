import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "koushal";
const yourPassword = "admin";
const yourAPIKey = "86a7f26d-3c90-4ef0-816c-7e557d001602";
const yourBearerToken = "ff3634e8-2b73-4f1d-8f8b-a575bd73c4e1";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try{
    const response=await axios.get("https://secrets-api.appbrewery.com/random");
    const result=response.data;
    console.log(result);
    res.render("index.ejs",{content:JSON.stringify(result)});
   }
   catch(error){
      console.log(error.message);
      res.render("index.ejs",{content:error.message});
   }
});

app.get("/basicAuth", (req, res) => {
  // https://stackoverflow.com/a/74632908
    const url="https://secrets-api.appbrewery.com/all?page=1";
    const token = `${yourUsername}:${yourPassword}`;
    const encodedToken = Buffer.from(token).toString('base64');

    var config = {
      method: 'get',
      url: url,
      headers: { 'Authorization': 'Basic '+ encodedToken }
    };

    axios(config)
    .then(function (response) {
      res.render("index.ejs",{content:JSON.stringify(response.data)});
    })
    .catch(function (error) {
      res.render("indes.ejs",{content:error.message});
    });
});

app.get("/apiKey", async (req, res) => {
   try{
      let url=`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`;
      const response=await axios.get(url);
      res.render("index.ejs",{content:JSON.stringify(response.data)});
    }
   catch(error){
    res.render("index.ejs",{content:error.message});
   }
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  const url=`https://secrets-api.appbrewery.com/secrets/1`;
  const response=await axios.get(url, {
    headers: { 
      Authorization: `Bearer ${yourBearerToken}` 
    },
  });
  console.log(response);
  res.render("index.ejs",{content:JSON.stringify(response.data)});
  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
