import express from "express";

const PORT = 4000;
const app = express(); // express 의 내용들은 이 변수 아래에 작성해주어야 한다.

const logger = (req, res, next) => 
{ 
  console.log(`${req.method} ${req.url}`); 
  next();
}

const handleHome = (req, res) =>
{ 
  return res.send("<h1>Home</h1>") 
}

app.get("/", logger, handleHome); // (root ,callback)


const handleListening = () => console.log(`✅ 🚀 Server listenting on port http://localhost:${PORT} 🚀 ✅`);
app.listen(PORT, handleListening); // (root, callback)
