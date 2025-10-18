import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
	helperText?: string
	minLength?: number
	maxLength?: number
	showCharCount?: boolean
} 