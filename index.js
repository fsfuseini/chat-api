import express from "express";
import messageRouter from "./routes/message.js";



const app = express();
const port = 3003;

// Use middleware
app.use(express.json());


// Use routes
app.use(messageRouter)


app.listen(port, () => {
    console.log(`This app is listening at http://localhost:${port}`);
});