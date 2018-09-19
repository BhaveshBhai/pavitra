## Install dependency
> npm install

## run the app
> npm start

## Export database
> Exprort database with name 'mahatmai_pavitra_creation'
> Import in remote database connection
> REPLACE 'DEFINER=`root`@`localhost`' with ''(blank string)
> Execute the query
> remove first two line from dbdumb and create database manully and restore inside it.

## deploy to heroku
>heroku login
>heroku git:remote -a pavitra-creation
>git push heroku master

# Data base migration script run after to change current user of database
>show procedure status;
>UPDATE `mysql`.`proc` p SET definer = 'root@localhost' WHERE db='mahatmai_pavitra_creation'