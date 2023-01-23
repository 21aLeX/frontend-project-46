install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx lint 
test:
	npm test