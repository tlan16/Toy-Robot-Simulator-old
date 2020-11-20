module.exports = {
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'all',
    printWidth: 120,
    overrides: [
        {
            files: '*.{yml,yaml}',
            options: {
                tabWidth: 2,
            },
        },
    ],
};
