import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaProfile } from "../components/SafeAreaProfile";
import { useTranslation } from "react-i18next";
import { _extends } from "../styles/_extends";
import { CheckBox } from "../components/checkbox";
import { useFetchData } from "../hooks/useFetchData";
import { useEffect, useState } from "react";
import { updateProfileAPi } from "../utils/api/profile";
import { notificationDataType } from "../Types/profile";
import { utilStyles } from "../utils/config";

export function Notification() {
  const { t } = useTranslation("common");
  const [notification, setNotification] = useState<notificationDataType>({
    notification_sms: false,
    notification_email: false,
    notification_system: false,
  });

  const { loading, data, error } = useFetchData({
    url: "/profile/personal-notifications-settings",
  });

  // call api -- update notification settings
  function onSelectNotification(key: string, value: boolean) {
    updateProfileAPi({
      [key]: value ? 1 : 0,
    })
      .then(res => {
        Alert.alert(res.message);
        setNotification({ ...notification, [key]: value ? true : false });
      })
      .catch(({ message }) => {
        Alert.alert(message);
      });
  }

  useEffect(() => {
    setNotification({
      notification_email: data?.email ? true : false,
      notification_sms: data?.sms ? true : false,
      notification_system: data?.system ? true : false,
    });
  }, []);

  return (
    <SafeAreaProfile
      title={t("notification_title")}
      description="notification_desc">
      <View style={styles.container}>
        <View style={styles.box_option}>
          <CheckBox
            label="mobile_sms"
            checked={notification.notification_sms}
            onCheck={() => {
              onSelectNotification(
                "notification_sms",
                !notification.notification_sms,
              );
            }}
          />
        </View>
        <View style={styles.box_option}>
          <CheckBox
            label="email_address"
            checked={notification.notification_email}
            onCheck={() => {
              onSelectNotification(
                "notification_email",
                !notification.notification_email,
              );
            }}
          />
        </View>
        <View style={styles.box_option}>
          <CheckBox
            label="system_notification"
            checked={notification.notification_system}
            onCheck={() => {
              onSelectNotification(
                "notification_system",
                !notification.notification_system,
              );
            }}
          />
        </View>
      </View>
    </SafeAreaProfile>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: utilStyles.padding._pages_Horizontal,
  },
  box_option: {
    marginBottom: utilStyles.spacing._x2,
  },
});
