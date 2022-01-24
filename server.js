// imports 
const connection = require('./connection');
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
                updateEmployeeRole();
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
const viewAllEmployees = async () => {
    try {
        const sql = `SELECT employee.id, 
        employee.firstName AS 'First Name', 
        employee.lastName AS 'Last Name', 
        role.id AS 'Role Id',
        role.title AS Title, 
        role.salary AS Salary, 
        department.name AS Department,
        CONCAT (manager.firstName, " ", manager.lastName) AS Manager
    FROM employee 
        LEFT JOIN role ON employee.role_id = role.id 
        LEFT JOIN department on role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id;`;
        const [employee] = await connection.query(sql);
        console.log("View all employees")
        console.table(employee);
        options();
    } catch (error) {
        console.log("error");
    }
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: `Please enter employee's first name:`,
        },
        {
            type: 'input',
            name: 'lastName',
            message: `Please enter employee's last name:`,
        },
    ])
        .then(answers => {
            (async () => {
                try {
                    const newEmpFields = [answers.firstName, answers.lastName];
                    const roleList = 'SELECT id, title FROM role;';
                    const [result] = await connection.query(roleList);
                    const role = result.map(({ title, id }) => ({ name: title, value: id }));
                    // prompt user to select a role for the new employee
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'role',
                                message: 'Select a role:',
                                choices: role,
                            },
                        ])
                        .then(roleChoice => {
                            try {
                                // get selected role
                                const role = roleChoice.role;
                                // push role to new employee fields array
                                newEmpFields.push(role);
                                // insert new employee into employee table
                                const addSQL = 'INSERT INTO employee(firstName, lastName, role_id) VALUES(?, ?, ?);';
                                connection.query(addSQL, newEmpFields);
                                console.log(`\n${answers.firstName} ${answers.lastName} has been sucessfully added.\n`);
                                // call view all employees function to see that the new role has been added
                                viewAllEmployees();
                            } catch (error) {
                                console.error(error);
                            }
                        })
                } catch (error) {
                    console.error(error);
                }
            })();
        });
}

// const updateEmployeeRole =

// const viewAllRoles =

// const addRole =

// const viewallDepartments =

// const addDepartment = 