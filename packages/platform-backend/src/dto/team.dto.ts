import { UsersGroup, User } from "@prisma/client";

export class UsersGroupDto {
    private usersGroupName: string;
    // private teamUsers: User[];

    constructor(usersGroupModel: UsersGroup) {
        this.usersGroupName = usersGroupModel.groupName;
    }
}