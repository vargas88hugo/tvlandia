<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository. Api creada con NestJs, TypeORM, PostgreSQL, Swagger y Docker. Se trata de una aplicación para una empresa que ofrece servicios de mantenimiento e instalación de soportes para televisores. Los clientes pueden hacer una solicitud de servicio generando un ticket a través del sistema, el cual una vez valide la identificación del cliente debe generar un estado inicial de la solicitud, generar un token y asignar a un técnico de forma aleatoria para que atienda la solicitud, se crea un link para seguimiento del servicio y un link para calificar el servicio. Por último, los técnicos pueden ver las órdenes asignadas que debe atender en transcurso del día y es necesario contar con un endpoint que retorne los servicios del técnico en formato JSON con el listado.

## Installation
Dentro del root del repositorio ejecutar el bash script para configurar la autentificación de la base de datos y construir los containers. El docker-compose se ejecutará en mode detach.
```bash
$ ./start.sh
```

## Observations
Se ha creado un branch local donde la aplicación funciona localmente por si hay problemas con el docker. La generación de la imagen puede tardar unos minutos ya que está poco optimizada y pesa alrededor de 400mb. El multicontainer está compuesto con una imagen de posgresql, un adminer para consultar la base de datos, y el backend con nestjs.

| Nombre | URL |
|--------|-----|
| NestJS/Swagger | http://localhost:3000/api | 
| Adminer | http://localhost:8080/ |

## File Directory
```
├── docker-compose.yml
├── Dockerfile
├── nest-cli.json
├── node_modules
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── app.module.ts
│   ├── common
│   │   └── hash-password.ts
│   ├── config
│   │   └── typeorm.config.ts
│   ├── main.ts
│   ├── tickets
│   │   ├── dto
│   │   │   ├── create-ticket.dto.ts
│   │   │   ├── finish-ticket.dto.ts
│   │   │   └── review-client.dto.ts
│   │   ├── helpers
│   │   │   ├── ticket-status.enum.ts
│   │   │   └── ticket-type.enum.ts
│   │   ├── tests
│   │   │   ├── ticket-client.controller.spec.ts
│   │   │   ├── ticket-client.service.spec.ts
│   │   │   ├── ticket.controller.spec.ts
│   │   │   ├── ticket.service.spec.ts
│   │   │   ├── ticket-technician.controller.spec.ts
│   │   │   └── ticket-technician.service.spec.ts
│   │   ├── ticket-client
│   │   │   ├── ticket-client.controller.ts
│   │   │   └── ticket-client.service.ts
│   │   ├── ticket.entity.ts
│   │   ├── tickets.controller.ts
│   │   ├── tickets.module.ts
│   │   ├── tickets.repository.ts
│   │   ├── tickets.service.ts
│   │   └── ticket-technician
│   │       ├── ticket-technician.controller.ts
│   │       └── ticket-technician.service.ts
│   └── users
│       ├── clients
│       │   ├── client.entity.ts
│       │   ├── clients.controller.ts
│       │   ├── clients.module.ts
│       │   ├── clients.repository.ts
│       │   ├── clients.service.ts
│       │   ├── dto
│       │   │   ├── auth-client-credentials.dto.ts
│       │   │   └── signin-client.dto.ts
│       │   ├── helpers
│       │   │   ├── client-auth.guard.ts
│       │   │   ├── client-status.enum.ts
│       │   │   ├── get-client.decorator.ts
│       │   │   └── jwt-client.strategy.ts
│       │   └── tests
│       │       ├── clients.controller.spec.ts
│       │       ├── clients.service.spec.ts
│       │       ├── tickets.controller.spec.ts
│       │       └── tickets.service.spec.ts
│       ├── jwt-payload.interface.ts
│       ├── technicians
│       │   ├── dto
│       │   │   ├── auth-tech-credentials.dto.ts
│       │   │   └── signin-technician.dto.ts
│       │   ├── helpers
│       │   │   ├── get-technician.decorator.ts
│       │   │   ├── jwt-technician.strategy.ts
│       │   │   ├── technician-auth.guard.ts
│       │   │   └── technician-status.enum.ts
│       │   ├── technician.entity.ts
│       │   ├── technicians.controller.ts
│       │   ├── technicians.module.ts
│       │   ├── technicians.repository.ts
│       │   ├── technicians.service.ts
│       │   └── tests
│       │       ├── technicians.controller.spec.ts
│       │       └── technicians.service.spec.ts
│       └── user.interface.ts
├── start.sh
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json
```

## Modelo de datos inicial
Diseño de modelación de datos inicial. Cambió un poco en el transcurso del proyecto.
<img src="http://i.imgur.com/GOu5Q2a.png" />

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```.
