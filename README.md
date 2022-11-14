Welcome to my test project.

To start project download it.

For work you need to use Docker

Start comand $ docker compose up --build

It will start 3 containers: node (backend part), postgres_db (database) and client (frondend part)

After all containers is started, you need to seed your database.
In Terminal in the project folder you need to go inside node container
use comand $ docker exec -it node sh
Then inside container start three comands:
    $ npx prisma generate
    $ npx prisma migrate dev
    $ npx ts-node prisma/seed.ts 
After this you can use "exit" comand to get out of container.
Project is ready for use.
Client start at localhost:8080

You need to registrate your account. Then log in and you can sort names in list by drag and drop.

