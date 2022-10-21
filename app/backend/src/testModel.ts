import Users from './database/models/Users';

(async () => {
  const users = await Users.findAll();
  console.table(users);
  process.exit(0);
})();
