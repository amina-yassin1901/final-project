import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { register as registerUser, login } from "@/redux/auth/authThunks";
import ichgra from "@/assets/icons/ICHGRA.svg";
import styles from "./Register.module.css";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await dispatch(registerUser(data));

    if (registerUser.fulfilled.match(result)) {
      const loginResult = await dispatch(
        login({
          email: data.email,
          password: data.password,
        }),
      );

      if (login.fulfilled.match(loginResult)) {
        localStorage.setItem("token", loginResult.payload.token);
        navigate("/");
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.formBlock}>
          <div className={styles.logoWrapper}>
            <img src={ichgra} alt="ICHGRAM" className={styles.logo} />
            <p className={styles.subtitle}>
              Sign up to see photos and videos from your friends.
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                placeholder="Email"
                className={errors.email ? styles.inputError : ""}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className={styles.errorText}>{errors.email.message}</p>
              )}
            </div>

            <div className={styles.inputWrapper}>
              <input
                placeholder="Full Name"
                className={errors.fullName ? styles.inputError : ""}
                {...register("fullName", { required: "Full name is required" })}
              />
              {errors.fullName && (
                <p className={styles.errorText}>{errors.fullName.message}</p>
              )}
            </div>

            <div className={styles.inputWrapper}>
              <input
                placeholder="Username"
                className={errors.username ? styles.inputError : ""}
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className={styles.errorText}>{errors.username.message}</p>
              )}
            </div>

            <div className={styles.inputWrapper}>
              <input
                type="password"
                placeholder="Password"
                className={errors.password ? styles.inputError : ""}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
              />
              {errors.password && (
                <p className={styles.errorText}>{errors.password.message}</p>
              )}
            </div>

            {error && <p className={styles.errorTextCenter}>{error}</p>}

            <p className={styles.policyText}>
              People who use our service may have uploaded your contact
              information to Instagram. <a href="#">Learn More</a>
            </p>
            <p className={styles.policyText}>
              By signing up, you agree to our <a href="#">Terms</a> ,{" "}
              <a href="#">Privacy Policy</a> and <a href="#">Cookies Policy</a>.
            </p>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </div>

        <div className={styles.footerBlock}>
          <span>Have an account? </span>
          <Link to="/login" className={styles.loginLink}>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
