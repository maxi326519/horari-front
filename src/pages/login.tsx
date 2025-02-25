import { useState } from "react";
import {
  initLoginData,
  initLoginError,
  LoginData,
  LoginError,
} from "../interfaces/Login";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const auth = useAuth();
  const [error, setError] = useState<LoginError>(initLoginError());
  const [user, setUser] = useState<LoginData>(initLoginData());

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setUser({ ...user, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: "" });
  }

  function handleValidations(): boolean {
    const error: LoginError = initLoginError();
    let isValid = true;

    // Email
    if (user.email === "") {
      error.email = "Debes agregar un correo";
      isValid = false;
    }

    // Password
    if (user.password === "") {
      error.password = "Debes agregar una contraseña";
      isValid = false;
    }

    // Set error and return the value
    setError(error);
    return isValid;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (handleValidations()) {
      auth.login(user.email, user.password).catch((error) => {
        if (error.message?.includes("User not found")) {
          setError({ ...error, email: "El correo es incorrecto" });
        } else if (error.message?.includes("Incorrect password")) {
          setError({ ...error, password: "Contraseña incorrecta" });
        } else {
          console.log("Unknown error", error);
        }
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-red">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

        {/* EMAIL */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
            className={`mt-1 block w-full px-3 py-2 border ${
              error.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            placeholder="Ingresa tu correo"
            onChange={handleChange}
          />
          {error.email && <small className="text-red-500">{error.email}</small>}
        </div>

        {/* CONTRASEÑA */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={user.password}
            className={`mt-1 block w-full px-3 py-2 border ${
              error.password ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            placeholder="Ingresa tu contraseña"
            onChange={handleChange}
          />
          {error.password && (
            <small className="text-red-500">{error.password}</small>
          )}
        </div>

        <button
          type="submit"
          className={`w-full text-white py-2 rounded-md ${
            Object.values(error).some((value) => value)
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          }`}
          disabled={Object.values(error).some((value) => value)}
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
