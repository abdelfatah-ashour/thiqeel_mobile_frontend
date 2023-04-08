import { useEffect, useReducer } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

import { _extends } from "../styles/_extends";
import { DispatchAction } from "../Types/shared";
import { CheckBoxTab } from "./checkbox-tab";
import { Input } from "./inputs/input";
import { LightButton, PrimaryButton, SecondaryButton } from "./_buttons";
import { COLORS } from "../constants/Colors";
import {
  validMemberApi,
  inviteMembersApi,
  updateProfileAPi,
} from "../utils/api/profile";
import { CheckBox } from "./checkbox";
import EmailIcon from "../assets//images/svg/email-black.svg";
import HalfModal from "./half-modal";
import { checkValidNewMember } from "../utils/validation/profile";
import Email from "../assets/images/svg/email-black.svg";
import { memberType } from "../Types/profile";
import { USER_IS_COMPANY } from "../utils/constant";
import { useReduxSelector } from "../store";
import { useFetchData } from "../hooks/useFetchData";

// CONSTANTS
const BUYER = "buyer";
const SELLER = "seller";
const ON_CHANGE = "ON_CHANGE";
const PERSONAL = "personal";
const BUSINESS = "business";
const SELECT_PLAN = "SELECT_PLAN";
const TOGGLE_MODAL_PLAN = "TOGGLE_MODAL_PLAN";
const ON_CHANGE_NEW_MEMBER = "ON_CHANGE_NEW_MEMBER";
const ON_ERROR_NEW_MEMBER = "ON_ERROR_NEW_MEMBER";
const ON_SUCCESS_NEW_MEMBER = "ON_SUCCESS_NEW_MEMBER";
const on_FETCH_PROFILE = "on_FETCH_PROFILE";
const ON_ERROR_FETCH_PROFILE = "ON_ERROR_FETCH_PROFILE";
const ON_LOADING_FETCH_PROFILE = "ON_LOADING_FETCH_PROFILE";

type AccountTypeFormPropsType = {
  account: accountType;
  dispatch: React.Dispatch<DispatchAction>;
  members?: { [key: string]: string }[];
};

type accountType = {
  loading: boolean;
  account_type: "personal" | "business";
  company_name: string;
  job_title: string;
  tax_number: string;
  commercial_record: string;
  number_700: string;
  emails_validates: {
    email: string;
    roles: string[];
  }[];
  show_select_plan: boolean;
  new_member: {
    email: string;
    roles: string[];
    error_message: string;
  };
  members: memberType[];
  errors: {
    company_name: string;
    job_title: string;
    tax_number: string;
    commercial_record: string;
    number_700: string;
    email: string;
  };
};

const accountState: accountType = {
  loading: false,
  account_type: "personal",
  company_name: "",
  job_title: "",
  tax_number: "",
  commercial_record: "",
  number_700: "",
  emails_validates: [],
  show_select_plan: false,
  new_member: {
    email: "",
    roles: [],
    error_message: "",
  },
  members: [],
  errors: {
    company_name: "",
    job_title: "",
    tax_number: "",
    commercial_record: "",
    number_700: "",
    email: "",
  },
};

