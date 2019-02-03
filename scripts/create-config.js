const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs');
const generator = require('generate-password');
const pwl = 16;

let questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter a project name',
        default: 'Headless WordPress Site'
    },
    {
        type: 'input',
        name: 'dbname',
        message: 'Enter database name',
        default: 'wordpress'
    },
    {
        type: 'input',
        name: 'dbuser',
        message: 'Enter database username',
        default: 'wordpress'
    },
    {
        type: 'input',
        name: 'admin_user',
        message: 'Default admin username',
        default: 'admin'
    },
    {
        type: 'input',
        name: 'admin_email',
        message: 'Admin email address',
        default: 'no-reply@localhost',
    },
];


inquirer.prompt(questions).then(answers => {
    console.log("\n");
    let content = 
`#MySQL Config
MYSQL_ROOT_PASSWORD="${generator.generate({ length: pwl, numbers: true })}"
MYSQL_DATABASE="${answers.dbname}"
MYSQL_USER="${answers.dbuser}"
MYSQL_PASSWORD="${generator.generate({ length: pwl, numbers: true })}"
MYSQL_PORT=3306

#WordPress Config
WORDPRESS_PORT=8000
WORDPRESS_PAGE_TITLE="${answers.name}"
WORDPRESS_ADMIN_USER="${answers.admin_user}"
WORDPRESS_ADMIN_PASSWORD="${generator.generate({ length: pwl, numbers: true })}"
WORDPRESS_ADMIN_EMAIL="${answers.admin_email}"
`
/* To-do: Add support for passwords and ACF Key etc */

    fs.writeFile(".env", content , (err) => {
        if(err){
            console.log(chalk.red('Woops! Could not create the file! '));
        }

        console.log(`
${chalk.green('Enviroment file successfully created!')}

${chalk.blue('Ready to go? Run')} ${chalk.bgMagenta('npm run start')}

${chalk.red('Have fun! ❤')}
        `)
    })

});
