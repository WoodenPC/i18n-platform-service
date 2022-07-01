import fastify from 'fastify'
import dotenv from 'dotenv';
import cookiePlugin from '@fastify/cookie';
import { fastifyAwilixPlugin } from '@fastify/awilix';
import jwt from '@fastify/jwt';

import { init } from '@di/init';
import { patch } from '@config/patch';

import { routes } from './routes';
import { authOnly } from '@guards/authOnly';
dotenv.config();
patch();

function startApp() {
  const server = fastify({ logger: true });
  init(server);
  server.register(cookiePlugin);

  server.decorateRequest('user', null);

  server.register(jwt, {
    namespace: 'access',
    jwtSign: 'accessSign',
    secret: process.env.JWT_ACCESS_SECRET as string
  });
  
  server.register(jwt, {
    namespace: 'refresh',
    jwtSign: 'refreshSign',
    secret: process.env.JWT_REFRESH_SECRET as string
  });

  server.decorate('authOnly', authOnly);
  
  server.register(fastifyAwilixPlugin, { disposeOnClose: true });
  server.register(routes, { prefix: '/api' });

  server.listen({ port: 8080 }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  });
}

startApp();

