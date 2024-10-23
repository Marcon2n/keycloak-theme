import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button, TextField } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, realm, auth, messagesPerField } = kcContext;

    const { msg } = i18n;

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
                                    ? "Tên đăng nhập"
                                    : !realm.registrationEmailAsUsername
                                      ? "Tên đăng nhập hoặc email"
                                      : "Email"
                            }
                            type="text"
                            id="username"
                            name="username"
                            autoFocus
                            defaultValue={auth.attemptedUsername ?? ""}
                            tabIndex={2}
                            size="small"
                            error={messagesPerField.existsError("username")}
                            helperText={
                                messagesPerField.existsError("username") && (
                                    <span id="input-error-username" aria-live="polite" style={{ color: "#d32f2f" }}>
                                        Sai tên đăng nhập
                                    </span>
                                )
                            }
                        />
                    </div>
                </div>
                <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")}>
                            <span>
                                <a href={url.loginUrl}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                                        <KeyboardDoubleArrowLeftIcon style={{ fontSize: "10px" }} />

                                        <span>Quay lại đăng nhập</span>
                                    </div>
                                </a>
                            </span>
                        </div>
                    </div>

                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <Button sx={{ width: "100%" }} variant="contained" type="submit">
                            Gửi thông tin
                        </Button>
                    </div>
                </div>
            </form>
        </Template>
    );
}
