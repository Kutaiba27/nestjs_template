## NestJs-Template Assignment

NestJS-based backend service that provides authentication (web & admin), account management, email/OTP flows, and infrastructure pieces like MongoDB, Redis cache, queues, and Swagger API documentation. It is designed to run locally or inside Docker using the provided compose files.

---

## 1. Install and run

### Prerequisites

- **Node.js**: `>= 22.13.1` (see `package.json`)
- **Yarn**: `1.x`
- **MongoDB**: `8.0.12` (running locally or via Docker)
- **Redis**: `8.2.0` (running locally or via Docker)

### 1.1. Install dependencies

```bash
yarn install
```

### 1.2. Configure environment

Copy the example env file and adjust values:

```bash
cp .env.example .env
# then edit .env (MongoDB URI, Redis, JWT, email, app host/port, swagger credentials, etc.)
```

### 1.3. Run the app (development)

```bash
yarn start:dev
```

By default the app will listen on:

- **Host**: value of `app.host` from env (e.g. `localhost`)
- **Port**: value of `app.port` from env (e.g. `3000`)

You can also use Docker (dev) via the provided scripts:

```bash
yarn containers-up:dev:build   # build & start containers (backend + deps)
# or
yarn containers-up:dev         # start containers without rebuilding
```

To stop dev containers:

```bash
yarn containers-down:dev
```

### 1.4. Run the seeders (initial data)

After the app dependencies (MongoDB/Redis) are up and the `.env` file is configured, you can seed initial data (such as accounts or other required records) using:

```bash
yarn seed
```

This command runs the separate NestJS app inside the `seeders/` folder and will connect to the same database defined in your `.env`. Run it once for a fresh environment, or whenever you need to reset/recreate the seed data.

---

## 2. Open Swagger docs

Swagger is configured in `src/package/doc/swagger/swagger.service.ts` and is mounted under:

```text
http://<APP_HOST>:<APP_PORT>/<APP_GLOBAL_PREFIX>/v<APP_VERSION>/docs
```

Where the pieces come from your environment configuration:

- `APP_HOST` / `APP_PORT` → `app.host` and `app.port`
- `APP_GLOBAL_PREFIX` → `app.globalPrefix` (for example: `api`)
- `APP_VERSION` → `app.version` (for example: `1`, resulting in `v1`)

So for a common local setup like:

- `app.host = http://localhost`
- `app.port = 3000`
- `app.globalPrefix = api`
- `app.version = 1`

Swagger will be available at:

```text
http://localhost:3000/api/v1/docs
```

If basic auth is enabled for Swagger (via `swagger.userName` / `swagger.password`), use those credentials when prompted in the browser.

---

## 3. Folder structure (overview)

High-level view of the main folders in the project (without listing specific files):

```text
src/
  common/
  infrastructure/
  modules/
  package/

seeders/
templates/
docker/
config/
```

- **`infrastructure/`**: Holds the infrastructure configuration and services needed for the server to run (database connections, cache, general app config, logging, queues, etc.).
- **`package/`**: Contains **reusable code** that can be shared across the project (decorators, guards, error handling, utilities, Swagger setup, etc.).
- **`modules/`**: Contains the **domain** of the project; the main business logic grouped into modules (auth, accounts, email, etc.).

### Example: `modules/account`

The `account` module is a good example of how a domain is structured:

```text
src/
  modules/
    account/
      api/
      behavior/
      data/
      service/
```

- **`api/`**: HTTP layer for the account domain (controllers, request/response DTOs, routes for admin/web, etc.).
- **`behavior/`**: Interfaces and abstractions that describe the business behavior of the account domain (what the module should do, not how it is implemented).
- **`data/`**: Data-access related layer for the account domain (working with persistence models, queries, and mapping between database and domain objects).
- **`service/`**: Concrete services that implement the behavior layer and coordinate between `api`, `data`, and infrastructure (business logic for accounts).

