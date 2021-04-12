import { Redirect, Route, Switch } from "react-router-dom";
import { LoginPage } from "../../containers/LoginPage/LoginPage";
import { BlogContent } from "../BlogContent/BlogContent";
import { BlogCard } from "../BlogContent/components/BlogCard";

export const Routes = ({
  isLoggedIn,
  handleLogIn
}) => {
  
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          isLoggedIn ? <Redirect to="/blog" /> : <Redirect to="/login" />
        }
      />

      <Route
        exact
        path="/login"
        render={(props) =>
          !isLoggedIn ? <LoginPage {...props} handleLogIn={handleLogIn} /> : <Redirect to="/blog" />
        }
      />

      <Route
        exact
        path="/blog"
        render={(props) =>
          isLoggedIn ? <BlogContent {...props} /> : <Redirect to="/login" />
        }
      />

      <Route
        exact
        path="/blog/:postId"
        render={(props) =>
          isLoggedIn ? <BlogCard {...props} /> : <Redirect to="/login" />
        }
      />

    </Switch>
  );
};
