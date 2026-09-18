const mysql = require('mysql2/promise');
async function run() {
  const c = await mysql.createConnection({user: 'root', password: 'Ali@786', database: 'school'});
  const [r] = await c.query("SELECT section_id, image_url FROM home_content");
  console.log(r);
  c.end();
}
run();
