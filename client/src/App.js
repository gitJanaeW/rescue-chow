import { useState, React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./components/shopping/Cart";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WhoWeAre from "./pages/WhoWeAre";
import OrderNow from "./pages/OrderNow";
import FindARescue from "./pages/FindARescue";
import GetInTouch from "./pages/GetInTouch";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Detail from "./pages/shopping/Detail";
import NoMatch from "./pages/shopping/NoMatch";
import Login from "./pages/shopping/Login";
import Signup from "./pages/shopping/Signup";
import { StoreProvider } from "./utils/shopping/GlobalState";
import Success from "./pages/shopping/Success";
import OrderHistory from "./pages/shopping/OrderHistory";
import Nav from "./components/Nav";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [open, setOpen] = useState(true);
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Nav setOpen={setOpen} />
            <Cart setOpen={setOpen} open={open} />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/who-we-are" element={<WhoWeAre />} />
              <Route path="/shop" element={<OrderNow />} />
              <Route path="/find-a-rescue" element={<FindARescue />} />
              <Route path="/get-in-touch" element={<GetInTouch />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/success" element={<Success />} />
              <Route path="/orderHistory" element={<OrderHistory />} />
              <Route path="/products/:id" element={<Detail />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </StoreProvider>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
