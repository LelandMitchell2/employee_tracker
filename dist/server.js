import express from 'express';
import { pool, connectToDb } from './connection.js';
import inquirer from 'inquirer';
connectToDb();
const PORT = process.env.PORT || 3001;
const app = express();
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const promptUser = async () => {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Update an employee manager',
                'View employees by manager',
                'View employees by department',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'View the total utilized budget of a department',
            ],
        },
    ]);
    switch (action) {
        case 'View all departments':
            viewAllDepartments();
            break;
        case 'View all roles':
            viewAllRoles();
            break;
        case 'View all employees':
            viewAllEmployees();
            break;
        case 'Add a department':
            addDepartment();
            break;
        case 'Add a role':
            addRole();
            break;
        case 'Add an employee':
            addEmployee();
            break;
        case 'Update an employee role':
            updateEmployeeRole();
            break;
        case 'Update an employee manager':
            updateEmployeeManager();
            break;
        case 'View employees by manager':
            viewEmployeesByManager();
            break;
        case 'View employees by department':
            viewEmployeesByDepartment();
            break;
        case 'Delete a department':
            deleteDepartment();
            break;
        case 'Delete a role':
            deleteRole();
            break;
        case 'Delete an employee':
            deleteEmployee();
            break;
        case 'View the total utilized budget of a department':
            viewDepartmentBudget();
            break;
        default:
            console.log(`Invalid action: ${action}`);
            break;
    }
};
const viewAllDepartments = async () => {
    try {
        const result = await pool.query('SELECT * FROM departments');
        console.table(result.rows);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        promptUser();
    }
};
const viewAllRoles = async () => {
    try {
        const result = await pool.query('SELECT * FROM roles');
        console.table(result.rows);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        promptUser();
    }
};
const viewAllEmployees = async () => {
    try {
        const result = await pool.query('SELECT * FROM employees');
        console.table(result.rows);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        promptUser();
    }
};
const addDepartment = async () => {
    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:',
        },
    ]);
    try {
        await pool.query('INSERT INTO departments (name) VALUES ($1)', [name]);
        console.log(`Added department: ${name}`);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        promptUser();
    }
};
const addRole = async () => {
    const { title, salary, department_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the name of the role:',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for the role:',
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department ID for the role:',
        },
    ]);
    try {
        await pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
        console.log(`Added role: ${title}`);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        promptUser();
    }
};
const addEmployee = async () => {
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the employee:',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the employee:',
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the role ID for the employee:',
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the manager ID for the employee:',
        },
    ]);
    try {
        await pool.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
        console.log(`Added employee: ${first_name} ${last_name}`);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        promptUser();
    }
};
const updateEmployeeRole = async () => {
    const { employee_id, role_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'Enter the ID of the employee you want to update:',
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the new role ID for the employee:',
        },
    ]);
    try {
        await pool.query('UPDATE employees SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
        console.log(`Updated employee ID ${employee_id} with new role ID ${role_id}`);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        promptUser();
    }
};
const updateEmployeeManager = async () => {
    const { employee_id, manager_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'Enter the ID of the employee you want to update:',
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the new manager ID for the employee:',
        },
    ]);
    try {
        await pool.query('UPDATE employees SET manager_id = $1 WHERE id = $2', [manager_id, employee_id]);
        console.log(`Updated employee ID ${employee_id} with new manager ID ${manager_id}`);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        promptUser();
    }
};
const viewEmployeesByManager = async () => {
    const { manager_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the manager ID to view employees:',
        },
    ]);
    try {
        const result = await pool.query('SELECT * FROM employees WHERE manager_id = $1', [manager_id]);
        console.table(result.rows);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        promptUser();
    }
};
const viewEmployeesByDepartment = async () => {
    const { department_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department ID to view employees:',
        },
    ]);
    try {
        const result = await pool.query('SELECT * FROM employees WHERE department_id = $1', [department_id]);
        console.table(result.rows);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        promptUser();
    }
};
const deleteDepartment = async () => {
    const { department_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department ID to delete:',
        },
    ]);
    try {
        await pool.query('DELETE FROM departments WHERE id = $1', [department_id]);
        console.log(`Deleted department ID ${department_id}`);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        promptUser();
    }
};
const deleteRole = async () => {
    const { role_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the role ID to delete:',
        },
    ]);
    try {
        await pool.query('DELETE FROM roles WHERE id = $1', [role_id]);
        console.log(`Deleted role ID ${role_id}`);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        promptUser();
    }
};
const deleteEmployee = async () => {
    const { employee_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'Enter the employee ID to delete:',
        },
    ]);
    try {
        await pool.query('DELETE FROM employees WHERE id = $1', [employee_id]);
        console.log(`Deleted employee ID ${employee_id}`);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        promptUser();
    }
};
const viewDepartmentBudget = async () => {
    const { department_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department ID to view the total utilized budget:',
        },
    ]);
    try {
        const result = await pool.query('SELECT SUM(salary) FROM roles WHERE department_id = $1', [department_id]);
        console.table(result.rows);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        promptUser();
    }
};
// Default response for any other request (Not Found)
app.use((_req, res) => {
    res.status(404).end();
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
