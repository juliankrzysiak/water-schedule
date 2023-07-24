import { app } from './app';
import { logger } from './utils/logger';
import { config } from './utils/config';

const PORT = Number(config.PORT) || 3000;

app.get('/version', (_req, res) => {
	res.send('1');
});

app.listen(PORT, '0.0.0.0', () => {
	logger.info(`Server running on port ${PORT}`);
});
