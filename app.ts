import express from 'express';
import bodyParser from 'body-parser';
import mainRoute from './routes/mainRoute';


const app = express();
app.use(bodyParser.json());

app.use(mainRoute);

app.listen(3000);