import * as bcrypt from 'bcrypt';

export class Common {
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
  static generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  static generate_expirt_time(): Date {
    return new Date(new Date().getTime() + 15 * 60000);
  }
}
