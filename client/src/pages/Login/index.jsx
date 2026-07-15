import { useForm } from "react-hook-form";
import ichgra from "@/assets/icons/ICHGRA.svg";
import styles from "./Login.module.css";
import backgr from "@/assets/images/Background.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { login } from "@/redux/auth/authThunks";

function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.auth);
  const onSubmit = async (data) => {
    const result = await dispatch(login(data));

    if (login.fulfilled.match(result)) {
      localStorage.setItem("token", result.payload.token);

      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <img src={backgr} alt="photo" />
      <div className={styles.forms}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <img src={ichgra} alt="logo" width={190} height={106} />

          <input
            type="email"
            placeholder="Username, or email"
            {...register("email")}
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Loading..." : "Login"}
          </button>
          <div className={styles.middle}>
            <span className={styles.line}></span>
            <span className={styles.or}>OR</span>
            <span className={styles.line}></span>
          </div>
          <Link className={styles.forgot} to="/reset-password">
            Forgot password?
          </Link>
        </form>
        <div className={styles.register}>
          <span>Don't have an account?</span>

          <Link className={styles.link} to="/register">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
