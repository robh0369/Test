import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator, Platform, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [html, setHtml] = useState(null);

  useEffect(() => {
    (async () => {
      const [asset] = await Asset.loadAsync(require('./assets/garden.html'));
      const content = await FileSystem.readAsStringAsync(asset.localUri);
      setHtml(content);
    })();
  }, []);

  if (!html) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#c9a84c" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0e0f0c" />
      <WebView
        source={{ html, baseUrl: '' }}
        style={styles.webview}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        allowFileAccess
        mixedContentMode="always"
        onError={e => console.warn('WebView error', e.nativeEvent)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0f0c',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0e0f0c',
  },
  webview: { flex: 1 },
});