function FormAccountType({
  children,
}: {
  children: (props: AccountTypeFormPropsType) => JSX.Element;
}) {
  const { loading, data, error } = useFetchData({
    url: "/profile/personal-account-type",
  });

  const [account, dispatch] = useReducer(infoReducer, accountState);

  function infoReducer(state: accountType, { type, payload }: DispatchAction) {
    switch (type) {
      case on_FETCH_PROFILE:
        return {
          ...state,
          account_type: payload.account_type,
          company_name: payload.company_name,
          job_title: payload.job_title,
          tax_number: payload.tax_number,
          commercial_record: payload.commercial_record,
          number_700: payload.number_700,
          members: payload.members,
        };
      case ON_ERROR_FETCH_PROFILE:
        return {
          ...state,
          error_message: payload,
        };
      case ON_CHANGE:
        return {
          ...state,
          [payload.name]: payload.value,
          errors: {
            ...state.errors,
            [payload.name]: "",
          },
        };

      case ON_CHANGE_NEW_MEMBER:
        return {
          ...state,
          new_member: {
            ...state.new_member,
            email: payload.value,
            error_message: "",
          },
        };

      case SELECT_PLAN:
        return {
          ...state,
          new_member: {
            ...state.new_member,
            roles: payload,
          },
        };
      case ON_ERROR_NEW_MEMBER:
        return {
          ...state,
          new_member: {
            ...state.new_member,
            error_message: payload,
          },
        };

      case ON_SUCCESS_NEW_MEMBER:
        return {
          ...state,
          emails_validates: [...state.emails_validates, payload],
          new_member: {
            email: "",
            roles: [],
            error_message: "",
          },
        };

      case TOGGLE_MODAL_PLAN:
        return {
          ...state,
          error_message: "",
          show_select_plan: payload,
        };

      default:
        return state;
    }
  }

  useEffect(() => {
    if (!loading) {
      if (!error) {
        dispatch({
          type: on_FETCH_PROFILE,
          payload: {
            account_type:
              data?.registration_type.code === USER_IS_COMPANY
                ? BUSINESS
                : PERSONAL,
            company_name: data?.company_name || "",
            job_title: data?.job_title || "",
            tax_number: data?.tax_number || "",
            commercial_record: data?.commercial_record || "",
            number_700: data?.number_700 || "",
            members: data?.members || [],
          },
        });
      }

      if (error) {
        dispatch({
          type: ON_ERROR_FETCH_PROFILE,
          payload: error,
        });
      }
    }
  }, [loading]);

  if (account.loading)
    return (
      <View>
        <Text variant="labelLarge">loading...</Text>
      </View>
    );

  return <>{children({ account, dispatch })}</>;
}

function FormAccountTypeInputs({
  account,
  dispatch,
}: AccountTypeFormPropsType) {
  // console.log("account ", account);
  function onChange(name: string, value: string) {
    dispatch({
      type: ON_CHANGE,
      payload: {
        name,
        value,
      },
    });
  }

  return (
    <>
      <View style={styles.account_type}>
        <CheckBoxTab
          label="personal"
          onCheck={() => onChange("account_type", PERSONAL)}
          checked={account.account_type === PERSONAL ? true : false}
        />
        <View style={{ marginHorizontal: 8 }}>
          <CheckBoxTab
            label="business"
            onCheck={() => onChange("account_type", BUSINESS)}
            checked={account.account_type === BUSINESS ? true : false}
          />
        </View>
      </View>

      {account.account_type === "business" ? (
        <>
          <View style={styles.group_input}>
            <Input
              label="company_name"
              value={account.company_name}
              onChange={(text: string) => {
                onChange("company_name", text);
              }}
              error={account.errors.company_name}
              tabIndex={"next"}
            />
          </View>
          <View style={styles.group_input}>
            <Input
              label="job_title"
              value={account.job_title}
              onChange={(text: string) => {
                onChange("job_title", text);
              }}
              error={account.errors.job_title}
              tabIndex={"next"}
            />
          </View>
          <View style={styles.group_input}>
            <Input
              label="tax_number"
              value={account.tax_number}
              onChange={(text: string) => {
                onChange("tax_number", text);
              }}
              error={account.errors.tax_number}
              tabIndex={"next"}
            />
          </View>

          <View style={styles.group_input}>
            <Input
              label="commercial_record"
              value={account.commercial_record}
              onChange={(text: string) => {
                onChange("commercial_record", text);
              }}
              error={account.errors.commercial_record}
              tabIndex={"next"}
            />
          </View>

          <View style={styles.group_input}>
            <Input
              label="number_700"
              value={account.number_700}
              onChange={(text: string) => {
                onChange("number_700", text);
              }}
              error={account.errors.number_700}
              tabIndex={"next"}
            />
          </View>
        </>
      ) : null}
    </>
  );
}

function FormAccountTypeButtons({
  account,
  dispatch,
}: AccountTypeFormPropsType) {
  function onUpdateProfile() {
    let body: { [key: string]: string } = {
      account_type: account.account_type,
    };

    if (account.account_type === "business") {
      body = {
        ...body,
        company_name: account.company_name,
        job_title: account.job_title,
        tax_number: account.tax_number,
        commercial_record: account.commercial_record,
        number_700: account.number_700,
      };
    }

    updateProfileAPi(body)
      .then(({ message }) => {
        console.log(
          "🚀 > file: form-account-type.tsx:350 > .then > message : ",
          message,
        );
        alert(message);
      })
      .catch(({ message }) => {
        alert(message);
      });
  }

  return (
    <>
      <View
        style={{
          marginBottom: 30,
        }}>
        <PrimaryButton title="update_profile" onPress={onUpdateProfile} />
      </View>
    </>
  );
}

