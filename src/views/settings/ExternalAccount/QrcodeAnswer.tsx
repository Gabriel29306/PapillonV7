import React from "react";
import type { Screen } from "@/router/helpers/types";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { View, StyleSheet, Text } from "react-native";
import Reanimated, { LinearTransition, FlipInXDown } from "react-native-reanimated";
import PapillonShineBubble from "@/components/FirstInstallation/PapillonShineBubble";
import { ExternalAccount } from "@/stores/account/types";
import { useAccounts } from "@/stores/account";
import DuoListPressable from "@/components/FirstInstallation/DuoListPressable";
import ButtonCta from "@/components/FirstInstallation/ButtonCta";

type Props = {
  navigation: any;
  route: { params: { accountID: string } };
};

const QrcodeAnswer: Screen<"QrcodeAnswer"> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const update = useAccounts(store => store.update);
  const accountID = route.params?.accountID;

  const [answer, setAnswer] = React.useState<boolean>(false);

  return (
    <SafeAreaView
      style={styles.container}
    >
      <PapillonShineBubble
        message={"Peux-tu utiliser un QR-Code pour passer au self ?"}
        width={250}
        numberOfLines={2}
        offsetTop={insets.top}
      />

      <Text>{accountID}</Text>

      <Reanimated.View
        style={styles.list}
        layout={LinearTransition}
      >
        <Reanimated.View
          style={{ width: "100%" }}
          layout={LinearTransition}
          entering={FlipInXDown.springify().delay(100)}
        >
          <DuoListPressable
            text="Oui"
            enabled={answer}
            onPress={() => setAnswer(true)}
          />
        </Reanimated.View>

        <Reanimated.View
          style={{ width: "100%" }}
          layout={LinearTransition}
          entering={FlipInXDown.springify().delay(200)}
        >
          <DuoListPressable
            text="Non"
            enabled={!answer}
            onPress={() => setAnswer(false)}
          />
        </Reanimated.View>
      </Reanimated.View>


      <View style={styles.buttons}>
        <ButtonCta
          primary
          value="Confirmer"
          onPress={() => {
            update<ExternalAccount>(accountID, "data", { "qr-enable": answer });
            if (answer) {
              navigation.navigate("QrcodeScanner", { accountID, });
            } else {
              navigation.pop();
              navigation.pop();
            }
          }
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 20,
  },

  list: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    gap: 9,
    paddingHorizontal: 20,
  },

  buttons: {
    width: "100%",
    paddingHorizontal: 16,
    gap: 9,
    marginBottom: 16,
  },

  image: {
    width: 32,
    height: 32,
    borderRadius: 80,
  },
});


export default QrcodeAnswer;
