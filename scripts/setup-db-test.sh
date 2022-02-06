#!/bin/sh

clear

NODE_ENV=test npx jest --clearCache
wait
NODE_ENV=test npx sequelize-cli db:drop --env test
wait
NODE_ENV=test npx sequelize-cli db:create --env test
wait
NODE_ENV=test npx sequelize-cli db:migrate --env test
wait
NODE_ENV=test npx sequelize-cli db:seed:all --env test
wait

sleep 1
