import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div style={styles.wrapper}>
      <RegisterForm />
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
