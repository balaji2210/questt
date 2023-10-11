import NavBar from "components/navBar/NavBar";
import "./globals.css";
import Provider from "helpers/reactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Providers from "redux/Providers";

export const metadata = {
  title: "Books App",
  description: "Books App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300&family=Roboto:wght@500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <Provider>
            <NavBar />
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster />
          </Provider>
        </Providers>
      </body>
    </html>
  );
}
