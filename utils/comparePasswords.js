import bcrypt from "bcrypt";

const comparePasswords = async (password, hashedPassword) => {
  const correctPassword = await bcrypt.compare(password, hashedPassword);
  return correctPassword;
}

export default comparePasswords;