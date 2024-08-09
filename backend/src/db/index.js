import {Pool} from 'pg';


const pool = new Pool({
  // Your database connection details here
  user: 'your_database_user',
  host: 'your_database_host',
  database: 'your_database_name',
  password: 'your_database_password',
  port: 5432,
});

// Export the pool for use in other parts of your application
export default pool;
