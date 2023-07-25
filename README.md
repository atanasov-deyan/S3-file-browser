# S3 bucket browser
A simple implementation of an AWS S3 bucker file explorer. It supports Create, Read and Delete operations as well as browsing the bucket as a filesystem.

## Installation
use your package manager of choice, e.g. npm:
```
npm i
```

add a .env file to the `src` directory, containing the encryption secret. This is used to add an additional layer of security to the app storing your data in local storage.

```
VITE_ENCRYPTION_KEY = ENTER_YOUR_SECRET
```

## Start Locally (dev env)
To start a local instance of the project, run start command with your package manager of choice, e.g. npm:

```
  npm start
```
