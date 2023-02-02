install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npm install --save-dev eslint-config-airbnb-base
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8