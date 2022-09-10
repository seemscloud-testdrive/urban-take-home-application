import * as express from 'express';
import 'express-async-errors';

const app = express();

const prom = require('prom-client');
const register = new prom.Registry();

const counter = new prom.Counter({
    name: 'number_of_requests',
    help: 'Number of requests',
});

register.registerMetric(counter);

app.get('/metrics', async (req: express.Request, res: express.Response) => {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
});

app.get('/', async (req: express.Request, res: express.Response) => {
    const response = {
        hostname: req.hostname,
        uptime: process.uptime(),
        podname: process.env.HOSTNAME,
    };

    counter.inc();
    res.status(200).send(response);
});

app.listen(3000, () => {
    console.log('listening on 3000');
});