## Install project

Run following commands:
nvm use
npm install
cp .env.example .env

And configure your .env file with correct variables. When the database connection is configured, run:
npx prisma migrate deploy

## Build project
Run following command:
npm run build

### Optional
Import the swapi data with following command:
npm run import:swapi-data

Note: when using SQL Lite, the command fails. More info can be found here : https://github.com/prisma/prisma/issues/11789

### Local development
Run following command for hot reload:
npm run dev

Run following command for the linter:
npm run eslint:fix