import React from "react";
import { InputProps } from "./input-interface";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      className = "",
      minLength,
      maxLength,
      showCharCount = false,
      ...props
    },
    ref
  ) => {
    const [internalError, setInternalError] = React.useState<string>("");
    const [charCount, setCharCount] = React.useState<number>(0);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCharCount(value.length);

      /**
       * {@description} validacion de la longitud minima
       * si minlength existe y si el valor es mayor a 0 y es menor al minlength
       * seteamos el error
       **/
      if (minLength && value.length > 0 && value.length < minLength) {
        setInternalError(
          `El campo debe tener al menos ${minLength} caracteres`
        );
      } else if (maxLength && value.length > maxLength) {
        /**
         * {@description} validacion de la longitud maxima
         * si maxLength existe y si el valor es mayor al maxLength
         * seteamos el error
         **/
        setInternalError(
          `El campo debe tener al menos ${maxLength} caracteres`
        );
      } else {
        /**
         * {@description} limpiamos el error si la validacion es correcta
         * seteamos el error
         **/
        setInternalError("");
      }

      /**Llamar al onChange original si existe */
      if (props.onChange) {
        props.onChange(e);
      }
    };
    const displayError = error || internalError;

    return (
      <div className="flex flex-col">
        {label && (
          <label className={`text-sm font-medium text-gray-700 ${displayError && "text-red-500"}`}>
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`
					px-2 py-1 border rounded-md outline-none 
					transition-colors focus:ring-0.5 placeholder:text-gray-400 placeholder:text-sm
					${
            displayError
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-400 focus:ring-primary focus:border-primary"
          }
          ${className}
				`}
          minLength={minLength}
          maxLength={maxLength}
          {...props}
          onChange={handleChange}
        />
        <div className="flex justify-between items-center">
          <div className="flex-1">
            {displayError && (
              <span className="text-sm text-red-500">{displayError}</span>
            )}
            {helperText && !displayError && (
              <span className="text-sm text-gray-500">{helperText}</span>
            )}
          </div>
          {showCharCount && maxLength && (
            <span
              className={`text-xs ${
                charCount >= maxLength ? "text-red-500" : "text-gray-500"
              }`}
            >
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
