import inquirer from 'inquirer';
import { pool } from '../connection.js';
import promptUser from '../index.js';
const viewEmployeesByManager = async () => {
    const { manager_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the manager ID to view employees:',
        },
    ]);
    try {
        const result = await pool.query('SELECT * FROM employee WHERE manager_id = $1', [manager_id]);
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
    const query = `
    SELECT e.id, e.first_name, e.last_name, r.title, d.id AS department
    FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    WHERE d.id = $1;
  `;
    try {
        const result = await pool.query(query, [department_id]);
        console.table(result.rows);
    }
    finally {
        promptUser();
    }
};
export { viewEmployeesByManager, viewEmployeesByDepartment, };
