install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint --no-eslintrc --config .eslintrc.yml .
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8
lodash:
	npm i --save lodash