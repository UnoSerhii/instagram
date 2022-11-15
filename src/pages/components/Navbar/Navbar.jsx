import UserBadge from "../UserBadge/UserBadge";
import "./styles.scss";

const Navbar = ({
  nickName,
  avatarUrl,
  id,
}) => {
  return (
    <div className="cnNavbarRoot">
      <div className="cnNavbarWrapper">
        <span>My_Instagram</span>
        <UserBadge nickName={nickName} avatarUrl={avatarUrl} id={id} />
      </div>
    </div>
  );
};

export default Navbar;
