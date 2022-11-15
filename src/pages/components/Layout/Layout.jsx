import Navbar from '../Navbar/Navbar';
import './styles.scss';

const Layout = ({
  nickName,
  avatarUrl,
  id,
  children,
}) => {
  return (
    <div className="onLayoutRoot">
      <Navbar nickName={nickName} avatarUrl={avatarUrl} id={id} />
      <div className="onLayoutBody">
        {children}
      </div>
    </div>
  )
}

export default Layout