import inquirer from 'inquirer';
import { pool } from '../connection.js';
import promptUser from '../index.js';
const deleteDepartment = async () => {
    const { department_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department ID to delete:',
        },
    ]);
    try {
        await pool.query('DELETE FROM department WHERE id = $1', [department_id]);
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
        await pool.query('DELETE FROM role WHERE id = $1', [role_id]);
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
        await pool.query('DELETE FROM employee WHERE id = $1', [employee_id]);
        console.log(`Deleted employee ID ${employee_id}`);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        promptUser();
    }
};
export { deleteDepartment, deleteRole, deleteEmployee };
