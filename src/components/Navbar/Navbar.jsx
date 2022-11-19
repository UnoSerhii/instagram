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
        <a className="cnNavbarLink" href="/"><span>Clone Instagram</span></a>
        <UserBadge nickName={nickName} avatarUrl={avatarUrl} id={id} />
      </div>
    </div>
  );
};

export default Navbar;
