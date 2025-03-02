
import { QueryResult } from 'pg';
import { pool } from '../connection.js';
import promptUser from '../index.js';

const viewAllDepartments = async () => {
    try {
      const result: QueryResult = await pool.query('SELECT * FROM department');
      console.table(result.rows);
    } catch (err) {
      console.error(err);
    } finally {
      promptUser();
    }
  };

  const viewAllRoles = async () => {
    try {
      const result: QueryResult = await pool.query('SELECT * FROM role');
      console.table(result.rows);
    } catch (err) {
      console.error(err);
    } finally {
      promptUser();
    }
  };
  
  const viewAllEmployees = async () => {
    try {
      const result: QueryResult = await pool.query('SELECT * FROM employee');
      console.table(result.rows);
    } catch (err) {
      console.error(err);
    } finally {
      promptUser();
    }
  };

export { viewAllDepartments, viewAllRoles, viewAllEmployees };