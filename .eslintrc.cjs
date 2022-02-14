module.exports = {
	root: true,
	extends: ['eslint:recommended', 'prettier'],
	plugins: ['svelte3'],
	overrides: [
		{
			files: ['*.svelte, *.js, *.cjs'],
			processor: 'svelte3/svelte3'
		}
	],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
		// Common
		semi: ['warn', 'never'],
		quotes: ['warn', 'single'],
		indent: [
			'warn',
			'tab',
			{
				SwitchCase: 1,
				ignoredNodes: ['TemplateLiteral']
			}
		],
		'no-console': 'off',
		'no-case-declarations': 'off',
		'no-empty': [
			'warn',
			{
				allowEmptyCatch: true
			}
		],
		'no-trailing-spaces': 'off',
		'no-unused-vars': 'warn',
		'no-mixed-spaces-and-tabs': 'off',
		'object-curly-spacing': [
			'warn',
			'always',
			{
				arraysInObjects: true,
				objectsInObjects: true
			}
		],
		'array-bracket-spacing': [
			'warn',
			'always',
			{
				singleValue: true,
				objectsInArrays: false,
				arraysInArrays: false
			}
		],
		'template-curly-spacing': 'off'
	}
};
