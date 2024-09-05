import pkg from 'pg';
const {Pool} = pkg;

const pool = new Pool({
  // Your database connection details here
  user: 'postgres.iywnjlldlkkmwjtypeqe',
  host: 'aws-0-us-west-1.pooler.supabase.com',
  database: 'postgres',
  password: 'qp.Q!vTYcYzx78J',
  port: 6543,
});

// Export the pool for use in other parts of your application
export default pool;
