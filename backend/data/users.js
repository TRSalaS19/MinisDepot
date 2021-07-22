import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: true
  },
  {
    name: 'Mini Sanchez',
    email: 'mini@example.com',
    password:  bcrypt.hashSync('12345', 10)
  },
  {
    name: 'Stinky Ruiz',
    email: 'stinky@example.com',
    password:  bcrypt.hashSync('12345', 10)
  },
  {
    name: 'Brownie Ruiz',
    email: 'brownie@example.com',
    password:  bcrypt.hashSync('12345', 10)
  },
]

export default users;