import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '@/Components/Buttons';
import Colors from '@/Constants/colors';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=2070' }}
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.7)']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('@/Assets/Images/Icon.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.logoTitle}>GivingHand</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Make a Difference Today</Text>
          <Text style={styles.subtitle}>
            Connect with organizations fighting hunger and reducing food waste
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Log In"
            onPress={() => router.push('/auth/login')}
            style={styles.button}
          />

          <Button
            title="Sign Up as Donor"
            variant="outline"
            onPress={() => router.push('/auth/signup')}
            style={styles.button}
            textStyle={styles.outlineButtonText}
          />

          <Button
            title="Sign Up as Organization"
            variant="outline"
            onPress={() => router.push('/auth/org-signup')}
            style={styles.button}
            textStyle={styles.outlineButtonText}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  logoImage: {
    width: 60,
    height: 60,
  },
  logoTitle: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
  },
  buttonContainer: {
    marginBottom: 40,
    gap: 12,
  },
  button: {
    alignSelf: 'center',
    width: 300,
  },
  outlineButtonText: {
    color: Colors.white,
  },
});