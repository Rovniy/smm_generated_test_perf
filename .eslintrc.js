module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true,
		'jest/globals': true,
	},
	parserOptions: {
		parser: '@babel/eslint-parser',
		sourceType: 'module',
		ecmaVersion: 2017,
	},
	extends: [
		'eslint:recommended',
		'@nuxtjs',
		'plugin:nuxt/recommended',
		'plugin:sonarjs/recommended',
	],
	plugins: [
		'import',
		'node',
		'no-loops',
		'promise',
		'vue',
		'jest',
	],
	rules: {
		'import/no-unresolved': 'warn',
		'no-console': [
			'error', {
				allow: [
					'warn',
					'error',
				],
			},
		],
		'no-trailing-spaces': 'off',
		'no-mixed-spaces-and-tabs': 'off',
		'dot-notation': 'warn',
		'object-curly-spacing': [ 'warn', 'always', {
			arraysInObjects: true,
			objectsInObjects: true,
		}],
		'array-bracket-spacing': [ 'warn', 'always', {
			singleValue: true,
			objectsInArrays: false,
			arraysInArrays: false,
		}],
		'no-loops/no-loops': 'off',
		'comma-dangle': [
			'error', {
				// eslint-disable-next-line sonarjs/no-duplicate-string
				arrays: 'always-multiline',
				objects: 'always-multiline',
				imports: 'always-multiline',
				exports: 'always-multiline',
				functions: 'always-multiline',
			},
		],
		'semi-style': [
			'error',
			'last',
		],
		// 'vue/script-setup-uses-vars': 'off',
		'no-duplicate-string': 'off',
		'no-case-declarations': 'off',
		'no-extra-semi': 'error',
		semi: [ 'warn', 'never' ],
		'arrow-parens': [
			'error',
			'as-needed',
		],
		'space-before-function-paren': [
			'error', {
				anonymous: 'never',
				named: 'never',
				asyncArrow: 'never',
			},
		],
		'no-tabs': [ 'error', { allowIndentationTabs: true }],
		indent: [ 'warn', 'tab', {
			SwitchCase: 1,
		}],
		'no-empty': [ 'warn', {
			allowEmptyCatch: true,
		}],
		'operator-linebreak': [
			'warn',
			'before',
		],
		'linebreak-style': [
			'warn',
			'unix',
		],
		quotes: [
			'warn',
			'single',
		],
		'no-plusplus': [
			'error', {
				allowForLoopAfterthoughts: true,
			},
		],
		'no-param-reassign': [
			'error', {
				props: false,
			},
		],
		'brace-style': [
			'warn',
			'stroustrup',
		],
		'vue/no-v-html': 'off',
		'import/extensions': [
			'error',
			'always', {
				ignorePackages: true,
			},
		],
		yoda: [
			'warn',
			'always', {
				onlyEquality: true,
			},
		],
		'vue/max-attributes-per-line': [
			'warn', {
				singleline: 2,
				multiline: {
					max: 1,
					allowFirstLine: false,
				},
			},
		],
		'vue/html-closing-bracket-newline': [ 'warn', {
			singleline: 'never',
			multiline: 'never',
		}],
		'vue/html-indent': [ 'warn', 'tab', {
			attribute: 1,
			baseIndent: 1,
			closeBracket: 0,
			alignAttributesVertically: true,
			ignores: [],
		}],
		'nuxt/no-cjs-in-config': 'off',
		'sonarjs/no-duplicate-string': 'off',
		'sonarjs/cognitive-complexity': 'off',
	},
	settings: {
		'import/resolver': {
			nuxt: true,
			webpack: true,
		},
		'import/core-modules': [
			'vue',
			'vuex',
		],
	},
}
