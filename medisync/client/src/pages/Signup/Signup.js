import React from "react";
import { TopNavigation, Footer, Signup } from "../../components";
const SignupPage = () => {
  return (
    <div className="container" style={styles.container}>
      <TopNavigation />
      <Signup />
      <div>
        <Footer />
      </div>
    </div>
  );
};
const styles = {
  container: { BoxSizing: "border-box" },
};
export default SignupPage;
