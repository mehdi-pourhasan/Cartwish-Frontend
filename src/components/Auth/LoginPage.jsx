import { useForm } from "react-hook-form";
import "./LoginPage.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUser, login } from "../../services/userServices";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Please enter valid email address" })
    .min(3),
  password: z.string().min(8),
});

const LoginPage = () => {
  // *************** HANDLE FORM WITH USEREF HOOK *************** \\
  //   const nameRef = useRef(null);
  //   const phoneRef = useRef(null);

  //   function handleSubmit(e) {
  //     e.preventDefault();
  //     const user = {
  //       name: "",
  //       phone: 0,
  //     };
  //     user.name = nameRef.current.value;
  //     user.phone = parseInt(phoneRef.current.value);

  //     console.log(user);
  //   }
  // *************** HANDLE FORM WITH USEREF HOOK *************** \\

  {
    /*













    */
  }
  // *************** HANDLE FORM WITH USESTATE HOOK *************** \\
  //   const [user, setUser] = useState({
  //       name: "",
  //       phone: "",
  //     });

  //     function handleSubmit(e) {
  //         e.preventDefault();
  //         console.log(user);
  //     }
  // *************** HANDLE FORM WITH USESTATE HOOK *************** \\
  {
    /*













    */
  }
  // *************** HANDLE FORM WITH UseForm Library *************** \\
  const location = useLocation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const [formError, setFormError] = useState('')
  // Login User 
  const onSubmit = async (FormData) => {
    try {
      await login(FormData)
      const { state } = location
      window.location = state ? state.from : '/'
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setFormError(err.response.data.message)
      }
    }
  }
  // *************** HANDLE FORM WITH UseForm Library *************** \\
  if (getUser()) {
    return <Navigate to='/' />
  }



  return (
    <section className="align_center form_page">
      <form
        className="authentication_form"
        //   UseRef and UseState
        //   onSubmit={handleSubmit}
        //
        //
        //
        //
        //
        //
        //
        //   react hook
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Login Form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form_text_input"
              id="email"
              placeholder="Email Address"
              //*********** UseRef Handle ***********\\
              //   ref={nameRef}
              //*********** UseRef Handle ***********\\
              //
              //
              //
              //
              //
              //
              //
              //
              //
              //
              //*********** UseState Handle ***********\\
              //   onChange={(e) => setUser({ ...user, name: e.target.value })}
              //   value={user.name}
              //*********** UseState Handle ***********\\
              //
              //
              //
              //
              //
              //
              //
              //
              //
              //   *********** React Hook Form Handle ***********\\
              //   *********** React Hook Form Handle with auth ***********\\
              //
              //   {...register("email", { required: true, minLength: 3 })}
              //
              //
              //
              //
              //
              //   *********** React Hook Form Handle with schema ***********\\
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
            {
              /* {errors.name?.type === "required" && (
              <em className="form_error">Please enter your name</em>
            )}
            {
              errors.name?.type === "minLength" && (
                <em className="form_error">
                  Name should be at least 3 characters
                </em>
              )
            } */
              //*********** React Hook Form Handle ***********\\
            }
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form_text_input"
              placeholder="Password"
              //*********** UseRef Handle ***********\\
              //   ref={phoneRef}
              //*********** UseRef Handle ***********\\
              //
              //
              //
              //
              //
              //
              //
              //
              //
              //*********** UseState Handle ***********\\
              //   onChange={(e) =>
              //     setUser({ ...user, phone: parseInt(e.target.value) })
              //   }
              //   value={user.phone}
              //*********** UseState Handle ***********\\
              //
              //
              //
              //
              //
              //
              //
              //*********** React Hook Form Handle with auth ***********\\
              //   {...register("password", { valueAsNumber: true })}
              //*********** React Hook Form Handle with auth ***********\\
              //
              //
              //
              //
              //
              //*********** React Hook Form Handle with schema ***********\\
              {...register("password")}
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>

          {formError && <em className='form_error'>{formError}</em>}



          <button type="submit" className="search_button form_submit">
            Login
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
