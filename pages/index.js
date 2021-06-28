import BookCard from "../components/Books/BookCard";
import Head from "next/head";

function index() {
  return (
    <div className="h-screen bg-gray-100 ">
      <Head>
        <title>Library</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <BookCard />
    </div>
  );
}

export default index;
