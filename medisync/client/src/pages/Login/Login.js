import React from "react";
import { TopNavigation, Footer, Login } from "../../components";
const LoginPage = () => {
  return (
    <div className="container" style={styles.container}>
      <TopNavigation />
      <Login />
      <div>
        <Footer />
      </div>
    </div>
  );
};
const styles = {
  container: { BoxSizing: "border-box" },
};
export default LoginPage;
