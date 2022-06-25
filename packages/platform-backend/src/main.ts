import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import { fastifyAwilixPlugin, diContainer } from '@fastify/awilix';
import { asClass, Lifetime } from 'awilix';

const prisma = new PrismaClient()

const server = fastify()
server.register(fastifyAwilixPlugin, { disposeOnClose: true });
diContainer.register({
  prismaClient: asClass(PrismaClient, {
    lifetime: Lifetime.SINGLETON,
    dispose: (module) => module.$disconnect(),
  })
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})

server.addHook('onClose', async () => {
  await diContainer.dispose();
})