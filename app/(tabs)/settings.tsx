import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const Settings = () => {
  const router = useRouter();

  const [storeName, setStoreName] = useState("");
  const [template, setTemplate] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await AsyncStorage.getItem("storeSetup");

    if (data) {
      const parsed = JSON.parse(data);

      setStoreName(parsed.storeName || "My Store");
      setTemplate(parsed.selectedTemplate || "Custom");
    }
  };

  const resetApp = async () => {
    Alert.alert(
      "Reset App",
      "This will reopen onboarding and store setup.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          onPress: async () => {
            await AsyncStorage.removeItem(
              "onboardingComplete"
            );

            await AsyncStorage.removeItem(
              "storeSetupComplete"
            );

            router.replace("/");
          },
        },
      ]
    );
  };

  const deleteEverything = async () => {
    Alert.alert(
      "Delete Everything",
      "This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.clear();

            router.replace("/");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
          >
            <Text style={styles.backButton}>
              ←
            </Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Settings
          </Text>

          <View style={{ width: 24 }} />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Account
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Store Name
            </Text>

            <Text style={styles.value}>
              {storeName}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Template
            </Text>

            <Text style={styles.value}>
              {template}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Reset App
          </Text>

          <Text style={styles.description}>
            Reopen onboarding and store setup.
          </Text>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={resetApp}
          >
            <Text style={styles.buttonText}>
              Reset App
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Danger Zone
          </Text>

          <Text style={styles.description}>
            Delete all saved settings.
          </Text>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={deleteEverything}
          >
            <Text style={styles.buttonText}>
              Delete Everything
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.version}>
          OmniStock v1.0.0
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },

  backButton: {
    fontSize: 24,
    color: "#008080",
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#008080",
  },

  card: {
    backgroundColor: "#F9FAFB",
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },

  infoRow: {
    marginBottom: 12,
  },

  label: {
    color: "#6B7280",
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
  },

  description: {
    color: "#6B7280",
    marginBottom: 16,
  },

  resetButton: {
    backgroundColor: "#008080",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  deleteButton: {
    backgroundColor: "#DC2626",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  version: {
    textAlign: "center",
    color: "#6B7280",
    marginVertical: 20,
  },
});