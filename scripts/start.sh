#!/usr/bin/env bash

# DISCOGS_USER_TOKEN=token ./scripts/start.sh "$@"
node -r tsconfig-paths/register ./dist/main.js "$@"
