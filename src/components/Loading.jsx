export default function Loading() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.spinner}></div>
      <span>Завантаження...</span>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
  },
  spinner: {
    width: "18px",
    height: "18px",
    border: "3px solid #ccc",
    borderTop: "3px solid #333",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
};
