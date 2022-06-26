import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import { fastifyAwilixPlugin, diContainer } from '@fastify/awilix';
// import jwt from '@fastify/jwt';

import { init } from '@di/init';

import { routes } from './routes'

init();
const server = fastify({ logger: true })
// server.register(jwt)
server.register(fastifyAwilixPlugin, { disposeOnClose: true });
server.register(routes, { prefix: '/api' });


server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
