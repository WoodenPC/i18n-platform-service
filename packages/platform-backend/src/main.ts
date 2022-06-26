import fastify from 'fastify'
import dotenv from 'dotenv';
import { fastifyAwilixPlugin, diContainer } from '@fastify/awilix';
import jwt from '@fastify/jwt';

import { init } from '@di/init';

import { routes } from './routes';
dotenv.config();


function startApp() {
  const server = fastify({ logger: true });
  init(server);
  server.register(jwt, {
    namespace: 'access',
    jwtSign: 'accessSign',
    secret: process.env.JWT_ACCESS_SECRET as string
  });
  
  server.register(jwt, {
    namespace: 'refresh',
    jwtSign: 'refreshSign',
    secret: process.env.JWT_REFRESH_SECRET as string
  })
  
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

