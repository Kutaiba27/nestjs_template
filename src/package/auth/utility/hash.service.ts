import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export abstract class IHashService {
    abstract hashPassword(data: string): Promise<string>;
    abstract comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
}

@Injectable()
export class HashService implements IHashService {
    async hashPassword(data: string): Promise<string> {
        return bcrypt.hash(data, SALT_ROUNDS);
    }

    async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}