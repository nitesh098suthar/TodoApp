
import {app} from "./app.js";
import { connectDB } from "./config/connectDB.js";       //giving path of .env file

connectDB();
const PORT = 8000 || process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}`);
})
