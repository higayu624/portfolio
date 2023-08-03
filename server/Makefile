# up local postgres docker with rebuild
.PHONY: up-local-postgres-docker
up-local-postgres-docker:
	@docker-compose up -d --no-deps --build postgresql

## build local DB
.PHONY: build-local-db
build-local-db: up-local-postgres-docker

## run on local docker (darwin/arm64)
.PHONY: run-on-local-docker-go
run-on-local-docker-go:
	@docker-compose up -d --no-deps --build go

## initialize local development environment---------------------------
.PHONY: init-local-dev
init-local-dev:
	$(MAKE) build-local-db
	$(MAKE) run-on-local-docker-go