interface ErrorMessageProps {
  errorMsg: string;
}

function ErrorMessage({ errorMsg }: ErrorMessageProps) {
  return (
    <p className="error">
      <span>⛔</span> {errorMsg}
    </p>
  );
}

export default ErrorMessage;
