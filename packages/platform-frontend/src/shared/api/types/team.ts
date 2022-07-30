export type Team = {
  teamName: string;
  id: string;
};

export type UserTeamRole = 'ADMIN' | 'MEMBER' | 'OWNER';

export type TeamUserInfo = {
  id: string;
  teamName: string;
  userRole: UserTeamRole;
};

export type TeamsUserInfo = TeamUserInfo[];
