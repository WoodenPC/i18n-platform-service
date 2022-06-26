import { Team, User } from "@prisma/client";

export class TeamDto {
    private teamName: string;
    // private teamUsers: User[];

    constructor(teamModel: Team) {
        this.teamName = teamModel.teamName;
    }
}