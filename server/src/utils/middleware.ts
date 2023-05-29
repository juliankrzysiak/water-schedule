import logger from './logger';
import { RequestHandler, ErrorRequestHandler } from 'express';

const requestLogger: RequestHandler = async (_req, res, next) => {
	logger.info(`Method: ${res.req.method}`);
	logger.info(`PATH: ${res.req.path}`);
	logger.info(`Body: ${res.req.body}`);
	logger.info('---');
	next();
};

const unknownEndpoint: RequestHandler = (_req, res) => {
	res.status(400).send({ error: 'unknown endpoint' });
};

const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
	logger.error(error.message);

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message });
	}

	next(error);
};

export default { requestLogger, unknownEndpoint, errorHandler };
