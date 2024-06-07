import bcrypt from "bcrypt";

const comparePasswords = async (password:string, hashedPassword:string) => {
  const correctPassword = await bcrypt.compare(password, hashedPassword);
  return correctPassword;
}

export default comparePasswords;