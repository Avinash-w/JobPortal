import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import '../styles/globals.css';


function MyApp({ Component, pageProps }) {
  return (
    < >
     
      <Navbar />
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
