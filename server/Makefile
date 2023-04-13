.PHONY: migrate-local-data
migrate-local-data:
	@docker-compose run --rm flyway -locations=filesystem:/flyway/sql_local migrate

.PHONY:	migrate-local-db
migrate-local-db:
	@docker-compose run --rm flyway migrate
	$(MAKE) migrate-local-data

# clean local db (use flyway docker)
.PHONY: clean-local-db
clean-local-db:
	@docker-compose run --rm flyway clean

# up local postgres docker with rebuild
.PHONY: up-local-postgres-docker
up-local-postgres-docker:
	@docker-compose up -d --no-deps --build postgresql

## build local DB
.PHONY: build-local-db
build-local-db: up-local-postgres-docker migrate-local-db

## run on local docker (darwin/arm64)
.PHONY: run-on-local-docker-go
run-on-local-docker-go:
	@docker-compose up -d --no-deps --build go

## initialize local development environment
.PHONY: init-local-dev
init-local-dev:
	$(MAKE) build-local-db
	$(MAKE) run-on-local-docker-go

## fresh local db
.PHONY: fresh-local-db
fresh-local-db:
	$(MAKE) clean-local-db
	$(MAKE) migrate-local-db

## display db info
.PHONY: info-local-db
info-local-db:
	@docker-compose run --rm flyway info

## if you have migrate error.
.PHONY: repair-local-db
repair-local-db:
	@docker-compose run --rm flyway repair