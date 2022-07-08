import { UsersGroup, User } from "@prisma/client";

export class UsersGroupDto {
    private groupName: string;
    

    constructor(usersGroupModel: UsersGroup) {
        this.groupName = usersGroupModel.groupName;
    }
}