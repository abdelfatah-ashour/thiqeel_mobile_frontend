import { useTranslation } from "react-i18next";
import { SafeAreaProfile } from "../components/SafeAreaProfile";
import { CardView } from "../components/card-view";
import { _extends } from "../styles/_extends";
import { FormAccountType } from "../components/form-account-type";

export function AccountType() {
  const { t } = useTranslation("common");

  return (
    <SafeAreaProfile title={"account_type"} description={"account_type_desc"}>
      <FormAccountType>
        {({ account, dispatch }) => {
          return (
            <>
              <CardView>
                <FormAccountType.Inputs account={account} dispatch={dispatch} />
                <FormAccountType.Buttons
                  account={account}
                  dispatch={dispatch}
                />
              </CardView>

              {account.account_type === "business" ? (
                <FormAccountType.Member
                  account={account}
                  dispatch={dispatch}
                  members={[]}
                />
              ) : null}
            </>
          );
        }}
      </FormAccountType>
    </SafeAreaProfile>
  );
}
