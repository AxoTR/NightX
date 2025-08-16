import React from 'react'
import { TextInput, TextInputProps, TextStyle } from 'react-native';

export default function Input(props: TextInputProps) {
  const inputStyle: TextStyle = {
    backgroundColor: '#1F2937',
    borderWidth: 1,
    borderColor: '#8B5CF6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: 'white',
  };
  return (
    <TextInput
      style={inputStyle}
      placeholderTextColor="#9CA3AF"
      {...props}
    />
  );
}
