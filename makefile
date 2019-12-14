build-backend: 
	docker build -t cagette-backend ./backend

serve-backend: build-backend
	docker run \
		--name cagette-backend \
		--rm \
		--interactive \
		--tty \
		--volume=$$(pwd)/backend/src:/usr/src/app/src \
		--publish 8080:8080 \
		cagette-backend

build-frontend:
	docker build -t cagette-frontend ./frontend

serve-frontend: build-frontend
	docker run \
		--name cagette-frontend \
		--rm \
		--interactive \
		--tty \
		--volume=$$(pwd)/frontend:/usr/src/app/ \
		--publish 3000:3000 \
		cagette-frontend

test-frontend: build-frontend
	docker run \
		--name cagette-frontend \
		--rm \
		--interactive \
		--tty \
		--volume=$$(pwd)/frontend:/usr/src/app/ \
		--publish 3000:3000 \
		cagette-frontend \
		yarn test
