import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./Firebase";
import Loading from "./Loading";
import Login from "./Login";
import Main from "./Main";

const App = () => {
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (false) {
      db.collection("users").doc(user?.uid).set(
        {
          photoUrl: user.photoURL,
          name: user.displayName,
        },
        { merge: true }
      );
    }
  }, [user]);
  if (loading) return <Loading />;
  if (false) return <Login />;
  return <Main />;
};

export default App;
