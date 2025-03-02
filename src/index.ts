import express from 'express';
import {connectToDb} from './connection.js';
import inquirer from 'inquirer';
// import { pool } from './connection.js';
// import { QueryResult } from 'pg';
import { viewAllDepartments, viewAllRoles, viewAllEmployees } from './queries/view-all.js';
import { addDepartment, addRole, addEmployee } from './queries/add.js';
import { updateEmployeeRole, updateEmployeeManager } from './queries/update.js';
import { viewEmployeesByManager, viewEmployeesByDepartment } from './queries/view.js';
import { deleteDepartment, deleteRole, deleteEmployee } from './queries/delete.js';
import { viewDepartmentBudget } from './queries/budget.js';

connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



console.log('Welcome to the Employee Tracker!');


// Prompt user for action


const promptUser = async () => {
  const { action } = await inquirer
  .prompt([
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


// Default response for any other request (Not Found)
app.use((_req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  promptUser();
});


export default promptUser;