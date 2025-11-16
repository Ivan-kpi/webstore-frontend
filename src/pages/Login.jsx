import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div style={styles.wrapper}>
      <LoginForm />
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px"
  }
};
