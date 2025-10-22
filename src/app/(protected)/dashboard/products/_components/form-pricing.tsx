"use client";
import { Input } from "@/components/ui";

export default function FormPricing() {
  return (
    <div className="bg-white">
      <div className="flex w-full">
        <div
          className="w-full space-y-6 p-5 md:p-8 
        bg-white rounded-lg shadow-md border"
        >
          <h2 className="text-2xl font-bold ">Precios</h2>
          <form className="space-y-4">
            <Input
              label="Precio de venta"
              type="number"
              name="productName"
              title="precio de venta"
              // value={formData.username}
              // onChange={handleChange}
              // onBlur={handleBlur}
              placeholder="Ingrese el precio de venta"
              minLength={3}
              maxLength={20}
              // error={touched.username ? errors.username : ""}
              // showCharCount={true}
              required
            />
            <Input
              label="Porcentaje de descuento"
              type="text"
              name="discountPercentage"
              title="porcentaje de descuento"
              // value={formData.password}
              // onChange={handleChange}
              // onBlur={handleBlur}
              placeholder="Ingrese el porcentaje de descuento"
              minLength={8}
              maxLength={10}
              // error={touched.password ? errors.password : ""}
              // helperText="Mínimo 8 caracteres, máximo 10"
              required
            />
            <Input
              label="Porcentaje de descuento"
              type="text"
              name="discountPercentage"
              title="porcentaje de descuento"
              // value={formData.password}
              // onChange={handleChange}
              // onBlur={handleBlur}
              placeholder="Ingrese el porcentaje de descuento"
              minLength={8}
              maxLength={10}
              // error={touched.password ? errors.password : ""}
              // helperText="Mínimo 8 caracteres, máximo 10"
              required
            />
          </form>
        </div>
      </div>
    </div>
  )
}
