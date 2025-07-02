import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';
import Header from '../../components/text/Header';

import { useTheme } from '../../context/ThemeContext';

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const { isDark, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <Header title="Settings" />
      <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.item}>
        <Text style={styles.label}>Dark Mode</Text>
        {/* <Switch value={isDarkMode} onValueChange={setIsDarkMode} /> */}
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Notifications</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
  },
});

export default SettingsScreen;
