import "./Header.css";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

export const Header = ({
  isLoggedIn,
  handleLogOut
}) => {
  return (
    <header className="mainHeader">
      <nav>
        {
          isLoggedIn
          ? <> 
              Добро пожаловать,&nbsp;<strong className="userName">{localStorage.getItem('userName')}</strong>
              <button className="blackBtn" onClick={handleLogOut}>
                <MeetingRoomIcon />
                Выход
              </button>
            </>
          : 'Добро пожаловать, незнакомец'
        }
      </nav>
    </header>
  );
};
