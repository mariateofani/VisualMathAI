import { z } from "zod";

export const RoleEnum = z.enum(["MAHASISWA", "DOSEN", "ADMIN"]);

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),

  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .max(100, "Password maksimal 100 karakter"),

  role: RoleEnum,
});

export const RegisterSchema = LoginSchema.extend({
  name: z
    .string()
    .min(3, "Nama minimal 3 karakter")
    .max(80, "Nama maksimal 80 karakter"),
});

export const ProfileSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(80),
  email: z.string().email(),
  role: RoleEnum,
  institution: z.string().max(120),
});

export type Role = z.infer<typeof RoleEnum>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type Profile = z.infer<typeof ProfileSchema>;