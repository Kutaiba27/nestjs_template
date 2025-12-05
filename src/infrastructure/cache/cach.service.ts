

export abstract class ICacheService {
    abstract connect(): Promise<void>;
    abstract disconnect(): Promise<void>;
    abstract get<T = any>(key: string): Promise<T | null>;
    abstract set({ key, value, ttl }: { key: string, value: any, ttl?: number }): Promise<void>;
    abstract delete(key: string[]): Promise<number>;
    abstract hgetAll(key: string): Promise<{ [key: string]: string } | null>;
    abstract hset(key: string, field: string, value: any): Promise<number>;
    abstract lrange(key: string, start: number, end: number): Promise<string[]>;
    abstract exists(key: string): Promise<boolean>;
    abstract ttl(key: string): Promise<number>;
}