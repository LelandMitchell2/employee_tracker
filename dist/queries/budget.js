import inquirer from 'inquirer';
import { pool } from '../connection.js';
import promptUser from '../index.js';
const viewDepartmentBudget = async () => {
    const { department_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department ID to view the total utilized budget:',
        },
    ]);
    try {
        const result = await pool.query('SELECT d.id AS department, SUM(r.salary) AS total_budget FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id WHERE d.id = $1 GROUP BY d.id;', [department_id]);
        console.table(result.rows);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        promptUser();
    }
};
export { viewDepartmentBudget };
