export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div style={styles.errorBox}>
      {message}
    </div>
  );
}

const styles = {
  errorBox: {
    padding: "10px",
    background: "#ffdddd",
    border: "1px solid #cc0000",
    borderRadius: "5px",
    color: "#900",
    marginBottom: "15px",
    textAlign: "center",
  }
};

