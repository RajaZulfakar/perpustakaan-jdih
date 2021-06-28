import Layout from "../components/Layout";
import "../styles/globals.css";
import { Provider as AuthProvider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    // Only used if we are using next-auth
    // <AuthProvider session={pageProps.session}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    // </AuthProvider>
  );
}

export default MyApp;
