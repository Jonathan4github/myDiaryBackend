module.exports = {
	"root": true,
	"extends": "airbnb-base",
	"env": {
		"node": true,
		"browser": true,
		"es6": true,
		"mocha": true
	},
	"rules": {
		"one-var": 0,
		"one-var-declaration-per-line": 0,
		"new-cap": 0,
		"consistent-return": 0,
		"no-param-reassign": 0,
		"comma-dangle": 0,
		"curly": ["error", "multi-line"],
		"import/no-unresolved": [2, { "commonjs": true }],
		"no-unused-vars": 0,
		"no-shadow": ["error", { "allow": ["req", "res", "err"] }],
		"globals": {
			"window": true,
			"document": true
		},
	}
};