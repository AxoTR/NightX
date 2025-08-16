import React from 'react'
import { TouchableOpacity, Text, TouchableOpacityProps, ViewStyle, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

export default function Button({ title, variant = 'primary', style, ...props }: ButtonProps) {
  const baseStyle: ViewStyle = {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  };

  if (variant === 'primary') {
    return (
      <TouchableOpacity {...props} activeOpacity={0.85} style={style}>
        <LinearGradient
          colors={["#8B5CF6", "#EC4899"]}
          start={[0, 0]}
          end={[1, 0]}
          style={[baseStyle]}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700' }}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // secondary
  return (
    <TouchableOpacity {...props} style={[{ borderWidth: 1, borderColor: '#8B5CF6', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 18 }, style]}>
      <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}>{title}</Text>
    </TouchableOpacity>
  );
}
