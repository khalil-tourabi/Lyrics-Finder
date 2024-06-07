import bcrypt from "bcrypt"

const hashPassword = async(password:string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (err:any) {
    throw new Error("Error hashing password: " + err.message);
  }
}

export default hashPassword;