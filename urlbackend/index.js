const  dotenv = require("dotenv");
const  express = require("express");
const  cors = require("cors");
const  mongoose = require("mongoose");
const  shortid = require("shortid");
const  Url = require("./Url");
const  utils = require("./Util/util");

// configure dotenv
dotenv.config();
const app = express();

// cors for cross-origin requests to the frontend application
app.use(cors({ origin: "*"}));
// parse requests of content-type - application/json
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Db Connected`);
  })
  .catch((err) => {
    console.log(err.message);
  });

// get all saved URLs 
app.post("/all", async (req, res) => {
 try {
  const { url } = req.body;
  console.log(url)
  let urls = await Url.findOne({ origUrl: url });
  console.log(urls);
  if(urls){
    console.log("If");
    return res.status(200).json([urls])
    
  } else {
console.log("Else");
 const url  = await Url.find().sort({ date: -1 } ).limit(1)
 return res.status(200).json(url); }
 } catch (error) {
  console.log(error);
  throw new Error("erro")
 }
})
/*
// Ultimo input 
app.get("/last", async (req, res) =>{
  try {
    const url  = await Url.findOne()
    return res.status(200).json(url);
    } catch (error) {
     console.log(error);
     throw new Error("erro")
    }
}) */
// URL shortener endpoint
app.post("/short", async (req, res) => {
  console.log("HERE",req.body.url);
  const { origUrl } = req.body;
  const base = `http://localhost:3333`;

  const urlId = shortid.generate();
  if (utils.validateUrl(origUrl)) {
    try {
      let url = await Url.findOne({ origUrl });
      if (url) {
        console.log("Duplicada");
        return res.status(200).json(url);

      } else {
        const shortUrl = `${base}/${urlId}`;
        url = new Url({
          origUrl,
          shortUrl,
          urlId,
          date: new Date(),
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json('Server Error');
    }
  } else {
    res.status(400).json('Invalid Original Url');
  }
});

// redirect endpoint
app.get("/find/:urlId", async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    console.log(url)
    if (url) {
      url.clicks++;
      url.save();
      return res.status(200).json(url.origUrl);
    } else res.status(404).json("Not found");
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

// Port Listenning on 3333
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});