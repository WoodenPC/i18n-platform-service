import fastify from 'fastify'
import dotenv from 'dotenv';
import cookiePlugin from '@fastify/cookie';
import { fastifyAwilixPlugin } from '@fastify/awilix';
import jwt from '@fastify/jwt';
import corsPlugin from '@fastify/cors';

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

  server.register(corsPlugin, {
    origin: 'http://localhost:3000', // TODO make whitelist,
    methods: ['POST', 'GET'],
    credentials: true
  })

  server.decorate('authOnly', authOnly);
  
  server.register(fastifyAwilixPlugin, { disposeOnClose: true });

  server.addContentTypeParser('application/json', { parseAs: 'string' }, (_, body, done) => {
    try {
      console.log('try parse body');
      var json = JSON.parse(body as string)
      done(null, json)
    } catch (err: any) {
      err.statusCode = 400
      done(err, undefined)
    }
  })

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

