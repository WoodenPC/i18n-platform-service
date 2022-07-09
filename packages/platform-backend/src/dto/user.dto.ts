import { User, UsersGroup } from "@prisma/client";

export class GetUserResponseDto {
    public readonly userEmail: string;
    public readonly id: bigint;
    public readonly groups: { id: bigint, groupName: string }[]

    constructor(userModel: User & { groups: UsersGroup[] }) {
        this.userEmail = userModel.userEmail;
        this.id = userModel.id;
        this.groups = userModel.groups.map((groupData) => ({ id: groupData.id, groupName: groupData.groupName }));
    }
}