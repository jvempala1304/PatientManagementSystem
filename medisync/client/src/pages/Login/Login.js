import React from 'react';
import { TopNavigation, Footer, MainContent } from '../../components';
const Login = () => {
  return (
    <div className="container" style={styles.container}>
      <TopNavigation />
      <MainContent />
      <div>
        <Footer />
      </div>
    </div>
  );
};
const styles = {
  container: { BoxSizing: 'border-box' },
};
export default Login;
