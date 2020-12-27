import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";

export default function App({ Component, pageProps }) {
    const apolloClient = useApollo(pageProps.initialApolloState);

    return (
        <ApolloProvider client={apolloClient}>
            <div style={{ margin: "20px" }}>
                <Component {...pageProps} />
                <style jsx global>{`
                        body {
                        font-size: 14px;
                        font-weight: 400;
                        font-family: sans-serif;
                        }
                        h1 { font-weight: 700;}
                        p { margin-bottom: 10px;}
                        }
      `}</style>
            </div>
        </ApolloProvider>
    );
}