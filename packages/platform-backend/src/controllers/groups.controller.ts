import { GroupsService } from "@services/groups.service";

export class GroupsController {
    private groupsService: GroupsService;

    constructor({ groupsService }: { groupsService: GroupsService }) {
        this.groupsService = groupsService;
    }

    async createGroup(groupName: string) {

    }

    async deleteGroup() {

    }

    async addUsersToGroup() {

    }

    async removeUsersFromGroup() {

    }
}