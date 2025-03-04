import express, {json, urlencoded} from "express";
import config from "./config/config.js";
import authRoutes from './routes/auth.router.js';
import calendarRoutes from './routes/event.router.js'

const app = express();
app.use(urlencoded());
const port = config.port;

app.use(json());

app.use("/", authRoutes);
app.use("/", calendarRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
