import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaProfile } from "../components/SafeAreaProfile";
import { useTranslation } from "react-i18next";
import { useFetchData } from "../hooks/useFetchData";
import { CheckBoxTab } from "../components/checkbox-tab";
import { CheckBox } from "../components/checkbox";
import { _extends } from "../styles/_extends";
import { isRTL } from "../i18n/isRTL";
import { COLORS } from "../constants/Colors";
import { updateProfileAPi } from "../utils/api/profile";
import { categoryType } from "../Types/profile";

export function CategoriesOfInterest() {
  const { t } = useTranslation("common");
  const { data, setData } = useFetchData({
    url: "/profile/selected-categories",
  });

  // call api to update selected categories
  function updateSelectedCategories(id: number) {
    let payload = {};
    let count = 0;

    (data as categoryType[]).map(category => {
      if (category.selected && category.id !== id) {
        payload = {
          ...payload,
          [`categories[${count}]`]: category.id,
        };
        count++;
      }
    });
    payload = {
      ...payload,
      [`categories[${count}]`]: id,
    };

    updateProfileAPi(payload)
      .then(({ message }) => {
        setData(prev => {
          return (prev as categoryType[]).map(item => {
            if (item.id === id) {
              return {
                ...item,
                selected: !item.selected,
              };
            }
            return item;
          });
        });
        Alert.alert(message);
      })
      .catch(err => {
        Alert.alert(err.message);
      });
  }

  return (
    <SafeAreaProfile
      title={t("Categories_of_interesting")}
      description="Categories_of_interesting_desc">
      <View style={styles.container}>
        {((data as categoryType[]) || null)?.map(item => {
          return (
            <View style={styles.category} key={item.id}>
              <CheckBox
                checked={item.selected}
                label={item.name}
                onCheck={function (): void {
                  updateSelectedCategories(item.id);
                }}
              />
            </View>
          );
        })}
      </View>
    </SafeAreaProfile>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: _extends.paddingHorizontalPages,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  category: {
    marginVertical: 10,
    borderWidth: 1,
    marginRight: isRTL() ? 0 : 10,
    marginLeft: isRTL() ? 10 : 0,
    borderRadius: 4,
    padding: 4,
    borderColor: COLORS._links_hover,
  },
});
