.PHONY: start build

start: build
	./scripts/start.secrets.sh create -l 495139 -w 3000 -H 1800

build:
	yarn build

prev: build
	MOCK_DISCOGS=true ./scripts/start.secrets.sh create -l 495139 -w 1200 -H 1200 -O '#4074b8' -B 'multiply' -g
	qlmanage -p output.png
