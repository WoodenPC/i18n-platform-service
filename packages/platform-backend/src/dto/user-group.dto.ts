import { UsersGroup, User } from "@prisma/client";

export class UsersGroupDto {
    public readonly groupName: string;
    

    constructor(usersGroupModel: UsersGroup) {
        this.groupName = usersGroupModel.groupName;
    }
}