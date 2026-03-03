import router from '@routes/index.router';
import app from './lib/app';

const PORT = process.env.PORT || 3000;

app.use(router);

app.listen(PORT)