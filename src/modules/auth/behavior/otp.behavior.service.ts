export abstract class IOTPService {

    abstract generate(): string;


    abstract store(email: string): Promise<string>;

    abstract verify(email: string, otp: string): Promise<boolean>;

    abstract delete(email: string): Promise<void>;

    abstract get(email: string): Promise<string | null>;
}