function FormAccountTypeInvitationMembers({
  account,
  dispatch,
  members,
}: AccountTypeFormPropsType) {
  const { t } = useTranslation("common");
  const { settings } = useReduxSelector(state => state);

  function onChange(name: string, value: string) {
    // dispatch
    dispatch({
      type: ON_CHANGE_NEW_MEMBER,
      payload: {
        name,
        value,
      },
    });
  }

  function onSelectPlanning(plan: "buyer" | "seller") {
    dispatch({
      type: SELECT_PLAN,
      payload: account.new_member.roles?.includes(plan)
        ? account.new_member.roles.filter((item: string) => item !== plan)
        : [account.new_member.roles, plan].flat(1),
    });
  }

  function onToggleShowModalRoles() {
    dispatch({
      type: TOGGLE_MODAL_PLAN,
      payload: !account.show_select_plan,
    });
  }

  function onSubmitCheckNewMember() {
    checkValidNewMember(account.new_member.email, account.new_member.roles)
      .then(() => {
        let payload = {
          email: account.new_member.email,
        };
        validMemberApi(payload)
          .then(({ message, data }) => {
            dispatch({
              type: ON_SUCCESS_NEW_MEMBER,
              payload: {
                email: payload.email,
                roles: account.new_member.roles,
              },
            });
          })
          .catch(error => {
            dispatch({
              type: ON_ERROR_NEW_MEMBER,
              payload: error.message,
            });
          });
      })
      .catch(error => {
        dispatch({
          type: ON_ERROR_NEW_MEMBER,
          payload: error.message,
        });
      });
  }

  function onSubmitInviteMember() {
    let payload = {};

    account.emails_validates.map(({ email, roles }, index) => {
      payload = {
        ...payload,
        [`data[${index}][email]`]: email,
      };

      roles.map((role, i) => {
        payload = {
          ...payload,
          [`data[${index}][role][${i}]`]: role,
        };
      });
    });

    inviteMembersApi(payload)
      .then(({ message, data }) => {
        console.log(
          "🚀 > file: form-account-type.tsx:377 > .then > message, data : ",
          message,
          data,
        );
      })
      .catch(({ message }) => {
        console.log(
          "🚀 > file: form-account-type.tsx:378 > onSubmitInviteMember > message : ",
          message,
        );
      });
  }

  return (
    <View style={styles.container_members}>
      <View style={styles.head_invite_member}>
        <View style={styles.member_title_box}>
          <Text variant="labelLarge" style={styles.member_title}>
            {t("invitation_member")}
          </Text>

          <Text variant="labelSmall" style={styles.member_title_count}>
            {t("invitation_member_counts", {
              count: +settings?.max_invitations_members,
            })}
          </Text>
        </View>
        <Text variant="labelMedium">{t("invitation_member_desc")}</Text>
      </View>

      {/* display added the member list */}
      {account.members.length < +settings?.max_invitations_members ? (
        <>
          {/* copy the URL invitation to send to your new member */}
          <View style={styles.link}>
            <Text variant="bodyLarge" style={styles.link_text}>
              www.google.com/authentication/login
            </Text>
            <LightButton title="copy" onPress={() => {}} />
          </View>
          {/* check new member */}
          <View>
            <Input
              iconLeft={<EmailIcon width={32} height={32} />}
              value={account.new_member.email}
              onChange={text => onChange("email", text)}
              label={""}
              error={account.errors.email}
              tabIndex={"next"}
              keyboardType="email-address"
              disabled={
                account.members.length === +settings?.max_invitations_members
              }
            />
            <View style={styles.check_new_member}>
              <View style={styles.role_choose}>
                <Text
                  variant="titleMedium"
                  onPress={onToggleShowModalRoles}
                  style={styles.role_choose__label}
                  disabled={
                    account.members.length ===
                    +settings?.max_invitations_members
                  }>
                  {t("choose_role")}
                </Text>
                <Text variant="bodyLarge" style={styles.role_choose__text}>
                  {account.new_member.roles
                    ?.map((item: string) => t(item))
                    .join(", ")}
                </Text>
              </View>
              <LightButton
                title="check"
                onPress={onSubmitCheckNewMember}
                disabled={
                  account.members.length === +settings?.max_invitations_members
                }
              />
            </View>
            {account.new_member.error_message ? (
              <Text variant="bodyLarge">
                {t(account.new_member.error_message)}
              </Text>
            ) : null}
            <HalfModal
              open={account.show_select_plan}
              onClose={onToggleShowModalRoles}>
              <View
                style={{
                  ...styles.group_input,
                  ...styles.planner,
                }}>
                <CheckBox
                  label="buyer"
                  checked={
                    account.new_member.roles?.includes("buyer") ? true : false
                  }
                  onCheck={() => onSelectPlanning("buyer")}
                />
                <View style={{ marginHorizontal: 6 }}>
                  <CheckBox
                    label="seller"
                    checked={
                      account.new_member.roles?.includes("seller")
                        ? true
                        : false
                    }
                    onCheck={() => {
                      onSelectPlanning("seller");
                    }}
                  />
                </View>
              </View>
            </HalfModal>
          </View>

          <View style={styles.container_emails}>
            {account.emails_validates.map(({ email, roles }, index) => (
              <View key={index} style={styles.member_item}>
                <View style={styles.member_item_left}>
                  <Email width={24} height={24} />
                  <Text variant="labelLarge" style={styles.member_email}>
                    {email}
                  </Text>
                  <Text variant="labelLarge" style={styles.role_choose__text}>
                    {roles?.map((item: string) => t(item)).join(", ")}
                  </Text>
                </View>
                <Text variant="labelLarge">x</Text>
              </View>
            ))}

            {account.emails_validates.length ? (
              <View style={{ marginVertical: 12 }}>
                <PrimaryButton
                  title={"invite_members"}
                  onPress={onSubmitInviteMember}
                />
              </View>
            ) : null}
          </View>
        </>
      ) : null}

      {account.members.map(({ email, name, id }) => (
        <View key={id} style={styles.member_item}>
          <View style={styles.member_item_left}>
            <Email width={24} height={24} />
            <Text variant="labelLarge" style={styles.member_email}>
              {email || name}
            </Text>
            {/* <Text variant="labelLarge" style={styles.role_choose__text}>
            {roles?.map((item: string) => t(item)).join(", ")}
          </Text> */}
          </View>
          <Text variant="labelLarge">x</Text>
        </View>
      ))}
    </View>
  );
}

