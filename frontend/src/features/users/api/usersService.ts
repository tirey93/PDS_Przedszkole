import { requestClient } from "@/lib/request/requestClient";
import { UserRole } from "@/types/User";

const CREATE_USER_ENDPOINT = "/Authentication/Register";
const DISABLE_USER_ENDPOINT = "/Users/Users";
const ENABLE_USER_ENDPOINT = "/Users/Users";

type CreateUserRequestBody = {
    username: string;
    password: string;
    role: UserRole;
    displayName: string;
};

type DisableUserRequestBody = {
    id: string;
};

type EnableUserRequestBody = {
    id: string;
};

export class UsersService {
    public static async create(body: CreateUserRequestBody): Promise<void> {
        await requestClient.post(CREATE_USER_ENDPOINT, body);
    }

    public static async disable(body: DisableUserRequestBody): Promise<void> {
        await requestClient.post(DISABLE_USER_ENDPOINT, body);
    }

    public static async enable(body: EnableUserRequestBody): Promise<void> {
        await requestClient.post(ENABLE_USER_ENDPOINT, body);
    }
}
