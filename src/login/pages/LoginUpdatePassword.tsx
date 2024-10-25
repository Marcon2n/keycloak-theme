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
            <div style={{ backgroundColor: '#eff6ff', margin: '-40px -40px 20px -40px', padding: '0px 40px 10px 40px' }}>
                <div style={{ fontSize: "25px", fontWeight: '700' }}>Thay đổi mật khẩu</div>
                <div style={{ fontSize: "14px" }}>Thay đổi mật khẩu</div>
            </div>
            <form id="kc-passwd-update-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")} style={{ padding: '0px 20px' }}>
                    <FormControl sx={{ width: "100%", minWidth: 400 }} variant="outlined" size="small">
                        <InputLabel required>Password</InputLabel>
                        <OutlinedInput
                            type={showPassword ? "text" : "password"}
                            tabIndex={1}
                            id="password-new"
                            name="password-new"
                            autoFocus
                            autoComplete="new-password"
                            label="password -"
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
                        />
                    </FormControl>
                </div>

                <div className={kcClsx("kcFormGroupClass")} style={{ padding: '0px 20px' }}>
                    <FormControl sx={{ width: "100%", minWidth: 400 }} variant="outlined" size="small">
                        <InputLabel required>Nhập lại password</InputLabel>
                        <OutlinedInput
                            type={showPassword ? "text" : "password"}
                            id="password-confirm"
                            tabIndex={2}
                            name="password-confirm"
                            autoComplete="new-password"
                            label="nhap lai password -"
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
                        />
                    </FormControl>
                </div>

                <div className={kcClsx("kcFormGroupClass")}>
                    <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />

                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")} style={{ margin: '25px 0px -10px' }}>
                        {messagesPerField.existsError("password", "password-confirm") ? <div style={{ width: "100%", borderRadius: '5px', backgroundColor: '#feebec', padding: '5px 10px', color: '#641723', fontWeight: '600' }}>
                            {messagesPerField.existsError("password-confirm") ? 'Password không trùng khớp' : 'Mật khẩu chứa tối thiểu 8 ký tự'}
                        </div> : null}

                    </div>

                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <Button sx={{ width: "100%" }} variant="contained" type="submit">
                            Thay đổi
                        </Button>
                        {isAppInitiatedAction && (
                            <Button
                                type="submit"
                                name="cancel-aia"
                                variant="contained"
                                sx={{ marginTop: '5px', width: "100%" }}
                                color="error"
                                value="true"
                            >
                                Hủy
                            </Button>
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
                        <span style={{ fontWeight: '600', color: 'black' }}>Đăng xuất thiết bị khác</span>
                    </label>
                </div>
            </div>
        </div>
    );
}
