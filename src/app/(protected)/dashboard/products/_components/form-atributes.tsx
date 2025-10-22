"use client";
import { Input } from "@/components/ui";

export default function FormAtributes() {
  return (
    <div className="bg-white">
      <div className="flex w-full">
        <div
          className="w-full space-y-6 p-5 md:p-8 
        bg-white rounded-lg shadow-md border"
        >
          <h2 className="text-2xl font-bold ">Atributos</h2>
          <form className="">
            <Input
              label="Categoría"
              type="text"
              name="category"
              title="categoría"
              // value={formData.username}
              // onChange={handleChange}
              // onBlur={handleBlur}
              placeholder="Ingrese la categoría"
              minLength={3}
              maxLength={20}
              // error={touched.username ? errors.username : ""}
              showCharCount={true}
              required
            />

            <Input
              label="Marca"
              type="password"
              name="password"
              title="password"
              // value={formData.password}
              // onChange={handleChange}
              // onBlur={handleBlur}
              placeholder="••••••••"
              minLength={8}
              maxLength={10}
              // error={touched.password ? errors.password : ""}
              helperText="Mínimo 8 caracteres, máximo 10"
              required
            />
            
          </form>
        </div>
      </div>
    </div>  )
}