FormAccountType.Inputs = FormAccountTypeInputs;
FormAccountType.Buttons = FormAccountTypeButtons;
FormAccountType.Member = FormAccountTypeInvitationMembers;

export { FormAccountType };

const styles = StyleSheet.create({
  container_profile: {
    padding: 0,
    margin: 0,
  },
  profile_description: {
    marginVertical: 12,
  },
  group_input: {
    marginBottom: 16,
  },
  label: {
    marginVertical: 6,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  page_head: {
    paddingTop: 30,
    paddingBottom: 50,
  },
  content: {
    backgroundColor: "#dadada",
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    marginTop: -50,
  },
  account_type: {
    flexDirection: "row",
    marginBottom: 32,
  },
  container_members: {
    paddingHorizontal: _extends.paddingHorizontalPages,
    paddingVertical: _extends.paddingHorizontalPages,
    marginTop: 20,
    marginBottom: 70,
  },
  member_title: {
    fontSize: 24,
  },
  head_invite_member: {
    marginBottom: 20,
  },
  member_title_box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  member_title_count: {
    color: COLORS._text_info_tips,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  link_text: {
    color: COLORS._links_hover,
  },
  planner: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 12,
    paddingHorizontal: 4,
  },
  container_emails: {
    marginTop: 20,
  },
  member_item_left: {
    flexDirection: "row",
    alignItems: "center",
  },
  member_item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  check_new_member: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingHorizontal: 4,
  },
  role_choose: {
    flexDirection: "row",
  },
  role_choose__text: {
    color: COLORS._text_info_tips,
  },
  role_choose__label: {
    fontSize: 14,
  },
  member_email: {
    paddingHorizontal: 6,
  },
});
