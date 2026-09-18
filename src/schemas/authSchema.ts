import { z } from "zod";

export const RoleEnum = z.enum(["MAHASISWA", "DOSEN", "ADMIN"], {
  message: "Role harus MAHASISWA, DOSEN, atau ADMIN",
});

export const LoginSchema = z.object({
  email: z
    .string({ message: "Email wajib diisi" })
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),

  password: z
    .string({ message: "Password wajib diisi" })
    .min(8, "Password minimal 8 karakter")
    .max(100, "Password maksimal 100 karakter"),

  role: RoleEnum,
});

export const RegisterSchema = LoginSchema.extend({
  name: z.string().min(3, "Nama minimal 3 karakter").max(80, "Nama maksimal 80 karakter"),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
