
import authRoute from "./routes/auth.js"
import articleRoute from "./routes/article.js"
import express from 'express';
import mongoose from 'mongoose'


const app = express()
const port = 5000

try {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://0.0.0.0:27017/eventoe');
} catch (error) {
  throw(error)
}


app.use(express.json());


// app.use('/home', (req, res,next) => {
//   res.send('Hello World!')
// })                                                                       


app.use("/auth",authRoute);
app.use("/article",articleRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
// start command - npm run nodemon