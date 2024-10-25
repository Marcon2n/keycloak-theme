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
            <div style={{ backgroundColor: '#eff6ff', margin: '-40px -40px 20px -40px', padding: '0px 40px 10px 40px' }}>
                <div style={{ fontSize: "25px", fontWeight: '700' }}>Yêu cầu đổi mật khẩu</div>
                <div style={{ fontSize: "14px" }}>Điền thông tin email hoặc username để gửi thông báo</div>
            </div>
            <form id="kc-reset-password-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")}>
                    <div className={kcClsx("kcInputWrapperClass")}>
                        <TextField
                            sx={{ width: "100%", minWidth: 400 }}
                            required
                            label={
                                !realm.loginWithEmailAllowed
                                    ? "Username"
                                    : !realm.registrationEmailAsUsername
                                        ? "Username hoặc email"
                                        : "Email"
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
                                <a href={url.loginUrl}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                                        <KeyboardDoubleArrowLeftIcon style={{ fontSize: "10px" }} />

                                        <span>Quay lại đăng nhập</span>
                                    </div>
                                </a>
                            </span>
                        </div>
                    </div>

                    {messagesPerField.existsError("username") ? <div style={{ width: "100%", borderRadius: '5px', backgroundColor: '#feebec', padding: '5px 10px', color: '#641723', fontWeight: '600', margin: "15px 18px -10px" }}>
                        Sai tên đăng nhập
                    </div> : null}

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
