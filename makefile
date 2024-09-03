start:
	$(info ~~~~~~~~~~~ STARTING DEPENDENCIES ~~~~~~~~~~~)
	chmod +x ./scripts/start.sh && ./scripts/start.sh

stop:
	$(info ~~~~~~~~~~ STOPPING DEPENDENCIES ~~~~~~~~~)
	docker-compose -f docker-compose.yml --env-file .env.local down -v

