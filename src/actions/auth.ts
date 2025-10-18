"use server";
import { createSession } from "@/lib/session";
import z from "zod";

export type FormData = { username: string; password: string };

const loginSchema = z.object({
  username: z
    .string()
    .min(3, "El usuario debe tener al menos 3 caracteres")
    .max(20),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(10),
});

export async function login(formData: FormData) {
  //validar datos del formulario
  const validatedFields = loginSchema.safeParse({
    username: formData.username,
    password: formData.password,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.flatten().fieldErrors as string,
    };
  }
  const { password, username } = validatedFields.data;
  // 2. Buscar usuario en la base de datos
  // TODO: Reemplaza esto con tu lógica de base de datos real
  // import { db } from '@/lib/db'
  // const user = await db.user.findUnique({
  //   where: { username }
  // })

  // Simulación temporal (ELIMINAR en producción)
  const user =
    username === "administrador"
      ? {
          id: "123",
          username: "administrador",
          password: "password",
          image_url: "https://cdn-icons-png.flaticon.com/512/4990/4990980.png",
        }
      : null;

  if (!user) {
    return {
      success: false,
      message: "Usuario o contraseña incorrectos",
    };
  }

  // 3. Verificar contraseña
  // TODO: Usa bcrypt para comparar contraseñas
  // import bcrypt from 'bcryptjs'
  // const isValidPassword = await bcrypt.compare(password, user.password)

  // Simulación temporal (ELIMINAR en producción)
  const isValidPassword = password === user.password;
  if (!isValidPassword) {
    return {
      success: false,
      message: "Contraseña incorrecta",
    };
  }
  await createSession(user.id);
  return {
	success: true,
	message: "Inicio de sesión exitoso",
  }
}
