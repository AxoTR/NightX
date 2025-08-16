import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NightX</Text>
      <Link href="/(auth)/login">
        <Text style={styles.link}>Giriş Yap</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  title: { color: '#fff', fontSize: 20, marginBottom: 12 },
  link: { color: '#8B5CF6' },
})
