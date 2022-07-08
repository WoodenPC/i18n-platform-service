export class GroupsApi {
  private static instance: GroupsApi;

  static getInstance() {
    if (!this.instance) {
      return new GroupsApi();
    }

    return this.instance;
  }
}
