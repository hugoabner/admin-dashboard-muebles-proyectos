import FormAtributes from "../_components/form-atributes";
import FormBasicInformation from "../_components/form-basic-information";
import FormPricing from "../_components/form-pricing";
import ProductImage from "../_components/product-image";

export default function page() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 items-start">
      
      <section className=" flex flex-col w-full lg:w-[40%] space-y-5">
        <div className="">
          <FormBasicInformation />
        </div>
        <div className="">
          <FormPricing />
        </div>
      </section>

      <section className=" flex flex-col w-full lg:w-[60%] space-y-5 ">
        <div className="">
          <ProductImage />
         </div>
        <div>
          <FormAtributes />
        </div>
      </section>

    </div>
  );
}


