"use client";
import { Input } from "@/components/ui";
import { Button } from "@/components/ui/button";
import React from "react";

export default function SignupPage() {

  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({
    username: "",
    password: "",
  });

  const [touched, setTouched] = React.useState({
    username: false,
    password: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Limpiar error cuando el usuario empieza a escribir
    if (touched[name as keyof typeof touched]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "username") {
      if (!value.trim()) {
        error = "El usuario es requerido";
      } else if (value.length < 3) {
        error = "El usuario debe tener al menos 3 caracteres";
      } else if (value.length > 20) {
        error = "El usuario no debe exceder 20 caracteres";
      }
    }

    if (name === "password") {
      if (!value.trim()) {
        error = "La contraseña es requerida";
      } else if (value.length < 8) {
        error = "La contraseña debe tener al menos 8 caracteres";
      } else if (value.length > 10) {
        error = "La contraseña no debe exceder 10 caracteres";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    return error;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Marcar todos los campos como tocados
    setTouched({
      username: true,
      password: true,
    });
    // Validar todos los campos
    const usernameError = validateField("username", formData.username);
    const passwordError = validateField("password", formData.password);
    // Si no hay errores, enviar el formulario
    if (!usernameError && !passwordError) {
      console.log("Formulario válido:", formData);
      // Aquí puedes hacer la petición al backend
    } else {
      console.log("Formulario inválido");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center 
      justify-center bg-gray-50"
    >
      <div 
        className="max-w-md w-full space-y-6 p-8 
      bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center">
          Iniciar Sesión
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Usuario"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Username"
            minLength={3}
            maxLength={20}
            error={touched.username ? errors.username : ""}
            showCharCount={true}
            required
          />

          <Input
            label="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="••••••••"
            minLength={8}
            maxLength={10}
            error={touched.password ? errors.password : ""}
            helperText="Mínimo 8 caracteres, máximo 10"
            required
          />
          <Button 
            type="submit" 
            className="w-full"
            variant="default"
            size="default"
          >
            Registrarse
          </Button>
        </form>
      </div>
    </div>
  );
}