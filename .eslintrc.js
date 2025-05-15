module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // Indentation
    'indent': ['error', 2],
    
    // Semicolons
    'semi': ['error', 'always'],
    
    // Quotes
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    
    // Variable declarations
    'no-var': 'error',
    'prefer-const': 'error',
    
    // Code style
    'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
    'comma-dangle': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    
    // Other
    'no-console': 'off', // Allow console for this project
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'max-len': ['warn', { 'code': 100, 'ignoreStrings': true, 'ignoreTemplateLiterals': true }],
    'eol-last': ['error', 'always']
  }
}; 