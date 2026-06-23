import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

//App entry point
const Appreturn = () => {
  //Tracks app startup and setup status
  const [loading, setLoading] = useState(true);
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [storeSetupDone, setStoreSetupDone] = useState(false);

  useEffect(() => {
    //checks if the onboarding and store setup screen have been completed before or not
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


  //wait until aysncstorage vaules are added yk
  if (loading) {
    return null;
  }

  //if onboarding is not done then do it
  if (!onboardingDone) {
    return <Redirect href="/onboarding/screen1" />;
  }

  //if onboarding is done but not store setup do it then
  if (!storeSetupDone) {
    return <Redirect href="/onboarding/store-setup" />;
  }

  //If both completed then go to the dashboard
  return <Redirect href="/(tabs)" />;
};

export default Appreturn;