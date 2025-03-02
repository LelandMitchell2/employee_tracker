import inquirer from 'inquirer';
import { pool } from '../connection.js';
import promptUser from '../index.js';




const addDepartment = async () => {
    const { name } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:',
      },
    ]);
  
    try {
      await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
      console.log(`Added department: ${name}`);
    } catch (err) {
      console.error(err);
    } finally {
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
      await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
      console.log(`Added role: ${title}`);
    } catch (err) {
      console.error(err);
    } finally {
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
      await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
      console.log(`Added employee: ${first_name} ${last_name}`);
    } catch (err) {
      console.error(err);
    } finally {
      promptUser();
    }
  };


  export { addDepartment, addRole, addEmployee };