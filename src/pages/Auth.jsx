import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
    navigate("/shop");
  };
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center  bg-gradient-to-b from-blue-500 to-orange-500 gap-6">
      <h1 className="text-lg font-extrabold ">Welcome To ShopingCart App </h1>
      <h1 className="lg:text-4xl text-xl font-extrabold text-white">
        Sign In with Google to Continue
      </h1>
      <button
        variant="contained"
        sx={{ bgcolor: "red" }}
        onClick={handleSignInWithGoogle}
        className="lg:text-2xl text-lg rounded-3xl btn text-white bg-black "
      >
        Sign In With Google
      </button>
    </div>
  );
}
