PORT=${1-$abcjs_syntax_highlighter}
docker compose run  -e VITE_PORT=$PORT --publish $PORT:$PORT --name=nmp$PORT --rm app bash
