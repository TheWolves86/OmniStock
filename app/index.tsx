import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Appreturn = () => {
  const [loading, setLoading] = useState(true);
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [storeSetupDone, setStoreSetupDone] = useState(false);

  useEffect(() => {
    const checkSetup = async () => {
      const onboarding = await AsyncStorage.getItem(
        "onboardingComplete"
      );

      const storeSetup = await AsyncStorage.getItem(
        "storeSetupComplete"
      );

      setOnboardingDone(onboarding === "true");
      setStoreSetupDone(storeSetup === "true");

      setLoading(false);
    };

    checkSetup();
  }, []);

  if (loading) {
    return null;
  }

  if (!onboardingDone) {
    return <Redirect href="/onboarding/screen1" />;
  }

  if (!storeSetupDone) {
    return <Redirect href="/onboarding/store-setup" />;
  }

  return <Redirect href="/(tabs)" />;
};

export default Appreturn;