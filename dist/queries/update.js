import inquirer from 'inquirer';
import { pool } from '../connection.js';
import promptUser from '../index.js';
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
        await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
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
        await pool.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [manager_id, employee_id]);
        console.log(`Updated employee ID ${employee_id} with new manager ID ${manager_id}`);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        promptUser();
    }
};
export { updateEmployeeRole, updateEmployeeManager };
