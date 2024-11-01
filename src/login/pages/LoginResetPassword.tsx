import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button, TextField } from "@mui/material";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, realm, auth, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            displayMessage={!messagesPerField.existsError("username")}
            infoNode={realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}
            headerNode={msg("emailForgotTitle")}
        >
            <form id="kc-reset-password-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")}>
                    <div className={kcClsx("kcInputWrapperClass")}>
                        <TextField
                            sx={{ width: "100%", minWidth: 400 }}
                            required
                            label={
                                !realm.loginWithEmailAllowed
                                    ? msg("username")
                                    : !realm.registrationEmailAsUsername
                                      ? msg("usernameOrEmail")
                                      : msg("email")
                            }
                            type="text"
                            id="username"
                            name="username"
                            autoFocus
                            defaultValue={auth.attemptedUsername ?? ""}
                            tabIndex={2}
                            size="small"
                        />
                    </div>
                </div>
                <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")}>
                            <span>
                                <a href={url.loginUrl}>{msg("backToLogin")}</a>
                            </span>
                        </div>
                    </div>

                    {messagesPerField.existsError("username") ? (
                        <div
                            style={{
                                width: "100%",
                                borderRadius: "5px",
                                backgroundColor: "#feebec",
                                padding: "5px 10px",
                                color: "#641723",
                                fontWeight: "600",
                                margin: "15px 18px -10px"
                            }}
                        >
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("username"))
                                }}
                            />
                        </div>
                    ) : null}

                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <Button sx={{ width: "100%" }} variant="contained" type="submit">
                            {msgStr("doSubmit")}
                        </Button>
                    </div>
                </div>
            </form>
        </Template>
    );
}
