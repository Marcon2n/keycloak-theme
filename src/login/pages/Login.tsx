import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    console.log(kcContext.message)

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration-container">
                    <div id="kc-registration">
                        <span>
                            {msg("noAccount")}{" "}
                            <a tabIndex={8} href={url.registrationUrl}>
                                {msg("doRegister")}
                            </a>
                        </span>
                    </div>
                </div>
            }
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
                            <hr />
                            <h2>{msg("identity-provider-login-label")}</h2>
                            <ul className={kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass")}>
                                {social.providers.map((...[p, , providers]) => (
                                    <li key={p.alias}>
                                        <a
                                            id={`social-${p.alias}`}
                                            className={kcClsx(
                                                "kcFormSocialAccountListButtonClass",
                                                providers.length > 3 && "kcFormSocialAccountGridItem"
                                            )}
                                            type="button"
                                            href={p.loginUrl}
                                        >
                                            {p.iconClasses && <i className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)} aria-hidden="true"></i>}
                                            <span
                                                className={clsx(kcClsx("kcFormSocialAccountNameClass"), p.iconClasses && "kc-social-icon-text")}
                                                dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}
                                            ></span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            }
        >
            <div style={{ backgroundColor: '#eff6ff', margin: '-40px -40px 40px -40px', padding: '0px 40px 10px 40px' }}>
                <div style={{ fontSize: "25px", fontWeight: '700' }}>Đăng nhập</div>
                <div style={{ fontSize: "14px" }}>Sử dụng username và password để đăng nhập</div>
            </div>
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    {realm.password && (
                        <form
                            id="kc-form-login"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                        >
                            {!usernameHidden && (
                                <div className={kcClsx("kcFormGroupClass")}>
                                    <TextField
                                        sx={{ width: "100%", minWidth: 400, paddingBottom: '10px' }}
                                        required
                                        label={
                                            !realm.loginWithEmailAllowed
                                                ? "Username"
                                                : !realm.registrationEmailAsUsername
                                                    ? "Username hoặc email"
                                                    : "Email"
                                        }
                                        tabIndex={2}
                                        id="username"
                                        name="username"
                                        defaultValue={login.username ?? ""}
                                        type="text"
                                        autoFocus
                                        autoComplete="username"
                                        size="small"
                                    // error={messagesPerField.existsError("username", "password")}
                                    // helperText={
                                    //     messagesPerField.existsError("username", "password") && (
                                    //         <span id="input-error" style={{ color: "#d32f2f" }} aria-live="polite">
                                    //             Thông tin tài khoản hoặc mật khẩu sai
                                    //         </span>
                                    //     )
                                    // }
                                    />
                                </div>
                            )}

                            <div className={kcClsx("kcFormGroupClass")}>
                                <FormControl sx={{ width: "100%", minWidth: 400 }} variant="outlined" size="small">
                                    <InputLabel required>Password</InputLabel>
                                    <OutlinedInput
                                        tabIndex={3}
                                        id="password"
                                        name="password"
                                        autoComplete="current-password"
                                        type={showPassword ? "text" : "password"}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label={showPassword ? "hide the password" : "display the password"}
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    onMouseDown={e => e.preventDefault()}
                                                    onMouseUp={e => e.preventDefault()}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    // error={messagesPerField.existsError("username", "password")}
                                    />

                                    {/* <FormHelperText>
                                        {usernameHidden && messagesPerField.existsError("username", "password") && (
                                            <span
                                                id="input-error"
                                                className={kcClsx("kcInputErrorMessageClass")}
                                                aria-live="polite"
                                                dangerouslySetInnerHTML={{
                                                    __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                                }}
                                            />
                                        )}
                                    </FormHelperText> */}
                                </FormControl>
                            </div>

                            <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                                <div id="kc-form-options">
                                    {realm.rememberMe && !usernameHidden && (
                                        <div className="checkbox">
                                            <label>
                                                <input
                                                    tabIndex={5}
                                                    id="rememberMe"
                                                    name="rememberMe"
                                                    type="checkbox"
                                                    defaultChecked={!!login.rememberMe}
                                                />{" "}
                                                <span style={{ fontWeight: '600', color: 'black' }}>Nhớ đăng nhập</span>
                                            </label>
                                        </div>
                                    )}
                                </div>
                                <div className={kcClsx("kcFormOptionsWrapperClass")}>
                                    {realm.resetPasswordAllowed && (
                                        <span>
                                            <a tabIndex={6} href={url.loginResetCredentialsUrl}>
                                                Quên mật khẩu
                                            </a>
                                        </span>
                                    )}
                                </div>
                            </div>

                            {messagesPerField.existsError("username", "password") ? <div style={{ borderRadius: '5px', backgroundColor: '#feebec', padding: '5px 10px', color: '#641723', fontWeight: '600' }}>
                                Mật khẩu hoặc username không đúng
                            </div> : null}

                            {kcContext.message && <div style={{ borderRadius: '5px', backgroundColor: '#feebec', padding: '5px 10px', fontWeight: '700' }} dangerouslySetInnerHTML={{
                                __html: kcSanitize(kcContext.message.summary)
                            }}></div>}

                            <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                                <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                                <Button
                                    sx={{ width: "100%" }}
                                    tabIndex={7}
                                    disabled={isLoginButtonDisabled}
                                    variant="contained"
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                >
                                    Đăng nhập
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}
