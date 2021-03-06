import fastify from 'fastify'
import dotenv from 'dotenv';
import cookiePlugin from '@fastify/cookie';
import { fastifyAwilixPlugin } from '@fastify/awilix';
import jwt from '@fastify/jwt';
import corsPlugin from '@fastify/cors';

import { init } from '@di/init';
import { patch } from '@config/patch';

import { authOnly } from '@guards/authOnly';
import { registerRoutes } from './routes';
dotenv.config();
patch();

function startApp() {
  const server = fastify({ logger: true });
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

  server.register(jwt, {
    namespace: 'teamInvite',
    jwtSign: 'teamInviteSign',
    secret: process.env.JWT_TEAM_INVITE_SECRET as string
  });


  server.register(jwt, {
    namespace: 'userActivate',
    jwtSign: 'userActivateSign',
    secret: process.env.JWT_USER_ACTIVATION_SECRET as string
  });


  server.register(corsPlugin, {
    origin: 'http://localhost:3000', // TODO make whitelist,
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
  })

  server.decorate('authOnly', authOnly);
  
  server.register(fastifyAwilixPlugin, { disposeOnClose: true });

  server.addContentTypeParser('application/json', { parseAs: 'string' }, (_, body, done) => {
    try {
      var json = JSON.parse(body as string)
      done(null, json)
    } catch (err: any) {
      err.statusCode = 400
      done(err, undefined)
    }
  });

  init(server);
  server.register(registerRoutes, { prefix: '/api' });

  server.listen({ port: 8080 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

startApp();

