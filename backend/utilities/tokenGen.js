import jwt from 'jsonwebtoken';

const tokenGenerate = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRETE, {
    expiresIn: '24h'
  })
}

export default tokenGenerate;