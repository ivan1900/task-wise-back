db-permissions:
	sudo chmod 775 docker/mysql -R

docker-build: 
	docker compose --env-file ./.env -f docker/docker-compose.dev.yml -p "task-wise" build

run-daemonized: docker-build
	docker compose --env-file ./.env -f docker/docker-compose.dev.yml -p "task-wise" up -d

dockers-down:
	docker compose --env-file ./.env -f docker/docker-compose.dev.yml -p "task-wise" down