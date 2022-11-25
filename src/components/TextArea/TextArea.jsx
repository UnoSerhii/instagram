import Button from "../Button/Button";
import "./styles.scss";

const TextArea = ({ value, onChange, placeholder, isLoading, onSubmit, buttonText }) => {
  return (
    <div className="cnTextAreaWrapper">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="cnTextArea"
      />
      <Button className="cnSendButton" disabled={isLoading} onClick={onSubmit}>{buttonText}</Button>
    </div>
  );
};

export default TextArea;
