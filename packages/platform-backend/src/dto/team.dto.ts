import { Team, User } from "@prisma/client";

export class TeamDto {
    private teamName: string;
    // private teamUsers: User[];

    constructor(team: Team) {
        this.teamName = team.teamName;
    }
}