// imports 
const connect = require('./connection');
const inquirer = require('inquirer');
// https://www.npmjs.com/package/console.table docs referenced for console log
const consoleTable = require('console.table');
const welcome = () => {
    console.log("***********************************")
    console.log("*           Welcome to            *")
    console.log("*        EMPLOYEE MANAGER         *")
    console.log("*                                 *")
    console.log("***********************************")
}
// display Welcome to EMPLOYEE MANAGER banner
welcome();

//  User prompt to select tasks
const tasks = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'task',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'Add employees',
                'Update Employee role',
                'View all roles',
                'Add role',
                'View all Departments',
                'Add Department',
                'Quit',
            ],

        },
    ])
        // based on user response use the function that corresponds to the task
        .then(answer => {
            if (answer.task === 'View All Employees') {
                viewAllEmployees();
            } else if (answer.task === 'Add Employee') {
                addEmployee();
            } else if (answer.task === 'Update Employee Role') {
                updateEmpRole();
            } else if (answer.task === 'View All Roles') {
                viewAllRoles();
            } else if (answer.task === 'Add a Role') {
                addRole();
            } else if (answer.task === 'View All Departments') {
                viewAllDepartments();
            } else if (answer.task === 'Add a Department') {
                addDepartment();
            } else if (answer.task === 'Quit') {
                connection.end()
            }
        });
};

// functions for each task
