import "./Header.css";

export const Header = ({
  isLoggedIn,
  handleLogOut
}) => {
  return (
    <header>
      <nav>
        {
          isLoggedIn
          ? <>Добро пожаловать, {
            localStorage.getItem('userName')
          } <button className="blackBtn" onClick={handleLogOut}>Выход</button> </>
          : 'Добро пожаловать, незнакомец'
        }
        
      </nav>
    </header>
  );
};
