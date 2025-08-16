import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Alert, TextInput, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { router } from 'expo-router';
import Button from '../../components/ui/Button';
import { supabase } from '../../src/lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';


export default function Login() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const inputs = useRef<Array<TextInput | null>>([]);
  const glow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);


  const startCountdown = () => {
    setCountdown(60);
    const iv = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(iv);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  const sendOTP = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      Alert.alert('Hata', error.message);
    } else {
      setOtpSent(true);
      Alert.alert('Başarılı', '6 haneli kod email adresinize gönderildi');
    }
    setLoading(false);
  };

  const verifyOTP = async () => {
    setLoading(true);
    const token = otp.join('');
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email'
    });

    if (error) {
      Alert.alert('Hata', 'Geçersiz kod');
    } else {
      router.replace('/');
    }
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-black px-6 justify-center">
      {/* Neon Background Effect */}
      <View className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-pink-900/20" />
      
      {/* Logo Area */}
      <View className="items-center mb-12">
        <Text className="text-4xl font-bold text-white mb-2">NightX</Text>
        <Text className="text-purple-400 text-center">İstanbul'un Gizli Etkinlikleri</Text>
      </View>
      {!otpSent ? (
        // Email Input Screen
        <View className="space-y-6">
          <View>
            <Text className="text-white mb-2 text-lg">Email Adresin</Text>
            <TextInput
              placeholder="ornek@email.com"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.emailInput}
            />
          </View>
          
          <Button
            title={loading ? "Gönderiliyor..." : "Kod Gönder"}
            onPress={sendOTP}
            disabled={loading || !email}
          />
        </View>
      ) : (
        // OTP Input Screen
        <View className="space-y-6">
          <View>
            <Text className="text-white mb-2 text-lg">6 Haneli Kod</Text>
    <View style={styles.otpRow}>
              {otp.map((d, i) => (
                <TextInput
                  key={i}
      ref={(ref: TextInput | null) => { inputs.current[i] = ref }}
                  value={d}
                  onChangeText={(val) => {
                    if (!/^[0-9]?$/.test(val)) return;
                    const copy = [...otp];
                    copy[i] = val;
                    setOtp(copy);
                    if (val && i < 5) inputs.current[i + 1]?.focus();
                  }}
                  keyboardType="number-pad"
                  maxLength={1}
                  style={styles.otpInput}
                />
              ))}
            </View>
          </View>
          
          <Button
            title={loading ? "Doğrulanıyor..." : "Giriş Yap"}
            onPress={verifyOTP}
            disabled={loading || otp.join('').length !== 6}
          />
          
          <View style={{ marginTop: 8 }}>
            <Button
              title={countdown > 0 ? `Tekrar gönder (${countdown}s)` : 'Yeni Kod Gönder'}
              variant="secondary"
              onPress={() => {
                if (countdown === 0) {
                  setOtpSent(false);
                }
              }}
              disabled={countdown > 0}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  emailInput: {
    backgroundColor: '#111827',
    borderColor: '#6D28D9',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    color: '#fff',
  },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  otpInput: { width: 48, height: 56, borderRadius: 10, backgroundColor: '#0F172A', color: '#fff', textAlign: 'center', fontSize: 18, borderWidth: 1, borderColor: '#6D28D9' },
});
