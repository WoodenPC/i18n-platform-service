import cn from 'classnames';
import { Avatar, Group, Panel, SimpleCell } from '@vkontakte/vkui';
import { Link } from 'react-router-dom';
import styles from './user-context-menu.module.scss';

type UserContextMenuProps = {
  className?: string;
};

const user = { id: '1', userEmail: 'test-user@mail.ru' };
const currentTeam = {
  id: '1',
  teamName: 'my-team1',
  userRole: 'ADMIN',
};
const teamsInfo = [
  { id: '1', teamName: 'my-team1', userRole: 'ADMIN' },
  { id: '2', teamName: 'my-team2', userRole: 'ADMIN' },
  { id: '3', teamName: 'my-team3', userRole: 'ADMIN' },
  {
    id: '4',
    teamName: 'my-team413131231231213312312ffffffff',
    userRole: 'ADMIN',
  },
  { id: '5', teamName: 'my-team5', userRole: 'ADMIN' },
  { id: '6', teamName: 'my-team6', userRole: 'ADMIN' },
  { id: '7', teamName: 'my-team7', userRole: 'ADMIN' },
  { id: '8', teamName: 'my-team8', userRole: 'ADMIN' },
  { id: '9', teamName: 'my-team9', userRole: 'ADMIN' },
  { id: '10', teamName: 'my-team10', userRole: 'ADMIN' },
];

export const UserContextMenu = (props: UserContextMenuProps) => {
  const { className } = props;
  return (
    <Panel className={cn(className, styles.userContextMenu)}>
      <Group mode='plain'>
        <div className={styles.teamsListWrapper}>
          {teamsInfo.length > 1 &&
            teamsInfo.map(
              (teamInfo) =>
                teamInfo.id !== currentTeam.id && (
                  <Link to={`/teams/${teamInfo.id}/projects`} key={teamInfo.id}>
                    <SimpleCell
                      before={<Avatar />}
                      description={teamInfo.userRole}
                      className={styles.menuCell}
                    >
                      {teamInfo.teamName}
                    </SimpleCell>
                  </Link>
                )
            )}
        </div>
        <SimpleCell className={styles.createNewTeamCell}>
          Создать новую команду
        </SimpleCell>
      </Group>
      <Group mode='plain'>
        <Link to={`/teams/${currentTeam.id}/projects`}>
          <SimpleCell
            before={<Avatar />}
            description={currentTeam.userRole}
            className={styles.menuCell}
          >
            {currentTeam.teamName}
          </SimpleCell>
        </Link>
      </Group>
      <Group mode='plain'>
        <Link to='/profile'>
          <SimpleCell description={user.userEmail} className={styles.menuCell}>
            Настройки профиля
          </SimpleCell>
        </Link>
      </Group>
      <Group mode='plain'>
        {/* TODO */}
        <SimpleCell onClick={() => {}} className={styles.menuCell}>
          Выход
        </SimpleCell>
      </Group>
    </Panel>
  );
};
