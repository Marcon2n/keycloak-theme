import { useState } from "react";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormHelperText } from "@mui/material";

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const [showPassword, setShowPassword] = useState(false);

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg } = i18n;

    const { url, messagesPerField, isAppInitiatedAction } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("password", "password-confirm")}
            headerNode={msg("updatePasswordTitle")}
        >
            <form id="kc-passwd-update-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")} style={{ padding: '0px 20px' }}>
                    <FormControl sx={{ width: "100%", minWidth: 400 }} variant="outlined" size="small">
                        <InputLabel required style={messagesPerField.existsError("password", "password-confirm") ? { color: '#d32f2f' } : {}}>Mật khẩu mới</InputLabel>
                        <OutlinedInput
                            type={showPassword ? "text" : "password"}
                            id="password-new"
                            name="password-new"
                            autoFocus
                            autoComplete="new-password"
                            label="new password"
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
                            error={messagesPerField.existsError("password", "password-confirm")}
                        />

                        <FormHelperText>
                            {messagesPerField.existsError("password") && (
                                <span
                                    id="input-error-password"
                                    aria-live="polite"
                                    style={{ color: "#d32f2f" }}
                                >Mật khẩu chứa tối thiểu 8 ký tự</span>
                            )}
                        </FormHelperText>
                    </FormControl>
                </div>

                <div className={kcClsx("kcFormGroupClass")} style={{ padding: '0px 20px' }}>
                    <FormControl sx={{ width: "100%", minWidth: 400 }} variant="outlined" size="small">
                        <InputLabel required style={messagesPerField.existsError("password", "password-confirm") ? { color: '#d32f2f' } : {}}>Nhập lại mật khẩu</InputLabel>
                        <OutlinedInput
                            type={showPassword ? "text" : "password"}
                            id="password-confirm"
                            name="password-confirm"
                            autoFocus
                            autoComplete="new-password"
                            label="new password conf"
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
                            error={messagesPerField.existsError("password", "password-confirm")}
                        />

                        <FormHelperText>
                            {messagesPerField.existsError("password-confirm") && (
                                <span
                                    id="input-error-password-confirm"
                                    aria-live="polite"
                                    style={{ color: "#d32f2f" }}
                                >Mật khẩu không trùng khớp</span>
                            )}
                        </FormHelperText>
                    </FormControl>
                </div>
                <div className={kcClsx("kcFormGroupClass")}>
                    <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />
                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <Button sx={{ width: "100%" }} variant="contained" type="submit">
                            Thay đổi mật khẩu
                        </Button>
                        {isAppInitiatedAction && (
                            <button
                                className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass")}
                                type="submit"
                                name="cancel-aia"
                                value="true"
                            >
                                {msg("doCancel")}
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </Template>
    );
}

function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
    const { kcClsx, } = props;

    return (
        <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
            <div className={kcClsx("kcFormOptionsWrapperClass")}>
                <div className="checkbox">
                    <label>
                        <input type="checkbox" id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true} />
                        Đăng xuất khỏi các thiết bị khác
                    </label>
                </div>
            </div>
        </div>
    );
}
