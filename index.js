import express from "express";
import * as dotenv from 'dotenv'
// import mongoose from "mongoose"
import { connect } from "./config/db.js"
import UserRouter from "./routes/useRouter.js"
import bodyParser from "body-parser";
import cors from "cors";
import path from 'path'



dotenv.config()

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use("/", UserRouter);


connect();
const __dirname = path.resolve();

 var filePath = "./client/build"
 var resolvedPath = path.resolve(filePath);
 var mainFile = path.resolve("./client/build/index.html")
//  console.log(resolvedPath);
//  console.log(mainFile);

app.use(express.static(path.join(resolvedPath)));
app.get("*", function (req, res) {
  res.sendFile(
    mainFile,
    function (err) {
      res.status(500).send(err);
    }
  );
});

// console.log(__dirname+"/client/build/index.html")


app.listen(process.env.PORT, () => console.log("Server is running :" + process.env.PORT))