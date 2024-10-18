import React, { useLayoutEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { RouteProp, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeText } from "@/components/Global/NativeComponents";

// Définissez les types pour les paramètres de route
type RootStackParamList = {
  SettingsFlagsInfos: { title: string; value: any };
};

type SettingsFlagsInfosRouteProp = RouteProp<RootStackParamList, "SettingsFlagsInfos">;
type SettingsFlagsInfosNavigationProp = NativeStackNavigationProp<RootStackParamList, "SettingsFlagsInfos">;

type Props = {
  route: SettingsFlagsInfosRouteProp;
  navigation: SettingsFlagsInfosNavigationProp;
};

const SettingsFlagsInfos: React.FC<Props> = ({ route, navigation }) => {
  const { title, value } = route.params;
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, [navigation, title]);

  const isBase64Image = (str: string): boolean => {
    return typeof str === "string" && str.startsWith("data:image/jpeg");
  };

  const renderValue = (val: any): string => {
    if (isBase64Image(val)) {
      return "[Image Base64]";
    } else if (typeof val === "object" && val !== null) {
      return JSON.stringify(val, null, 2);
    } else {
      return String(val);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          backgroundColor: colors.background
        }
      ]}
    >
      <View style={styles.content}>
        <NativeText style={[styles.value, { color: colors.text }]}>{renderValue(value)}</NativeText>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  content: {
    flex: 1,
  },
  value: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default SettingsFlagsInfos;
