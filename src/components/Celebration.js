import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TouchableOpacity, Animated, StyleSheet,
  useWindowDimensions,
} from 'react-native';

const COLORS = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF6BFF', '#FF9500', '#00C9FF'];
const PARTICLE_COUNT = 30;

function Particle({ screenW, screenH, delay }) {
  const fall = useRef(new Animated.Value(0)).current;
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const startX = Math.random() * screenW;
  const isRect = Math.random() > 0.5;
  const size = isRect ? { width: 8, height: 16 } : { width: 12, height: 12 };
  const endAngle = `${360 + Math.random() * 360}deg`;

  useEffect(() => {
    const anim = Animated.timing(fall, {
      toValue: 1,
      duration: 2200 + Math.random() * 1200,
      delay,
      useNativeDriver: true,
    });
    anim.start();
    return () => anim.stop();
  }, []);

  const translateY = fall.interpolate({ inputRange: [0, 1], outputRange: [-60, screenH + 60] });
  const rotate = fall.interpolate({ inputRange: [0, 1], outputRange: ['0deg', endAngle] });
  const opacity = fall.interpolate({ inputRange: [0, 0.75, 1], outputRange: [1, 1, 0] });

  return (
    <Animated.View
      style={[
        styles.particle,
        size,
        {
          left: startX,
          top: 0,
          backgroundColor: color,
          opacity,
          transform: [{ translateY }, { rotate }],
        },
      ]}
    />
  );
}

export default function Celebration({ visible, onRestart }) {
  const { width: screenW, height: screenH } = useWindowDimensions();
  const titleScale = useRef(new Animated.Value(0)).current;
  const btnOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) {
      titleScale.setValue(0);
      btnOpacity.setValue(0);
      return;
    }
    Animated.sequence([
      Animated.spring(titleScale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 6,
        bounciness: 16,
      }),
      Animated.delay(800),
      Animated.timing(btnOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible]);

  if (!visible) return null;

  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    key: i,
    delay: Math.random() * 800,
  }));

  return (
    <View style={[StyleSheet.absoluteFill, styles.overlay]} pointerEvents="box-none">
      {/* Confetti */}
      {particles.map((p) => (
        <Particle key={p.key} screenW={screenW} screenH={screenH} delay={p.delay} />
      ))}

      {/* Centre card */}
      <View style={styles.card} pointerEvents="auto">
        <Animated.Text style={[styles.title, { transform: [{ scale: titleScale }] }]}>
          🏴‍☠️ YOU DID IT! 🏴‍☠️
        </Animated.Text>
        <Text style={styles.sub}>Ahoy, brave pirate!</Text>

        <Animated.View style={{ opacity: btnOpacity }}>
          <TouchableOpacity style={styles.btn} onPress={onRestart} activeOpacity={0.8}>
            <Text style={styles.btnText}>Play Again! ⚓</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  particle: {
    position: 'absolute',
    borderRadius: 3,
  },
  card: {
    backgroundColor: 'rgba(26, 107, 138, 0.92)',
    borderRadius: 24,
    paddingHorizontal: 36,
    paddingVertical: 32,
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFD600',
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFD600',
    textAlign: 'center',
    marginBottom: 8,
  },
  sub: {
    fontSize: 20,
    color: 'white',
    marginBottom: 24,
    fontWeight: '600',
  },
  btn: {
    backgroundColor: '#FFD600',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 50,
    elevation: 4,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
});
