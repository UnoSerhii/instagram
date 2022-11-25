import "./styles.scss";

const UserCounter = ({ text, count, className }) => {
  return (
    <div className={className}>
      <span className="cnUserCounterCount">{count}</span>
      <span>{text}</span>
    </div>
  );
};

export default UserCounter;
